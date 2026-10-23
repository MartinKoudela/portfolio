export type SectionId = "eth1" | "eth2" | "eth3" | "eth4" | "console";

export type FootnoteKey = "reflow" | "piBriefs" | "esp32Datasheet" | "authorised" | "pi4Brief";

export type ImageMedia = { kind: "image"; src: string; alt: string; width: number; height: number };
export type PlaceholderMedia = { kind: "placeholder"; label: string; aspect: string };

export type DiagramCard = {
    x: number;
    y: number;
    w: number;
    h: number;
    title?: string;
    lines?: string[];
    tint?: boolean;
    planned?: boolean;
    center?: boolean;
    pad?: string;
};

export type DiagramArrow = {
    x: number;
    y: number;
    w: number;
    h: number;
    d: string;
    head?: boolean;
    thin?: boolean;
    muted?: boolean;
    dashed?: boolean;
};

export type DiagramText = {
    x: number;
    y: number;
    w: number;
    text: string;
    label?: boolean;
    center?: boolean;
    size?: [number, number];
};

export type DiagramFrame = { x: number; y: number; w: number; h: number; tint?: boolean };

export type MobileCard = { title: string; lines?: string[]; inline?: boolean; tint?: boolean; planned?: boolean; mono?: boolean };

export type MobileNode =
    | { t: "card"; card: MobileCard }
    | { t: "arrow"; size?: number }
    | { t: "grid"; cards: MobileCard[] }
    | { t: "band"; label: string; tint?: boolean; nodes: MobileNode[]; note?: string }
    | { t: "note"; text: string }
    | { t: "pair"; left: MobileCard; right: MobileCard }
    | { t: "narrow"; nodes: MobileNode[] };

export type DiagramMedia = {
    kind: "diagram";
    width: number;
    height: number;
    frames?: DiagramFrame[];
    arrows: DiagramArrow[];
    cards: DiagramCard[];
    texts?: DiagramText[];
    mobile: MobileNode[];
    mobileGap?: number;
};

export type SetMedia = { kind: "set"; items: PlaceholderMedia[] };

export type Media = ImageMedia | PlaceholderMedia | DiagramMedia | SetMedia;

export type Figure = {
    id: string;
    label: string;
    caption: string;
    mobileCaption?: string;
    media: Media;
    captionGap?: number;
};

export type SpecRow = {
    label: string;
    value: string;
    note?: string;
    fn?: FootnoteKey;
    muted?: boolean;
    href?: string;
    group?: boolean;
};

export type Fact = { label: string; value: string; href?: string };

export type SpecTable = { label: string; caption: string; columns: string[]; rows: SpecRow[] };

export type Section = {
    id: SectionId;
    code: string;
    port: string;
    label: string;
    title: string;
    summary?: string;
};

export const identity = {
    device: "MK-01",
    name: "Martin Koudela",
    location: "Zlín, Czech Republic",
    email: "mk@martinkoudela.com",
};

export const sections: Section[] = [
    {
        id: "eth1",
        code: "ETH1",
        port: "Networking",
        label: "Networking",
        title: "Networking",
        summary:
            "What runs on the network today, and what comes next. Public DNS and mail go through Cloudflare and iCloud. Everything else sits on a private Tailscale mesh, with no ports exposed to the internet.",
    },
    {
        id: "eth2",
        code: "ETH2",
        port: "Hardware",
        label: "Hardware & IoT",
        title: "Hardware & IoT",
        summary:
            "Robotics, computer vision and embedded builds. Four application notes, each linked to its full version.",
    },
    {
        id: "eth3",
        code: "ETH3",
        port: "Security",
        label: "Security",
        title: "Security",
        summary:
            "RF hardware for recon and testing, plus forensic work on phishing mail and NFC cards. Kali Linux is the main toolkit.",
    },
    {
        id: "eth4",
        code: "ETH4",
        port: "Software & Apps",
        label: "Software & Apps",
        title: "Software & Apps",
        summary: "An open-source CMS, an iOS app, a browser game and client websites.",
    },
    {
        id: "console",
        code: "CONSOLE",
        port: "Contact",
        label: "Contact",
        title: "Ordering information",
    },
];

export function section(id: SectionId): Section {
    return sections.find((s) => s.id === id)!;
}

export const footnotes: Record<FootnoteKey, string> = {
    reflow: "Measured from solder joint to CSS. Both occasionally need reflowing.",
    piBriefs: "Raspberry Pi 4 Model B and Raspberry Pi 5 product briefs.",
    esp32Datasheet: "ESP32-S3 Series datasheet, version 2.2.",
    authorised: "For authorised testing only. A datasheet is not a licence.",
    pi4Brief: "Raspberry Pi 4 Model B product brief.",
};

export const homeFootnoteNumbers: Partial<Record<FootnoteKey, number>> = {
    reflow: 1,
    piBriefs: 2,
    esp32Datasheet: 3,
    authorised: 4,
};

