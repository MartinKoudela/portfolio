import Image from "next/image";
import type { Figure, Media, PlaceholderMedia } from "@/content/site";
import { cx } from "@/lib/cx";
import Caption from "./Caption";
import { Diagram, MobileDiagram } from "./Diagram";

function Placeholder({ media }: { media: PlaceholderMedia }) {
    return (
        <div className="ph" style={{ aspectRatio: media.aspect }}>
            {media.label}
        </div>
    );
}

function Body({ id, media, captionId }: { id: string; media: Media; captionId: string }) {
    switch (media.kind) {
        case "placeholder":
            return <Placeholder media={media} />;
        case "image":
            return (
                <Image
                    src={media.src}
                    alt={media.alt}
                    width={media.width}
                    height={media.height}
                    sizes="(max-width: 767px) 100vw, 864px"
                    className="fig-img"
                />
            );
        case "set":
            return (
                <div className="ph-set">
                    {media.items.map((item, i) => (
                        <Placeholder key={i} media={item} />
                    ))}
                </div>
            );
        case "diagram":
            return (
                <>
                    <div className="scroll hide-m" role="region" tabIndex={0} aria-labelledby={captionId}>
                        <Diagram id={id} diagram={media} />
                    </div>
                    <div className="hide-d">
                        <MobileDiagram diagram={media} />
                    </div>
                </>
            );
    }
}

type Props = { figure: Figure; rail?: boolean; className?: string };

export default function FigureView({ figure, rail = false, className }: Props) {
    const captionId = `${figure.id}-caption`;
    const gap = figure.captionGap ?? (figure.media.kind === "diagram" ? 10 : 8);
    const caption = (
        <Caption
            as="figcaption"
            id={captionId}
            label={figure.label}
            text={figure.caption}
            mobileText={figure.mobileCaption}
            rail={rail}
            className={rail ? "rail" : `cap-gap-${gap}`}
        />
    );

    if (rail) {
        return (
            <figure className={cx("row fig fig--rail", className)}>
                {caption}
                <div className="main">
                    <Body id={figure.id} media={figure.media} captionId={captionId} />
                </div>
            </figure>
        );
    }

    return (
        <figure className={cx("fig", className)}>
            <Body id={figure.id} media={figure.media} captionId={captionId} />
            {caption}
        </figure>
    );
}
