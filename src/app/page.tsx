import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Intro from "@/components/home/Intro";
import Networking from "@/components/home/Networking";
import Hardware from "@/components/home/Hardware";
import Security from "@/components/home/Security";
import Software from "@/components/home/Software";

export default function Page() {
    return (
        <>
            <SiteHeader home />
            <div className="page">
                <main>
                    <Intro />
                    <Networking />
                    <Hardware />
                    <Security />
                    <Software />
                </main>
                <SiteFooter />
            </div>
        </>
    );
}