export const intro = {
    tagline:
        "One engineer, documented as a device. Hardware, networks and security, up through backend, web and iOS.",
    taglineFn: "reflow" as FootnoteKey,
    facts: [
        { label: "Location", value: "Zlín, Czech Republic" },
        { label: "Studies", value: "IT, secondary school, Zlín" },
        { label: "Current role", value: "Robotics programmer, part-time, SYNOT ICT" },
    ] satisfies Fact[],
    featuresTitle: "Features",
    features: [
        {
            lead: "Networking.",
            text: "Tailscale mesh across own devices; Cloudflare DNS for two domains; custom-domain mail with MX, SPF and DKIM.",
        },
        {
            lead: "Hardware & IoT.",
            text: "Raspberry Pi 4 and 5 vision systems, ESP32-S3, KiCad schematics, soldering.",
        },
        {
            lead: "Robotics.",
            text: "Programs the Unitree G1 humanoid at SYNOT ICT and represents it at public events.",
        },
        {
            lead: "Security.",
            text: "ESP32-S3 RF handheld for Wi-Fi, BLE, Sub-GHz and NFC; phishing and NFC forensics.",
        },
        { lead: "Backend.", text: "FastAPI and Laravel services, REST APIs." },
        { lead: "Apps.", text: "Laravix multi-tenant CMS, Backlog iOS app, client websites." },
    ],
    blockDiagram: {
        id: "fig-1",
        label: "Fig. 1",
        caption: "Functional block diagram. Each layer feeds the next.",
        mobileCaption: "Functional block diagram",
        media: {
            kind: "diagram",
            width: 864,
            height: 200,
            arrows: [
                { x: 168, y: 80, w: 63, h: 8, d: "M 0 4 L 60 4", head: true },
                { x: 400, y: 80, w: 63, h: 8, d: "M 0 4 L 60 4", head: true },
                { x: 632, y: 80, w: 63, h: 8, d: "M 0 4 L 60 4", head: true },
                { x: 0, y: 156, w: 400, h: 8, d: "M 0 4 L 400 4", thin: true, muted: true },
            ],
            cards: [
                { x: 0, y: 24, w: 168, h: 120, pad: "12px 14px", title: "Hardware", lines: ["Raspberry Pi 4 / 5, ESP32-S3, sensors, KiCad"] },
                { x: 232, y: 24, w: 168, h: 120, pad: "12px 14px", title: "Network", lines: ["Tailscale mesh, Cloudflare DNS, RF segment"] },
                { x: 464, y: 24, w: 168, h: 120, pad: "12px 14px", title: "Backend", lines: ["FastAPI, Laravel, REST APIs"] },
                { x: 696, y: 24, w: 168, h: 120, pad: "12px 14px", title: "Apps", lines: ["Web (Laravix), iOS (SwiftUI), Three.js"] },
            ],
            texts: [{ x: 0, y: 172, w: 320, text: "Security: spans hardware and network", size: [12, 16] }],
            mobile: [
                { t: "card", card: { title: "Hardware", lines: ["Raspberry Pi 4 / 5, ESP32-S3, sensors, KiCad"], inline: true } },
                { t: "arrow", size: 28 },
                { t: "card", card: { title: "Network", lines: ["Tailscale mesh, Cloudflare DNS, RF segment"], inline: true } },
                { t: "arrow", size: 28 },
                { t: "card", card: { title: "Backend", lines: ["FastAPI, Laravel, REST APIs"], inline: true } },
                { t: "arrow", size: 28 },
                { t: "card", card: { title: "Apps", lines: ["Web (Laravix), iOS (SwiftUI), Three.js"], inline: true } },
                { t: "note", text: "Security spans hardware and network." },
            ],
        },
    } satisfies Figure,
};

