"use client";

export default function ProjectPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white p-8">
            <a href="/" className="text-zinc-400 hover:text-white mb-8 inline-block">
                ← Back
            </a>

            <img
                src="/project-image.png"
                alt="Project"
                className="w-full max-w-3xl rounded-2xl mb-8"
            />

            <h1 className="text-4xl font-bold mb-4">Project Title</h1>

            <p className="text-zinc-400 text-lg mb-6 max-w-2xl">
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 text-sm bg-white/10 rounded-full"></span>
            </div>

            <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-[#5B7CFA] hover:underline"
            >
                Visit project
            </a>
        </main>
    );
}
