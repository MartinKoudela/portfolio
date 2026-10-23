import { Fragment } from "react";
import { identity, ordering, section } from "@/content/site";
import Caption from "../Caption";
import DataTable from "../DataTable";

export default function Ordering() {
    const s = section("console");
    const captionId = "table-ordering-caption";

    return (
        <section id={s.id} aria-labelledby={`h-${s.id}`} className="eth">
            <div className="row">
                <p className="rail mono sec-code">{s.code}</p>
                <div className="main">
                    <h2 id={`h-${s.id}`} className="sec">
                        {s.title}
                    </h2>
                    <p className="order-email">
                        <a href={`mailto:${identity.email}`}>{identity.email}</a>
                    </p>
                    <p className="order-text">{ordering.availability}</p>

                    <div className="tbl-block order-table hide-m">
                        <Caption id={captionId} label={ordering.label} text={ordering.caption} className="tbl-cap" />
                        <DataTable
                            columns={[{ label: ordering.columns[0], width: "22%" }, { label: ordering.columns[1] }]}
                            rows={ordering.channels.map((c) => ({
                                cells: [{ content: c.label }, { content: <a href={c.href}>{c.value}</a>, mono: true }],
                            }))}
                            minWidth={520}
                            labelledBy={captionId}
                        />
                    </div>
                    <div className="hide-d">
                        <Caption label={ordering.label} text={ordering.caption} className="m-cap order-m-cap" />
                        <dl className="kv">
                            {ordering.channels.map((c) => (
                                <div key={c.label}>
                                    <dt>{c.label}</dt>
                                    <dd>
                                        <a href={c.href}>{c.value}</a>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <p className="order-also">
                        Also:{" "}
                        {ordering.also.map((link, i) => (
                            <Fragment key={link.label}>
                                {i > 0 && " · "}
                                <a href={link.href}>{link.label}</a>
                            </Fragment>
                        ))}
                    </p>
                </div>
            </div>
        </section>
    );
}