export const network = {
    topology: {
        id: "fig-2",
        label: "Fig. 2",
        caption:
            "Network topology. Solid: in service. Dashed: next revision. The mesh is drawn as a bus; every node reaches every other node directly.",
        mobileCaption: "Network topology, simplified for small screens. Dashed: next revision.",
        captionGap: 12,
        media: {
            kind: "diagram",
            width: 1104,
            height: 576,
            frames: [
                { x: 0, y: 0, w: 1104, h: 216 },
                { x: 0, y: 248, w: 1104, h: 176, tint: true },
                { x: 0, y: 456, w: 1104, h: 120 },
            ],
            arrows: [
                { x: 176, y: 112, w: 79, h: 8, d: "M 0 4 L 76 4", head: true },
                { x: 448, y: 68, w: 79, h: 8, d: "M 0 4 L 76 4", head: true },
                { x: 448, y: 156, w: 79, h: 8, d: "M 0 4 L 76 4", head: true },
                { x: 108, y: 360, w: 8, h: 32, d: "M 4 0 L 4 32", thin: true },
                { x: 348, y: 360, w: 8, h: 32, d: "M 4 0 L 4 32", thin: true },
                { x: 588, y: 360, w: 8, h: 32, d: "M 4 0 L 4 32", thin: true },
                { x: 856, y: 360, w: 8, h: 32, d: "M 4 0 L 4 32", thin: true, muted: true, dashed: true },
                { x: 112, y: 388, w: 480, h: 8, d: "M 0 4 L 480 4", thin: true },
                { x: 592, y: 388, w: 268, h: 8, d: "M 0 4 L 268 4", thin: true, muted: true, dashed: true },
                { x: 232, y: 520, w: 80, h: 8, d: "M 0 4 L 80 4", thin: true },
            ],
            cards: [
                { x: 24, y: 80, w: 152, h: 72, title: "Internet" },
                { x: 256, y: 40, w: 192, h: 152, title: "Cloudflare", lines: ["DNS for martinkoudela.com and laravix.com"] },
                { x: 528, y: 40, w: 240, h: 64, title: "Websites", lines: ["martinkoudela.com, laravix.com"] },
                { x: 528, y: 128, w: 240, h: 64, title: "iCloud Mail", lines: ["custom domain: MX, SPF, DKIM"] },
                { x: 24, y: 288, w: 176, h: 72, title: "Own devices" },
                { x: 264, y: 288, w: 176, h: 72, title: "RaspiVision", lines: ["Raspberry Pi 4"] },
                { x: 504, y: 288, w: 176, h: 72, title: "G1 vision unit", lines: ["remote access at events"] },
                { x: 744, y: 288, w: 232, h: 72, title: "NAS / home server", lines: ["OpenMediaVault or TrueNAS"], planned: true },
                { x: 24, y: 496, w: 208, h: 56, title: "ESP32-S3 handheld" },
                { x: 312, y: 496, w: 456, h: 56, lines: ["Wi-Fi · BLE · Sub-GHz 433 / 868 / 915 MHz · NFC / RFID"], center: true },
            ],
            texts: [
                { x: 16, y: 12, w: 200, text: "Public · DNS and mail", label: true },
                { x: 16, y: 260, w: 200, text: "Overlay · Tailscale mesh", label: true },
                { x: 16, y: 468, w: 200, text: "RF segment", label: true },
                { x: 472, y: 132, w: 32, text: "MX", label: true, center: true },
                { x: 760, y: 264, w: 216, text: "next revision", label: true },
                {
                    x: 832,
                    y: 48,
                    w: 240,
                    text: "Home devices expose no ports to the internet. Remote access goes through the overlay below.",
                },
                { x: 832, y: 500, w: 240, text: "Recon and testing. Details under ETH3." },
            ],
            mobileGap: 12,
            mobile: [
                {
                    t: "band",
                    label: "Public · DNS and mail",
                    nodes: [
                        { t: "card", card: { title: "Internet" } },
                        { t: "arrow" },
                        { t: "card", card: { title: "Cloudflare", lines: ["DNS for martinkoudela.com and laravix.com"], inline: true } },
                        { t: "arrow" },
                        {
                            t: "grid",
                            cards: [
                                { title: "Websites", lines: ["both domains"] },
                                { title: "iCloud Mail", lines: ["MX, SPF, DKIM"] },
                            ],
                        },
                    ],
                    note: "Home devices expose no ports to the internet.",
                },
                {
                    t: "band",
                    label: "Overlay · Tailscale mesh",
                    tint: true,
                    nodes: [
                        {
                            t: "grid",
                            cards: [
                                { title: "Own devices" },
                                { title: "RaspiVision", lines: ["Raspberry Pi 4"] },
                                { title: "G1 vision unit", lines: ["at events"] },
                                { title: "NAS", lines: ["next revision"], planned: true },
                            ],
                        },
                    ],
                    note: "One mesh: every node reaches every other node directly.",
                },
                {
                    t: "band",
                    label: "RF segment",
                    nodes: [
                        {
                            t: "card",
                            card: { title: "ESP32-S3 handheld", lines: ["Wi-Fi · BLE · Sub-GHz 433 / 868 / 915 MHz · NFC / RFID"] },
                        },
                    ],
                },
            ],
        },
    } satisfies Figure,
    segments: {
        label: "Table 1",
        caption: "Network segments",
        columns: ["Segment", "Implementation", "Note"],
        rows: [
            { label: "Public DNS", value: "Cloudflare", note: "martinkoudela.com, laravix.com" },
            { label: "Mail", value: "iCloud Mail", note: "Custom domain; MX, SPF, DKIM" },
            { label: "Overlay", value: "Tailscale", note: "Remote access to RaspiVision and the G1 vision unit at events" },
            { label: "RF", value: "ESP32-S3 handheld", note: "Wi-Fi, BLE, Sub-GHz and NFC recon" },
            { label: "Storage", value: "NAS / home server", note: "Next revision; OpenMediaVault or TrueNAS", muted: true },
        ],
    } satisfies SpecTable,
};

export const footer = {
    line: "MK-01 · Martin Koudela · Zlín, Czech Republic",
    builtWith: "Built with Next.js",
    back: "Back to the datasheet",
};
