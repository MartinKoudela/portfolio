import Link from "next/link";
import { footer } from "@/content/site";

export default function SiteFooter({ note = false }: { note?: boolean }) {
    return (
        <footer id="page-end" className={note ? "site-footer site-footer--note" : "site-footer"}>
            <span>{footer.line}</span>
            {note ? (
                <Link href="/" className="muted-link">
                    {footer.back}
                </Link>
            ) : (
                <span>{footer.builtWith}</span>
            )}
        </footer>
    );
}
