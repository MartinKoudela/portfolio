import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
    return (
        <>
            <SiteHeader />
            <div className="page page--note">
                <main className="row an-hero">
                    <p className="rail an-kick">404</p>
                    <div className="main">
                        <h1 className="sec">Page not found.</h1>
                        <p className="more">
                            <Link href="/">Back to work</Link>
                        </p>
                    </div>
                </main>
                <SiteFooter note />
            </div>
        </>
    );
}
