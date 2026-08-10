import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0D0D0C] text-[#E8E8E2] flex items-center justify-center px-6">
            <div>
                <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-4">404</p>
                <h1 className="text-3xl font-bold mb-6">Page not found.</h1>
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 text-sm text-[#6B6B65] hover:text-[#E8E8E2] transition-colors"
                >
                    <ArrowLeft size={14} /> Back to work
                </Link>
            </div>
        </div>
    );
}
