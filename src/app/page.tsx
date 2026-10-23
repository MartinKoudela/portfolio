import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Intro from "@/components/home/Intro";

export default function Page() {
    return (
        <>
            <SiteHeader home />
            <div className="page">
                <main>
                    <Intro />
                </main>
                <SiteFooter />
            </div>
        </>
    );
}
