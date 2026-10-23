import Link from "next/link";
import { homeFootnoteNumbers, type Project, type SpecRow } from "@/content/site";
import Caption from "../Caption";
import DataTable, { specRows } from "../DataTable";
import FigureView from "../FigureView";
import SpecList from "../SpecList";

const homeFootnote = (row: SpecRow) => (row.fn ? homeFootnoteNumbers[row.fn] : undefined);

function SpecTableBlock({ project }: { project: Project }) {
    const t = project.specTable!;
    const id = `${project.slug}-table-caption`;
    const widths = t.columns.length === 3 ? ["22%", "32%"] : ["34%"];
    return (
        <div className="tbl-block">
            <Caption id={id} label={t.label} text={t.caption} className="tbl-cap" />
            <DataTable
                columns={t.columns.map((label, i) => ({
                    label,
                    width: widths[i],
                    mobileWidth: t.columns.length === 3 ? ["26%", "34%"][i] : widths[i],
                }))}
                rows={specRows(project.specs, t.columns.length, homeFootnote)}
                minWidth={t.minWidth}
                mobileMinWidth={t.mobileMinWidth}
                labelledBy={id}
            />
        </div>
    );
}

function Body({ project }: { project: Project }) {
    const [first] = project.figures;

    switch (project.layout) {
        case "media-specs":
            return (
                <div className="note-grid note-grid--media">
                    <FigureView figure={first} />
                    <SpecList rows={project.specs} footnote={homeFootnote} />
                </div>
            );
        case "specs-media":
            return (
                <div className="note-grid note-grid--specs">
                    <SpecList rows={project.specs} footnote={homeFootnote} />
                    <FigureView figure={first} />
                </div>
            );
        case "media-table":
            return (
                <div className="note-grid note-grid--table">
                    <FigureView figure={first} />
                    <SpecTableBlock project={project} />
                </div>
            );
        case "diagram-specs":
            return (
                <>
                    <FigureView figure={first} className="note-block" />
                    <SpecList rows={project.specs} columns={2} footnote={homeFootnote} />
                </>
            );
        case "table-media":
            return (
                <>
                    <div className="note-block">
                        <SpecTableBlock project={project} />
                    </div>
                    <div className="note-figs note-figs--2">
                        {project.figures.map((f) => (
                            <FigureView key={f.id} figure={f} />
                        ))}
                    </div>
                </>
            );
        case "strip-specs":
            return (
                <>
                    <div className="note-figs note-figs--3">
                        {project.figures.map((f) => (
                            <FigureView key={f.id} figure={f} />
                        ))}
                    </div>
                    <SpecList rows={project.specs} columns={2} footnote={homeFootnote} />
                </>
            );
        default:
            return null;
    }
}

export default function AppNote({ project }: { project: Project }) {
    return (
        <article className="note row">
            <div className="rail">
                <p className="kick">Application note</p>
                {project.family && <p className="mono family">{project.family}</p>}
                {project.descriptor && <p className="mono family">{project.descriptor}</p>}
            </div>
            <div className="main">
                <h3 className="an">
                    {project.name}
                    {project.preliminary && <span className="prelim">Preliminary</span>}
                </h3>
                <p className="sum">{project.summary}</p>
                <Body project={project} />
                <p className="more">
                    <Link href={`/project/${project.slug}`}>Application note: {project.shortName}</Link>
                </p>
            </div>
        </article>
    );
}
