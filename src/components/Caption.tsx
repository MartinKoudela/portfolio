import { cx } from "@/lib/cx";

type Props = {
    label: string;
    text?: string;
    mobileText?: string;
    rail?: boolean;
    as?: "p" | "figcaption";
    id?: string;
    className?: string;
};

export default function Caption({ label, text, mobileText, rail = false, as: Tag = "p", id, className }: Props) {
    return (
        <Tag id={id} className={cx("cap", rail && "cap--rail", className)}>
            <b>{label}</b>
            {text && (
                <>
                    <span className="cap-sep">{"  "}</span>
                    {mobileText ? (
                        <>
                            <span className="hide-m">{text}</span>
                            <span className="hide-d">{mobileText}</span>
                        </>
                    ) : (
                        text
                    )}
                </>
            )}
        </Tag>
    );
}
