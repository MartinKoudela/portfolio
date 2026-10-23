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
    plain?: boolean;
};

export type Fact = { label: string; value: string; href?: string };

export type SpecTable = { label: string; caption: string; columns: string[]; rows: SpecRow[] };

export type Category = "hardware" | "security" | "software" | "compact";

export type NoteLayout =
    | "media-specs"
    | "specs-media"
    | "media-table"
    | "diagram-specs"
    | "table-media"
    | "strip-specs";

export type ExtraImage = ImageMedia & { caption: string };

export type NoteDetail = {
    summary: string;
    diagram: Figure;
    specs: SpecRow[];
    howItWorks: { title: string; text: string }[];
    hardware: { figures: Figure[]; parts: SpecTable };
};

export type Project = {
    slug: string;
    name: string;
    shortName: string;
    category: Category;
    family?: string;
    summary: string;
    description?: string;
    status?: string;
    context?: string;
    links: { source?: string; website?: string };
    layout?: NoteLayout;
    specs: SpecRow[];
    specTable?: { label: string; caption: string; columns: string[]; minWidth: number; mobileMinWidth?: number };
    figures: Figure[];
    images?: ExtraImage[];
    row?: { description: string; stack: string };
    note?: NoteDetail;
};

export type PlainTable = { label: string; caption: string; columns: string[]; rows: string[][]; monoColumn: number };

export const categorySection: Record<Category, SectionId> = {
    hardware: "eth2",
    security: "eth3",
    software: "eth4",
    compact: "eth4",
};

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

