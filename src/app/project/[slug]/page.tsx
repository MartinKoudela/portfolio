"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function ProjectPage() {
    const params = useParams();
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0D0D0C] text-[#E8E8E2] flex items-center justify-center">
                <div>
                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-4">404</p>
                    <h1 className="text-3xl font-bold mb-6">Project not found.</h1>
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

    const projectIndex = projects.indexOf(project);
    const next = projects[(projectIndex + 1) % projects.length];

    return (
        <div className="min-h-screen bg-[#0D0D0C] text-[#E8E8E2]">

            {/* Nav bar */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0D0D0C]/90 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#6B6B65] uppercase hover:text-[#E8E8E2] transition-colors"
                    >
                        <ArrowLeft size={12} /> Back
                    </Link>
                    <p className="text-[11px] tracking-[0.2em] text-[#3D3D38] uppercase" translate="no">
                        {String(projectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </p>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-5">Project</p>
                    <h1 className="font-bold leading-[0.9] tracking-[-0.03em] mb-8" style={{ fontSize: "clamp(42px, 6vw, 88px)" }} translate="no">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] tracking-[0.2em] text-[#3D3D38] uppercase border-b border-white/[0.06] pb-0.5"
                                translate="no"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Image */}
                {project.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-16 overflow-hidden rounded-2xl border border-white/[0.06]"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid md:grid-cols-[160px_1fr] gap-12 md:gap-20 mb-16"
                >
                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase pt-1">Overview</p>
                    <p className="text-[#6B6B65] leading-relaxed text-lg">
                        {project.description}
                    </p>
                </motion.div>

                {/* CTA */}
                {project.url && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.35 }}
                        className="mb-24"
                    >
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8E8E2] text-[#0D0D0C] text-sm font-bold hover:bg-white transition-colors"
                        >
                            Visit project <ArrowUpRight size={14} />
                        </a>
                    </motion.div>
                )}

                {/* Next project */}
                <div className="border-t border-white/[0.06] pt-12">
                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-6">Next project</p>
                    <Link
                        href={`/project/${next.slug}`}
                        className="group flex items-center justify-between gap-4 hover:text-[#5B7CFA] transition-colors"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold transition-colors" translate="no">
                            {next.title}
                        </h2>
                        <ArrowUpRight
                            size={20}
                            className="text-[#3D3D38] group-hover:text-[#5B7CFA] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                        />
                    </Link>
                </div>
            </main>
        </div>
    );
}
