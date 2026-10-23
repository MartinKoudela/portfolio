export type Subnet = {
    address: string;
    prefix: number;
    network: string;
    broadcast: string | null;
    firstHost: string;
    lastHost: string;
    usableHosts: number;
    subnetMask: string;
    wildcardMask: string;
};

export type SubnetResult = { ok: true; subnet: Subnet } | { ok: false; error: string };

const PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/;

function toDotted(value: number): string {
    return [24, 16, 8, 0].map((shift) => (value >>> shift) & 255).join(".");
}

export function calculateSubnet(input: string): SubnetResult {
    const match = input.trim().match(PATTERN);
    if (!match) return { ok: false, error: "Enter an IPv4 address with a prefix, for example 192.168.10.0/26." };

    const octets = match.slice(1, 5).map(Number);
    if (octets.some((o) => o > 255)) return { ok: false, error: "Each part of the address must be between 0 and 255." };

    const prefix = Number(match[5]);
    if (prefix > 32) return { ok: false, error: "The prefix must be between /0 and /32." };

    const ip = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const wildcard = ~mask >>> 0;
    const network = (ip & mask) >>> 0;
    const last = (network | wildcard) >>> 0;

    let firstHost = network;
    let lastHost = last;
    let broadcast: number | null = last;
    let usableHosts: number;

    if (prefix === 32) {
        broadcast = null;
        usableHosts = 1;
    } else if (prefix === 31) {
        broadcast = null;
        usableHosts = 2;
    } else {
        firstHost = network + 1;
        lastHost = last - 1;
        usableHosts = 2 ** (32 - prefix) - 2;
    }

    return {
        ok: true,
        subnet: {
            address: toDotted(ip),
            prefix,
            network: toDotted(network),
            broadcast: broadcast === null ? null : toDotted(broadcast),
            firstHost: toDotted(firstHost),
            lastHost: toDotted(lastHost),
            usableHosts,
            subnetMask: toDotted(mask),
            wildcardMask: toDotted(wildcard),
        },
    };
}
