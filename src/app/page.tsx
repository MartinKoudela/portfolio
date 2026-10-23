import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Intro from "@/components/home/Intro";
import Networking from "@/components/home/Networking";
import Hardware from "@/components/home/Hardware";

export default function Page() {
    return (
        <>
            <SiteHeader home />
            <div className="page">
                <main>
                    <Intro />
                    <Networking />
                    <Hardware />
                </main>
                <SiteFooter />
            </div>
        </>
    );
}
