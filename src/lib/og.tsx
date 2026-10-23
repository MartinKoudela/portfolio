import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { identity, sections, siteMeta, type SectionId } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const paper = "#F5F2EB";
const ink = "#191816";
const grey = "#5F5C56";
const rule = "#D6D1C6";
const accent = "#BF3F0B";

const domain = siteMeta.url.replace(/^https?:\/\//, "");

function loadFont(file: string): Promise<Buffer> {
    return readFile(join(process.cwd(), "assets/fonts", file));
}

type Props = {
    kicker?: string;
    title: string;
    titleSize: number;
    subtitle?: string;
    line: string;
    active: SectionId;
};

export async function ogImage({ kicker, title, titleSize, subtitle, line, active }: Props) {
    const brand = `\u00a0\u00a0|\u00a0\u00a0${identity.name}`;
    const [display, bold, regular, medium, code] = await Promise.all([
        loadFont("Archivo-ExpandedSemiBold.ttf"),
        loadFont("Archivo-Bold.ttf"),
        loadFont("Archivo-Regular.ttf"),
        loadFont("Archivo-Medium.ttf"),
        loadFont("IBMPlexMono-Regular.ttf"),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "56px 72px 48px",
                    background: paper,
                    color: ink,
                    fontFamily: "Archivo",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        paddingBottom: 16,
                        borderBottom: `2px solid ${ink}`,
                        fontSize: 22,
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <span style={{ fontWeight: 700 }}>{identity.device}</span>
                        <span>{brand}</span>
                    </div>
                    <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 18, color: grey }}>{domain}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                    {kicker && (
                        <div style={{ display: "flex", fontFamily: "Plex Mono", fontSize: 20, color: grey, marginBottom: 20 }}>
                            {kicker}
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            fontFamily: "Archivo Expanded",
                            fontWeight: 600,
                            fontSize: titleSize,
                            lineHeight: 0.92,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {title}
                    </div>
                    {subtitle && (
                        <div style={{ display: "flex", marginTop: 28, fontSize: 44, fontWeight: 500 }}>{subtitle}</div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            columnGap: 7,
                            marginTop: subtitle ? 12 : 28,
                            maxWidth: 1000,
                            fontSize: 28,
                            lineHeight: 1.35,
                            color: grey,
                        }}
                    >
                        {line.split(" ").map((word, i) => (
                            <span key={i}>{word}</span>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 32,
                        paddingTop: 16,
                        borderTop: `1px solid ${rule}`,
                        fontSize: 18,
                    }}
                >
                    {sections.map((s) => (
                        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                                style={{
                                    width: 9,
                                    height: 9,
                                    borderRadius: 9,
                                    background: s.id === active ? accent : "transparent",
                                }}
                            />
                            <div style={{ display: "flex", fontFamily: "Plex Mono", color: ink }}>{s.code}</div>
                            <div style={{ display: "flex", color: grey }}>{s.port}</div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            ...ogSize,
            fonts: [
                { name: "Archivo Expanded", data: display, weight: 600, style: "normal" },
                { name: "Archivo", data: bold, weight: 700, style: "normal" },
                { name: "Archivo", data: regular, weight: 400, style: "normal" },
                { name: "Archivo", data: medium, weight: 500, style: "normal" },
                { name: "Plex Mono", data: code, weight: 400, style: "normal" },
            ],
        }
    );
}
