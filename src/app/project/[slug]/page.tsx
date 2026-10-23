import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    categorySection,
    footnotes,
    neighbours,
    noteFigures,
    noteFootnotes,
    noteSpecs,
    projects,
    section,
    type Fact,
    type Project,
} from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Caption from "@/components/Caption";
import DataTable, { specRows } from "@/components/DataTable";
import FigureView from "@/components/FigureView";
import Footnotes from "@/components/Footnotes";
import { rich } from "@/components/Rich";

type Params = { slug: string };

function excerpt(text: string, max = 160): string {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, clean.lastIndexOf(" ", max - 1)).trimEnd() + "…";
}

function summaryOf(project: Project): string {
    return project.note?.summary ?? project.description ?? project.summary;
}

function bareUrl(url: string): string {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function findProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function generateStaticParams(): Params[] {
    return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) return { title: "Project not found" };

    const description = project.metaDescription ?? excerpt(summaryOf(project));
    const url = `/project/${project.slug}`;

    return {
        title: project.name,
        description,
        alternates: { canonical: url },
        openGraph: {
            title: `${project.name} | Martin Koudela`,
            description,
            url,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.name} | Martin Koudela`,
            description,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) notFound();

    const s = section(categorySection[project.category]);
    const { diagram, hardware, figures } = noteFigures(project);
    const phones = figures.every((f) => f.media.kind === "image" && f.media.height > f.media.width * 1.8);
    const specs = noteSpecs(project);
    const fnNumbers = noteFootnotes(project);
    const footnote = (row: { fn?: keyof typeof footnotes }) => (row.fn ? fnNumbers.get(row.fn) : undefined);
    const { previous, next } = neighbours(project);

    const columns =
        project.note || specs.some((r) => r.note)
            ? ["Parameter", "Value", "Note"]
            : (project.specTable?.columns ?? ["Parameter", "Value"]);
    const threeColumns = columns.length === 3;

    const meta: Fact[] = [
        { label: "Section", value: `${s.code} · ${s.title}` },
        ...(project.status ? [{ label: "Status", value: project.status }] : []),
        ...(project.context ? [{ label: "Context", value: project.context }] : []),
        ...(project.links.source
            ? [{ label: "Source", value: bareUrl(project.links.source), href: project.links.source }]
            : []),
        ...(project.links.website
            ? [{ label: "Website", value: bareUrl(project.links.website), href: project.links.website }]
            : []),
    ];

    return (
        <>
            <SiteHeader current={s.id} />
            <div className="page page--note">
                <main>
                    <p className="an-back">
                        <Link href={`/#${s.id}`}>
                            ← {s.code} · {s.title}
                        </Link>
                    </p>

                    <section aria-labelledby="an-title" className="row an-hero">
                        <div className="rail">
                            <p className="an-kick">Application note</p>
                            {project.icon && (
                                <Image src={project.icon} alt="" width={52} height={52} className="an-icon" />
                            )}
                            {project.family && <p className="mono family">{project.family}</p>}
                            {project.descriptor && <p className="mono family">{project.descriptor}</p>}
                        </div>
                        <div className="main">
                            <h1 id="an-title" className="an-title">
                                {project.name}
                                {project.preliminary && <span className="prelim">Preliminary</span>}
                            </h1>
                            <p className="an-sum">{summaryOf(project)}</p>
                        </div>
                    </section>

                    <dl className="an-meta">
                        {meta.map((m) => (
                            <div key={m.label}>
                                <dt>{m.label}</dt>
                                <dd>{m.href ? <a href={m.href}>{m.value}</a> : m.value}</dd>
                            </div>
                        ))}
                    </dl>

                    {diagram && <FigureView figure={diagram} rail className="an-block" />}

                    <section aria-labelledby="h-spec" className="row an-block">
                        <div className="rail">
                            <h2 id="h-spec" className="an-rail-title">
                                Specifications
                            </h2>
                            <Caption id="an-table-1" label="Table 1" className="an-rail-cap" />
                        </div>
                        <div className="main">
                            <DataTable
                                columns={columns.map((label, i) => ({
                                    label,
                                    width: threeColumns ? ["24%", "32%"][i] : i === 0 ? "34%" : undefined,
                                }))}
                                rows={specRows(specs, columns.length, footnote)}
                                minWidth={threeColumns ? 600 : 480}
                                mobileMinWidth={threeColumns ? 520 : 0}
                                labelledBy="h-spec an-table-1"
                            />
                        </div>
                    </section>

                    {project.note && (
                        <section aria-labelledby="h-how" className="an-block">
                            <h2 id="h-how" className="h-sub an-h">
                                How it works
                            </h2>
                            {project.note.howItWorks.map((step) => (
                                <div key={step.title} className="row hiw">
                                    <h3 className="rail">{step.title}</h3>
                                    <p className="main">{rich(step.text)}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {project.note && (
                        <section aria-labelledby="h-hw" className="an-hw">
                            <h2 id="h-hw" className="h-sub">
                                Hardware
                            </h2>
                            <div className="note-figs note-figs--2 an-figs">
                                {hardware.map((f) => (
                                    <FigureView key={f.id} figure={f} />
                                ))}
                            </div>
                            <div className="row an-parts">
                                <Caption
                                    id="an-table-2"
                                    label={project.note.hardware.parts.label}
                                    text={project.note.hardware.parts.caption}
                                    rail
                                    className="rail"
                                />
                                <div className="main">
                                    <DataTable
                                        columns={project.note.hardware.parts.columns.map((label, i) => ({
                                            label,
                                            width: i === 0 ? "44%" : undefined,
                                        }))}
                                        rows={specRows(project.note.hardware.parts.rows, 2, () => undefined)}
                                        minWidth={480}
                                        mobileMinWidth={0}
                                        labelledBy="an-table-2"
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {figures.length > 0 && (
                        <div
                            className={
                                phones
                                    ? "note-figs note-figs--3 an-figs an-gallery an-gallery--phones"
                                    : "note-figs note-figs--2 an-figs an-gallery"
                            }
                        >
                            {figures.map((f) => (
                                <FigureView key={f.id} figure={f} />
                            ))}
                        </div>
                    )}

                    {fnNumbers.size > 0 && (
                        <Footnotes
                            ruled
                            items={[...fnNumbers].map(([key, n]) => ({ n, text: footnotes[key] }))}
                        />
                    )}

                    <nav aria-label="Other application notes" className="an-nav">
                        <Link href={`/project/${previous.slug}`} className="plain">
                            <span className="an-nav-label">Previous application note</span>
                            <span className="an-nav-title">{previous.name}</span>
                        </Link>
                        <Link href={`/project/${next.slug}`} className="plain an-nav-next">
                            <span className="an-nav-label">Next application note</span>
                            <span className="an-nav-title">{next.name}</span>
                        </Link>
                    </nav>
                </main>
                <SiteFooter note />
            </div>
        </>
    );
}