export const siteMeta = {
    url: "https://martinkoudela.com",
    title: "Martin Koudela | Networking, Hardware & Security",
    shareTitle: "Martin Koudela · MK-01",
    description:
        "Martin Koudela: networking, hardware/IoT and security from Zlín. Raspberry Pi vision, ESP32-S3 RF tools, G1 humanoid robotics, Laravel and FastAPI backends.",
    imageAlt: "MK-01, Martin Koudela",
    ogLine: "Networking, hardware/IoT and security from Zlín.",
    keywords: [
        "Martin Koudela",
        "networking",
        "Tailscale",
        "Cloudflare",
        "hardware",
        "IoT",
        "Raspberry Pi",
        "ESP32-S3",
        "KiCad",
        "security",
        "RF",
        "NFC",
        "backend",
        "FastAPI",
        "Laravel",
        "Unitree G1",
        "robotics",
        "Next.js",
        "SwiftUI",
    ],
    jobTitle: "Robotics programmer",
    worksFor: "SYNOT ICT",
    knowsAbout: [
        "Networking",
        "Tailscale",
        "Cloudflare DNS",
        "Raspberry Pi",
        "ESP32-S3",
        "KiCad",
        "IoT",
        "Security",
        "Kali Linux",
        "Python",
        "C/C++",
        "FastAPI",
        "Laravel",
        "PHP",
        "TypeScript",
        "Swift",
    ],
    themeColor: { light: "#F5F2EB", dark: "#161513" },
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

const arrowRight = (x: number, y: number): DiagramArrow => ({ x, y, w: 79, h: 8, d: "M 0 4 L 76 4", head: true });

export const projects: Project[] = [
    {
        slug: "unitree-g1",
        name: "Unitree G1 humanoid",
        shortName: "Unitree G1",
        category: "hardware",
        summary:
            "Part-time role at SYNOT ICT: programming and developing a Unitree G1 humanoid robot, and representing it at public events such as Barum Czech Rally Zlín.",
        links: {},
        layout: "media-specs",
        figures: [
            {
                id: "fig-3",
                label: "Fig. 3",
                caption: "Unitree G1 at a public event",
                media: { kind: "placeholder", label: "[PLACEHOLDER: photo, G1 at a public event]", aspect: "16 / 10" },
            },
        ],
        specs: [
            { label: "Platform", value: "Unitree G1 EDU humanoid" },
            { label: "Employer", value: "SYNOT ICT, Uherské Hradiště" },
            { label: "Role", value: "Programming, development, public demonstrations" },
            { label: "Events", value: "Barum Czech Rally Zlín, others" },
            { label: "Stack", value: "[PLACEHOLDER]" },
            { label: "Since", value: "[DATE]" },
        ],
    },
    {
        slug: "rpi-ai-vision",
        name: "RPi AI vision & response",
        shortName: "RPi AI vision & response",
        category: "hardware",
        summary:
            "Raspberry Pi 5 system that detects and tracks people, then generates natural-language descriptions and responses through a cloud vision-language model. Output is JSON for a robot SDK.",
        links: {},
        layout: "diagram-specs",
        figures: [
            {
                id: "fig-4",
                label: "Fig. 4",
                caption: "Data flow. Shaded block runs on the Pi.",
                mobileCaption: "Data flow, simplified. Shaded block runs on the Pi.",
                media: {
                    kind: "diagram",
                    width: 864,
                    height: 288,
                    arrows: [
                        { x: 289, y: 73, w: 8, h: 79, d: "M 4 79 L 4 3", head: true },
                        { x: 359, y: 72, w: 8, h: 79, d: "M 4 0 L 4 76", head: true },
                        arrowRight(144, 212),
                        arrowRight(432, 184),
                        arrowRight(432, 248),
                    ],
                    cards: [
                        { x: 224, y: 0, w: 208, h: 72, title: "Cloud vision-language model", lines: ["descriptions, responses"] },
                        { x: 0, y: 180, w: 144, h: 72, title: "Camera" },
                        {
                            x: 224,
                            y: 152,
                            w: 208,
                            h: 128,
                            title: "Raspberry Pi 5",
                            lines: ["YOLO + ByteTrack", "MediaPipe, OpenCV", "FastAPI"],
                            tint: true,
                        },
                        { x: 512, y: 160, w: 168, h: 56, title: "Robot SDK" },
                        { x: 512, y: 224, w: 168, h: 56, title: "Browser", lines: ["FastAPI stream"] },
                    ],
                    texts: [
                        { x: 452, y: 160, w: 40, text: "JSON", label: true, center: true },
                        { x: 712, y: 168, w: 152, text: "Remote access at events over Tailscale.", size: [12, 17] },
                    ],
                    mobile: [
                        { t: "narrow", nodes: [{ t: "card", card: { title: "Camera" } }, { t: "arrow" }] },
                        {
                            t: "pair",
                            left: { title: "Raspberry Pi 5", lines: ["YOLO + ByteTrack", "MediaPipe, OpenCV", "FastAPI"], tint: true },
                            right: { title: "Cloud VLM", lines: ["descriptions, responses"] },
                        },
                        { t: "narrow", nodes: [{ t: "arrow" }] },
                        {
                            t: "grid",
                            cards: [
                                { title: "Robot SDK", lines: ["JSON"], mono: true },
                                { title: "Browser", lines: ["FastAPI stream"] },
                            ],
                        },
                    ],
                },
            },
        ],
        specs: [
            { label: "Board", value: "Raspberry Pi 5; BCM2712, 4× Cortex-A76 @ 2.4 GHz", fn: "piBriefs" },
            { label: "Detection", value: "YOLO; tracking with ByteTrack" },
            { label: "Vision libraries", value: "MediaPipe, OpenCV" },
            { label: "Language", value: "Cloud vision-language model" },
            { label: "Output", value: "JSON for a robot SDK; FastAPI stream" },
            { label: "Remote access", value: "Tailscale, at events" },
        ],
    },
    {
        slug: "rpi-cam",
        name: "RaspiVision",
        shortName: "RaspiVision",
        category: "hardware",
        summary:
            "Security camera on a Raspberry Pi 4. Detects people, animals and vehicles with YOLOv8, streams live MJPEG to a browser and sends Telegram alerts with snapshots.",
        status: "Completed",
        context: "Annual school project",
        links: { source: "https://github.com/MartinKoudela/rpi-cam" },
        layout: "table-media",
        specTable: {
            label: "Table 2",
            caption: "RaspiVision specifications",
            columns: ["Parameter", "Value", "Note"],
            minWidth: 600,
            mobileMinWidth: 520,
        },
        specs: [
            { label: "Board", value: "Raspberry Pi 4 Model B", note: "BCM2711, 4× Cortex-A72 @ 1.8 GHz", fn: "piBriefs" },
            { label: "Camera", value: "Camera Module 3 NoIR" },
            { label: "Motion sensor", value: "PIR", note: "HW-416" },
            { label: "Detection", value: "YOLOv8", note: "People, animals, vehicles" },
            { label: "Recording", value: "Circular H264 buffer", note: "Length [PLACEHOLDER]" },
            { label: "Live view", value: "MJPEG", note: "FastAPI backend, vanilla JS web UI" },
            { label: "Alerts", value: "Telegram", note: "With snapshot" },
            { label: "Remote access", value: "Tailscale", note: "No ports exposed to the internet" },
            { label: "Schematic", value: "KiCad", note: "Fig. 5b" },
            { label: "Status", value: "Completed", note: "Annual school project" },
        ],
        figures: [
            {
                id: "fig-5a",
                label: "Fig. 5a",
                caption: "Raspberry Pi 4 in its case during assembly; CSI ribbon to the camera, PIR wired to GPIO.",
                media: {
                    kind: "image",
                    src: "/raspivision-unit.jpg",
                    width: 1932,
                    height: 1087,
                    alt: "Raspberry Pi 4 in a black case with the lid off, a flat CSI ribbon cable attached to the camera connector",
                },
            },
            {
                id: "fig-5b",
                label: "Fig. 5b",
                caption: "KiCad schematic: Raspberry Pi 4 GPIO header, Camera Module 3 NoIR via 15-pin CSI ribbon, HW-416 PIR sensor.",
                media: {
                    kind: "image",
                    src: "/raspivision-schematic.svg",
                    width: 1600,
                    height: 1000,
                    alt: "KiCad schematic: Raspberry Pi 4 40-pin GPIO header, Camera Module 3 NoIR on a 15-pin CSI connector, and the HW-416 PIR sensor connected to +5V, GPIO17 and GND",
                },
            },
        ],
        images: [
            {
                kind: "image",
                src: "/raspivision-sample-frame.jpg",
                width: 2576,
                height: 1449,
                alt: "Camera snapshot of a desk with a monitor, a laptop and posters on the wall, date and time stamped in the top-left corner",
                caption: "Snapshot from the camera with timestamp overlay.",
            },
            {
                kind: "image",
                src: "/raspivision-live.png",
                width: 2916,
                height: 1735,
                alt: "RaspiVision web UI in live view: camera stream of a desk with date, 42 FPS and 640×420 in the overlay, Snapshot and Record buttons on the right",
                caption: "Web UI, live view: MJPEG stream, 640×420 at 42 FPS, snapshot and record controls.",
            },
            {
                kind: "image",
                src: "/rpi.jpg",
                width: 496,
                height: 300,
                alt: "Camera frame with YOLOv8 bounding boxes labelled Martin, Phone and Cup",
                caption: "Detection output with labelled bounding boxes",
            },
            {
                kind: "image",
                src: "/rpi2.png",
                width: 2940,
                height: 1912,
                alt: "RaspiVision web UI listing recorded clips in a grid",
                caption: "Web UI, recordings gallery",
            },
        ],
        note: {
            summary:
                "Security camera on a Raspberry Pi 4. Detects people, animals and vehicles with YOLOv8, streams live MJPEG to a browser and sends Telegram alerts with snapshots. Remote access runs over Tailscale.",
            diagram: {
                id: "an-fig-1",
                label: "Fig. 1",
                caption: "System diagram. Shaded block runs on the Pi.",
                media: {
                    kind: "diagram",
                    width: 864,
                    height: 264,
                    arrows: [
                        arrowRight(152, 72),
                        arrowRight(152, 200),
                        arrowRight(408, 72),
                        arrowRight(408, 200),
                        arrowRight(640, 72),
                        arrowRight(640, 200),
                    ],
                    cards: [
                        { x: 0, y: 40, w: 152, h: 72, title: "Camera", lines: ["Camera Module 3 NoIR"] },
                        { x: 0, y: 168, w: 152, h: 72, title: "Motion", lines: ["PIR sensor"] },
                        {
                            x: 232,
                            y: 40,
                            w: 176,
                            h: 200,
                            title: "Raspberry Pi 4",
                            lines: ["YOLOv8 detection:", "people, animals, vehicles", "", "Circular H264 buffer", "", "FastAPI"],
                            tint: true,
                        },
                        { x: 488, y: 40, w: 152, h: 72, title: "Live view", lines: ["MJPEG stream"] },
                        { x: 488, y: 168, w: 152, h: 72, title: "Alert", lines: ["Telegram + snapshot"] },
                        { x: 720, y: 40, w: 144, h: 72, title: "Web UI", lines: ["vanilla JS"] },
                        { x: 720, y: 168, w: 144, h: 72, title: "Client", lines: ["Telegram"] },
                    ],
                    texts: [
                        { x: 160, y: 176, w: 64, text: "motion", label: true, center: true },
                        { x: 644, y: 88, w: 72, text: "Tailscale", label: true, center: true },
                    ],
                    mobile: [
                        {
                            t: "grid",
                            cards: [
                                { title: "Camera", lines: ["Camera Module 3 NoIR"] },
                                { title: "Motion", lines: ["PIR sensor"] },
                            ],
                        },
                        { t: "arrow" },
                        {
                            t: "card",
                            card: {
                                title: "Raspberry Pi 4",
                                lines: ["YOLOv8 detection:", "people, animals, vehicles", "", "Circular H264 buffer", "", "FastAPI"],
                                tint: true,
                            },
                        },
                        { t: "arrow" },
                        {
                            t: "grid",
                            cards: [
                                { title: "Live view", lines: ["MJPEG stream"] },
                                { title: "Alert", lines: ["Telegram + snapshot"] },
                            ],
                        },
                        { t: "arrow" },
                        {
                            t: "grid",
                            cards: [
                                { title: "Web UI", lines: ["vanilla JS"] },
                                { title: "Client", lines: ["Telegram"] },
                            ],
                        },
                    ],
                },
            },
            specs: [
                { label: "Board", value: "Raspberry Pi 4 Model B", note: "BCM2711, quad-core Cortex-A72 @ 1.8 GHz", fn: "pi4Brief" },
                { label: "Memory", value: "[PLACEHOLDER]" },
                { label: "Camera", value: "Camera Module 3 NoIR" },
                { label: "Motion sensor", value: "PIR", note: "HW-416" },
                { label: "Detection", value: "YOLOv8", note: "People, animals, vehicles" },
                { label: "Recording", value: "Circular H264 buffer", note: "Length [PLACEHOLDER]" },
                { label: "Live view", value: "MJPEG", note: "FastAPI backend" },
                { label: "Stream", value: "640×420, 42 FPS", note: "Live view overlay" },
                { label: "Web UI", value: "Vanilla JS" },
                { label: "Alerts", value: "Telegram", note: "With snapshot" },
                { label: "Remote access", value: "Tailscale", note: "No ports exposed to the internet" },
                { label: "Schematic", value: "KiCad", note: "Fig. 3" },
                { label: "Operating temperature", value: "0 to 50 °C", note: "Board rating", fn: "pi4Brief" },
                { label: "Status", value: "Completed", note: "Annual school project" },
            ],
            howItWorks: [
                {
                    title: "Capture",
                    text: "A Raspberry Pi Camera Module 3 NoIR supplies the video feed. An HW-416 PIR sensor reports motion.",
                },
                {
                    title: "Detection",
                    text: "YOLOv8 runs on the Pi 4 and sorts detections into three classes: people, animals and vehicles.",
                },
                {
                    title: "Recording",
                    text: "Footage goes into a circular H264 buffer, so the most recent stretch is always kept. Buffer length: [PLACEHOLDER].",
                },
                {
                    title: "Live view",
                    text: "A FastAPI backend serves a live MJPEG stream to a web UI written in vanilla JavaScript.",
                },
                { title: "Alerts", text: "Detections send a Telegram message with a snapshot attached." },
                {
                    title: "Remote access",
                    text: "The web UI is reached over Tailscale. No ports are exposed to the internet.",
                },
            ],
            hardware: {
                figures: [
                    {
                        id: "an-fig-2",
                        label: "Fig. 2",
                        caption: "Front plate during assembly: Camera Module 3 NoIR and HW-416 PIR sensor.",
                        media: {
                            kind: "image",
                            src: "/raspivision-front-plate.jpg",
                            width: 1932,
                            height: 1449,
                            alt: "Black front plate held in a hand, with the camera module board and the blue HW-416 PIR sensor board mounted on the back, CSI ribbon and jumper wires attached",
                        },
                    },
                    {
                        id: "an-fig-3",
                        label: "Fig. 3",
                        caption: "KiCad schematic: Raspberry Pi 4 GPIO header, Camera Module 3 NoIR via 15-pin CSI ribbon, HW-416 PIR sensor.",
                        media: {
                            kind: "image",
                            src: "/raspivision-schematic.svg",
                            width: 1600,
                            height: 1000,
                            alt: "KiCad schematic: Raspberry Pi 4 40-pin GPIO header, Camera Module 3 NoIR on a 15-pin CSI connector, and the HW-416 PIR sensor connected to +5V, GPIO17 and GND",
                        },
                    },
                ],
                parts: {
                    label: "Table 2",
                    caption: "Parts",
                    columns: ["Part", "Role"],
                    rows: [
                        { label: "Raspberry Pi 4 Model B", value: "Detection, recording, web server" },
                        { label: "Camera Module 3 NoIR", value: "Video input" },
                        { label: "HW-416 PIR motion sensor", value: "Motion input" },
                        { label: "[PLACEHOLDER]", value: "Power, enclosure, other parts", muted: true },
                    ],
                },
            },
        },
    },
    {
        slug: "l0k1",
        name: "l0k1 (Loki)",
        shortName: "l0k1",
        category: "hardware",
        family: "l0k1 family · Assistant",
        summary:
            "Personal voice assistant with an animated face display. The face has three states: idle, listening and speaking. In active development.",
        status: "In active development",
        links: {},
        layout: "strip-specs",
        figures: [
            {
                id: "fig-6a",
                label: "Fig. 6a",
                caption: "Idle",
                media: { kind: "placeholder", label: "[PLACEHOLDER: idle frame]", aspect: "1 / 1" },
            },
            {
                id: "fig-6b",
                label: "Fig. 6b",
                caption: "Listening",
                media: { kind: "placeholder", label: "[PLACEHOLDER: listening frame]", aspect: "1 / 1" },
            },
            {
                id: "fig-6c",
                label: "Fig. 6c",
                caption: "Speaking",
                media: { kind: "placeholder", label: "[PLACEHOLDER: speaking frame]", aspect: "1 / 1" },
            },
        ],
        specs: [
            { label: "Type", value: "Personal voice assistant" },
            { label: "Display", value: "Animated face; idle, listening, speaking" },
            { label: "Hardware", value: "[PLACEHOLDER]" },
            { label: "Status", value: "In active development" },
        ],
    },
    {
        slug: "esp32-pentesting-tool",
        name: "ESP32-S3 handheld",
        shortName: "ESP32-S3 handheld",
        category: "security",
        summary:
            "Battery-powered, modular RF handheld with a built-in display and custom GUI, written in C++. Covers Wi-Fi, BLE, Sub-GHz, NFC/RFID and IR. In active development.",
        status: "In active development",
        links: {},
        layout: "media-table",
        specTable: { label: "Table 3", caption: "Interfaces and build", columns: ["Interface", "Function"], minWidth: 380 },
        figures: [
            {
                id: "fig-7",
                label: "Fig. 7",
                caption: "ESP32-S3 handheld",
                media: { kind: "placeholder", label: "[PLACEHOLDER: photo, handheld front]", aspect: "3 / 4" },
            },
        ],
        specs: [
            { label: "Wi-Fi", value: "Scanning" },
            { label: "BLE", value: "Recon" },
            { label: "Sub-GHz", value: "433 / 868 / 915 MHz" },
            { label: "NFC / RFID", value: "Read, emulation" },
            { label: "IR", value: "Supported" },
            { label: "Display", value: "Built-in, custom GUI" },
            { label: "Power", value: "Battery" },
            { label: "Build", value: "Modular" },
            { label: "Firmware", value: "C++" },
            {
                label: "MCU",
                value: "ESP32-S3; Xtensa LX7 dual-core, 2.4 GHz Wi-Fi, Bluetooth 5 (LE)",
                fn: "esp32Datasheet",
                plain: true,
            },
            { label: "Next revision", value: "", group: true },
            { label: "Packet injection", value: "Planned", fn: "authorised", muted: true },
            { label: "Deauth detection", value: "Planned", muted: true },
            { label: "BadUSB", value: "Planned", muted: true },
        ],
    },
    {
        slug: "laravix-cms",
        name: "Laravix",
        shortName: "Laravix",
        category: "software",
        summary:
            "Open-source multi-tenant CMS. Each site is an isolated tenant with its own content, users, media and theme, delivered through a Blade theme or a token-authenticated REST API. In active development.",
        status: "In active development",
        links: { source: "https://github.com/MartinKoudela/laravix-cms", website: "https://laravix.com" },
        layout: "diagram-specs",
        figures: [
            {
                id: "fig-8",
                label: "Fig. 8",
                caption: "Laravix tenancy and delivery",
                media: {
                    kind: "diagram",
                    width: 864,
                    height: 256,
                    arrows: [arrowRight(176, 32), arrowRight(176, 124), arrowRight(176, 216), arrowRight(544, 72), arrowRight(544, 176)],
                    cards: [
                        { x: 0, y: 0, w: 176, h: 72, title: "Tenant A", lines: ["content, users, media, theme"] },
                        { x: 0, y: 92, w: 176, h: 72, title: "Tenant B", lines: ["content, users, media, theme"] },
                        { x: 0, y: 184, w: 176, h: 72, title: "Tenant n", lines: ["isolated site"] },
                        {
                            x: 256,
                            y: 0,
                            w: 288,
                            h: 256,
                            title: "Laravix",
                            lines: [
                                "Laravel, PHP, Filament",
                                "GrapesJS builder, 45+ extendable blocks",
                                "Revisions, scheduled publishing",
                                "Meilisearch, tenant-aware SEO",
                                "Plugin registries",
                            ],
                            tint: true,
                        },
                        { x: 624, y: 40, w: 240, h: 72, title: "Blade theme", lines: ["server-rendered site"] },
                        { x: 624, y: 144, w: 240, h: 72, title: "REST API", lines: ["headless, token-authenticated"] },
                    ],
                    mobile: [
                        {
                            t: "grid",
                            cards: [
                                { title: "Tenant A", lines: ["content, users, media, theme"] },
                                { title: "Tenant B", lines: ["content, users, media, theme"] },
                                { title: "Tenant n", lines: ["isolated site"] },
                            ],
                        },
                        { t: "arrow" },
                        {
                            t: "card",
                            card: {
                                title: "Laravix",
                                lines: [
                                    "Laravel, PHP, Filament",
                                    "GrapesJS builder, 45+ extendable blocks",
                                    "Revisions, scheduled publishing",
                                    "Meilisearch, tenant-aware SEO",
                                    "Plugin registries",
                                ],
                                tint: true,
                            },
                        },
                        { t: "arrow" },
                        {
                            t: "grid",
                            cards: [
                                { title: "Blade theme", lines: ["server-rendered site"] },
                                { title: "REST API", lines: ["headless, token-authenticated"] },
                            ],
                        },
                    ],
                },
            },
        ],
        specs: [
            { label: "Type", value: "Open-source multi-tenant CMS" },
            { label: "Stack", value: "Laravel, PHP, Filament" },
            { label: "Builder", value: "GrapesJS, 45+ extendable blocks" },
            { label: "Search", value: "Meilisearch" },
            {
                label: "Source",
                value: "github.com/MartinKoudela/laravix-cms",
                href: "https://github.com/MartinKoudela/laravix-cms",
            },
            { label: "Status", value: "In active development" },
        ],
        images: [
            {
                kind: "image",
                src: "/laravix.png",
                width: 2940,
                height: 1912,
                alt: "Laravix admin panel listing pages with their site, language and status",
                caption: "Admin, pages list",
            },
            {
                kind: "image",
                src: "/laravix2.png",
                width: 2940,
                height: 1912,
                alt: "Laravix visual page builder editing a homepage hero section",
                caption: "Visual page builder",
            },
            {
                kind: "image",
                src: "/laravix3.png",
                width: 2940,
                height: 1912,
                alt: "Laravix admin SEO settings with meta title, description and OG image fields",
                caption: "Admin, SEO settings",
            },
        ],
    },
    {
        slug: "backlog",
        name: "Backlog",
        shortName: "Backlog",
        category: "software",
        summary:
            "iOS app that puts projects, tasks and reminders in one data model. Swift and SwiftUI, Liquid Glass design. Finished.",
        status: "Finished",
        links: {},
        layout: "media-specs",
        figures: [
            {
                id: "fig-9",
                label: "Fig. 9a–c",
                caption: "Backlog screens",
                media: {
                    kind: "set",
                    items: [
                        { kind: "placeholder", label: "[PLACEHOLDER: screen]", aspect: "9 / 19.5" },
                        { kind: "placeholder", label: "[PLACEHOLDER: screen]", aspect: "9 / 19.5" },
                        { kind: "placeholder", label: "[PLACEHOLDER: screen]", aspect: "9 / 19.5" },
                    ],
                },
            },
        ],
        specs: [
            { label: "Platform", value: "iOS" },
            { label: "Language", value: "Swift, SwiftUI" },
            { label: "Design", value: "Liquid Glass" },
            { label: "Data model", value: "Projects, tasks and reminders in one model" },
            { label: "Status", value: "Finished" },
        ],
    },
    {
        slug: "l0k1-game",
        name: "l0k1 Game",
        shortName: "l0k1 Game",
        category: "software",
        family: "l0k1 family · Game",
        summary:
            "Browser-based 3D horror game set in a hacker's apartment. The in-game OS has a terminal, a file manager and hacking tools.",
        links: { source: "https://github.com/MartinKoudela/L0k1-game" },
        layout: "specs-media",
        figures: [
            {
                id: "fig-10",
                label: "Fig. 10",
                caption: "In-game OS terminal",
                media: {
                    kind: "image",
                    src: "/l0k1.png",
                    width: 2940,
                    height: 1912,
                    alt: "In-game view of the hacker's apartment, with a laptop showing the in-game OS terminal",
                },
            },
        ],
        specs: [
            { label: "Genre", value: "3D horror, browser" },
            { label: "In-game OS", value: "Terminal, file manager, hacking tools" },
            { label: "Audio", value: "Positional" },
            { label: "AI", value: "Enemy AI" },
            { label: "Assets", value: "60+ GLTF models" },
            { label: "Stack", value: "Three.js, TypeScript, Vite" },
        ],
    },
    {
        slug: "orbis-projects",
        name: "Orbis Projects",
        shortName: "Orbis Projects",
        category: "compact",
        summary:
            "Student project showcase for ORBIS Zlín. Students build their own Blade/Tailwind themes; Filament admin, REST API. Personal initiative, not an assignment.",
        description:
            "A student project showcase platform built for ORBIS Zlín, designed to give students a professional stage to present their work. The platform features a unique theme system where students design and build their own custom Blade templates using Tailwind CSS, maintaining full creative control over how their projects are displayed. Administrators manage project data, taxonomies, and media through a modern Filament dashboard, while a REST API enables dynamic filtering and browsing. Built as a personal initiative during my studies — not a school assignment, but a real tool built to fill a real need.",
        links: { source: "https://github.com/MartinKoudela/orbis-projects", website: "https://orbis.cz" },
        row: {
            description:
                "Student project showcase for ORBIS Zlín. Students build their own Blade/Tailwind themes; Filament admin, REST API. Personal initiative, not an assignment.",
            stack: "Laravel, PHP, Filament",
        },
        specs: [{ label: "Stack", value: "Laravel, PHP, Filament, Tailwind, REST API, Blade" }],
        figures: [],
        images: [
            {
                kind: "image",
                src: "/orbis-projects.png",
                width: 2940,
                height: 1684,
                alt: "Orbis Projects listing student projects as cards, with filters for year, class and project type",
                caption: "Project listing with filters",
            },
        ],
    },
    {
        slug: "football-photogallery",
        name: "Football Photogallery",
        shortName: "Football Photogallery",
        category: "compact",
        summary: "Client project. Match-based photo archive, curated highlights, photographer upload dashboard.",
        description:
            "A bespoke football photogallery platform developed for a client, designed to showcase match photography in an elegant and organized way. The platform features a photographer-focused dashboard for easy photo uploads and management, a curated highlights section displaying the best shots, and a comprehensive match-based photo archive where visitors can browse galleries organized by individual games. Built with performance in mind, the site handles large image collections efficiently while maintaining a clean, modern user interface.",
        links: { website: "https://www.slavicinfotky.cz/" },
        row: {
            description: "Client project. Match-based photo archive, curated highlights, photographer upload dashboard.",
            stack: "Laravel, MySQL, Tailwind",
        },
        specs: [{ label: "Stack", value: "Laravel, MySQL, Tailwind, PHP, Blade" }],
        figures: [],
        images: [
            {
                kind: "image",
                src: "/fotbal.png",
                width: 2940,
                height: 1912,
                alt: "Photogallery homepage with photo, match and comment counters and featured matches",
                caption: "Homepage with featured matches",
            },
            {
                kind: "image",
                src: "/fotbal2.png",
                width: 2940,
                height: 1912,
                alt: "Grid of match galleries, each with a cover photo, date and score",
                caption: "Match archive",
            },
            {
                kind: "image",
                src: "/fotbal3.png",
                width: 2940,
                height: 1912,
                alt: "Single match page with the score and a grid of photos",
                caption: "Match gallery",
            },
            {
                kind: "image",
                src: "/fotbal4.png",
                width: 2940,
                height: 1912,
                alt: "Full-screen photo viewer showing a goalkeeper diving, with thumbnails below",
                caption: "Photo viewer",
            },
        ],
    },
    {
        slug: "trackee",
        name: "Trackee",
        shortName: "Trackee",
        category: "compact",
        summary: "Team project management: teams, kanban boards, shared calendar, assignments, comments, notifications.",
        description:
            "A modern team collaboration and project management platform designed to streamline workflow and boost productivity. Users can create and join teams, set up projects with detailed task breakdowns, and track progress through intuitive kanban boards. The platform includes a shared calendar system for scheduling deadlines and meetings, customizable user profiles, and real-time collaboration features. Team members can assign tasks, set priorities, add comments, and receive notifications about updates. The clean, minimalist interface ensures users stay focused on what matters most - getting work done.",
        links: {},
        row: {
            description: "Team project management: teams, kanban boards, shared calendar, assignments, comments, notifications.",
            stack: "Laravel, Tailwind, MySQL",
        },
        specs: [{ label: "Stack", value: "Laravel, Tailwind, MySQL, JavaScript, Blade, REST API" }],
        figures: [],
        images: [
            {
                kind: "image",
                src: "/trackee1.png",
                width: 2908,
                height: 1670,
                alt: "Trackee dashboard with project, team, task and friend counters, projects and reminders",
                caption: "Dashboard",
            },
            {
                kind: "image",
                src: "/trackee2.png",
                width: 2908,
                height: 1670,
                alt: "Trackee user profile with avatar, about section and tags",
                caption: "User profile",
            },
        ],
    },
    {
        slug: "filmio",
        name: "Filmio",
        shortName: "Filmio",
        category: "compact",
        summary: "Film club web app: catalog, screening votes, ratings and reviews, role-based access.",
        description:
            "A school project that evolved into a fully functional film club web application. The platform allows movie enthusiasts to create accounts, join the club community, and participate in shared movie watching sessions. Members can browse the film catalog, vote on upcoming screenings, and discuss movies with other members. The admin dashboard provides complete control over the film database, user management, and scheduling of watch sessions. Features include user authentication with role-based access, a rating and review system, and a clean interface optimized for easy navigation.",
        links: {},
        row: {
            description: "Film club web app: catalog, screening votes, ratings and reviews, role-based access.",
            stack: "PHP, MySQL, Tailwind",
        },
        specs: [{ label: "Stack", value: "PHP, MySQL, Tailwind, HTML, Authentication" }],
        figures: [],
        images: [
            {
                kind: "image",
                src: "/filmio1.png",
                width: 2908,
                height: 1670,
                alt: "Filmio admin panel with a form for adding a film and a club health summary",
                caption: "Admin panel",
            },
            {
                kind: "image",
                src: "/filmio2.png",
                width: 2908,
                height: 1670,
                alt: "Filmio member dashboard with membership details and the film catalog",
                caption: "Member dashboard",
            },
        ],
    },
    {
        slug: "cafecheck",
        name: "Cafecheck",
        shortName: "Cafecheck",
        category: "compact",
        summary: "Private café review site for Zlín and surroundings.",
        description:
            "A personal passion project for documenting and sharing experiences at local coffee shops in Zlín and surrounding areas. The website features subjective reviews covering atmosphere, coffee quality, food options, and overall vibe of each location. Each review includes personal photos capturing the unique character of the cafes, along with practical information like opening hours and location. Built as a non-public platform for personal use and sharing with friends who share the same appreciation for good coffee and cozy spaces.",
        links: {},
        row: {
            description: "Private café review site for Zlín and surroundings.",
            stack: "JavaScript, Bootstrap, EmailJS",
        },
        specs: [{ label: "Stack", value: "JavaScript, Bootstrap, EmailJS, HTML, CSS" }],
        figures: [],
        images: [
            {
                kind: "image",
                src: "/cafecheck1.png",
                width: 2908,
                height: 1670,
                alt: "Cafecheck homepage reading Welcome to Café reviews, Zlín and surroundings",
                caption: "Homepage",
            },
            {
                kind: "image",
                src: "/cafecheck2.png",
                width: 2908,
                height: 1670,
                alt: "Cafecheck review page with filters and café photos",
                caption: "Café review listing",
            },
        ],
    },
];

export const forensics: PlainTable = {
    label: "Table 4",
    caption: "Forensics and tooling",
    columns: ["Work", "Scope", "Tools"],
    rows: [
        ["Phishing email forensics", "Headers, DNS, WHOIS", "URLScan, VirusTotal"],
        ["MIFARE Classic NFC forensics", "CTF challenge", "[PLACEHOLDER]"],
        ["Main toolkit", "Daily environment", "Kali Linux"],
    ],
    monoColumn: 2,
};

export const otherSoftware = { label: "Table 5", caption: "Other software", columns: ["Name", "Description", "Stack", "Link"] };

export function projectsIn(category: Category): Project[] {
    return projects.filter((p) => p.category === category);
}

export function noteFigures(project: Project): { diagram?: Figure; hardware: Figure[]; figures: Figure[] } {
    const homeDiagram = project.figures.find((f) => f.media.kind === "diagram");
    const diagram = project.note?.diagram ?? homeDiagram;
    const hardware = project.note?.hardware.figures ?? [];
    const source = project.note ? [] : project.figures.filter((f) => f !== homeDiagram);

    const numbers = new Map<string, number>();
    let next = 1;
    const renumber = (label: string): string => {
        const [, base, suffix] = label.match(/^Fig\. (\d+)(.*)$/)!;
        if (!numbers.has(base)) numbers.set(base, next++);
        return `Fig. ${numbers.get(base)}${suffix}`;
    };

    const renumbered = (f: Figure): Figure => ({ ...f, id: `an-${f.id}`, label: renumber(f.label) });
    const first = diagram && renumbered(diagram);
    const hw = hardware.map(renumbered);
    const figures = source.map(renumbered);
    const images = (project.images ?? []).map(({ caption, ...media }, i): Figure => ({
        id: `an-img-${i}`,
        label: `Fig. ${next++}`,
        caption,
        media,
    }));

    return { diagram: first, hardware: hw, figures: [...figures, ...images] };
}

export function noteSpecs(project: Project): SpecRow[] {
    return project.note?.specs ?? project.specs;
}

export function noteFootnotes(project: Project): Map<FootnoteKey, number> {
    const map = new Map<FootnoteKey, number>();
    for (const row of noteSpecs(project)) {
        if (row.fn && !map.has(row.fn)) map.set(row.fn, map.size + 1);
    }
    return map;
}

export function neighbours(project: Project): { previous: Project; next: Project } {
    const i = projects.indexOf(project);
    return {
        previous: projects[(i - 1 + projects.length) % projects.length],
        next: projects[(i + 1) % projects.length],
    };
}

export const specifications = {
    title: "Specifications",
    label: "Table 6",
    caption: "Skills and tools",
    columns: ["Parameter", "Values"],
    rows: [
        ["Interfaces & protocols", "TCP/IP · DNS · Wi-Fi · BLE · Sub-GHz · NFC/RFID · IR · REST · MJPEG streaming"],
        ["Languages", "Python · C/C++ · PHP · JavaScript/TypeScript · Swift"],
        ["Frameworks & platforms", "Laravel · Filament · Next.js/React · FastAPI · Three.js · SwiftUI · OpenCV · YOLO"],
        ["Hardware", "ESP32-S3 · Raspberry Pi 4/5 · sensors · soldering · KiCad"],
        ["Tooling", "Git · Tailscale · Cloudflare · Kali Linux"],
        ["English", "B2, Cambridge B2 First"],
        ["Location", "Zlín, Czech Republic"],
        ["MTBF", "Depends on coffee supply"],
    ],
};

export const revisions = {
    title: "Revision history",
    label: "Table 7",
    caption: "Milestones",
    columns: ["Rev", "Date", "Change"],
    rows: [
        ["1", "[DATE]", "Cambridge B2 First (FCE)"],
        ["2", "[DATE]", "Two-week internship at MarketSoul, web development"],
        ["3", "[DATE]", "Part-time robotics programmer at SYNOT ICT (Unitree G1)"],
        ["4", "[DATE]", "RaspiVision completed as annual school project"],
        ["5", "[DATE]", "Backlog iOS app finished"],
        ["6", "[DATE]", "Laravix in active development"],
    ],
};

export const ordering = {
    availability: "Open to networking, security, hardware and backend projects. Web projects selectively.",
    label: "Table 8",
    caption: "Ordering channels",
    columns: ["Channel", "Address"],
    channels: [
        { label: "Email", value: identity.email, href: `mailto:${identity.email}` },
        { label: "GitHub", value: "github.com/MartinKoudela", href: "https://github.com/MartinKoudela" },
        {
            label: "LinkedIn",
            value: "linkedin.com/in/martin-koudela-a5b645343",
            href: "https://www.linkedin.com/in/martin-koudela-a5b645343/",
        },
    ] satisfies Fact[],
    also: [
        { label: "Instagram", href: "https://www.instagram.com/koudy_martin/" },
        { label: "Facebook", href: "https://www.facebook.com/koudela.martin.9?locale=cs_CZ" },
        { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/martinkoudela" },
    ],
};

export const footer = {
    line: "MK-01 · Martin Koudela · Zlín, Czech Republic",
    builtWith: "Built with Next.js",
    back: "Back to the datasheet",
};
