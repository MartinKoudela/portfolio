import assert from "node:assert/strict";
import { test } from "node:test";
import { calculateSubnet } from "./subnet.ts";

function subnet(input: string) {
    const result = calculateSubnet(input);
    assert.ok(result.ok, `expected ${input} to be valid`);
    return result.subnet;
}

test("/26 network", () => {
    assert.deepEqual(subnet("192.168.10.0/26"), {
        address: "192.168.10.0",
        prefix: 26,
        network: "192.168.10.0",
        broadcast: "192.168.10.63",
        firstHost: "192.168.10.1",
        lastHost: "192.168.10.62",
        usableHosts: 62,
        subnetMask: "255.255.255.192",
        wildcardMask: "0.0.0.63",
    });
});

test("host address inside a /24 is masked to the network", () => {
    const s = subnet("10.1.2.77/24");
    assert.equal(s.network, "10.1.2.0");
    assert.equal(s.broadcast, "10.1.2.255");
    assert.equal(s.usableHosts, 254);
});

test("/31 has two usable hosts and no broadcast", () => {
    const s = subnet("10.0.0.5/31");
    assert.equal(s.network, "10.0.0.4");
    assert.equal(s.broadcast, null);
    assert.equal(s.firstHost, "10.0.0.4");
    assert.equal(s.lastHost, "10.0.0.5");
    assert.equal(s.usableHosts, 2);
    assert.equal(s.subnetMask, "255.255.255.254");
    assert.equal(s.wildcardMask, "0.0.0.1");
});

test("/32 is a single host", () => {
    const s = subnet("8.8.8.8/32");
    assert.equal(s.network, "8.8.8.8");
    assert.equal(s.broadcast, null);
    assert.equal(s.firstHost, "8.8.8.8");
    assert.equal(s.lastHost, "8.8.8.8");
    assert.equal(s.usableHosts, 1);
    assert.equal(s.subnetMask, "255.255.255.255");
    assert.equal(s.wildcardMask, "0.0.0.0");
});

test("/0 covers the whole address space", () => {
    const s = subnet("1.2.3.4/0");
    assert.equal(s.network, "0.0.0.0");
    assert.equal(s.broadcast, "255.255.255.255");
    assert.equal(s.usableHosts, 4294967294);
    assert.equal(s.subnetMask, "0.0.0.0");
    assert.equal(s.wildcardMask, "255.255.255.255");
});

test("high addresses stay unsigned", () => {
    const s = subnet("255.255.255.0/25");
    assert.equal(s.network, "255.255.255.0");
    assert.equal(s.broadcast, "255.255.255.127");
});

test("whitespace around the input is ignored", () => {
    assert.equal(subnet("  172.16.0.0/12 ").broadcast, "172.31.255.255");
});

test("invalid input is rejected with a message", () => {
    for (const input of ["", "192.168.1.0", "192.168.1/24", "256.1.1.1/24", "1.1.1.1/33", "a.b.c.d/8", "1.1.1.1/-1"]) {
        const result = calculateSubnet(input);
        assert.equal(result.ok, false, input);
        if (!result.ok) assert.ok(result.error.length > 0);
    }
});
