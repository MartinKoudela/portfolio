import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Page() {
    return (
        <>
            <SiteHeader home />
            <div className="page">
                <main></main>
                <SiteFooter />
            </div>
        </>
    );
}
