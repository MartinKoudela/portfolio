"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectPage() {
    const params = useParams();
    const project = projects.find(p => p.slug === params.slug);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project not found</h1>
                    <Link href="/#projects" className="text-[#5B7CFA] hover:underline">
                        ← Back to projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#5B7CFA]/30">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(#5B7CFA 0.5px, transparent 0.5px), radial-gradient(#5B7CFA 0.5px, #050505 0.5px)`,
                        backgroundSize: "40px 40px",
                        backgroundPosition: "0 0, 20px 20px",
                    }}
                />

                {/* Glows */}
                <div
                    className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#5B7CFA]/15 blur-[120px] animate-pulse"
                    style={{ animationDuration: "8s" }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#5B7CFA]/10 blur-[100px] animate-pulse"
                    style={{ animationDuration: "12s" }}
                />
            </div>

            {/* Content */}
            <main className="relative z-10 mx-auto max-w-4xl px-6 py-12">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Back to projects
                    </Link>
                </motion.div>

                {/* Project Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B7CFA] mb-4">
                        Project
                    </h2>
                    <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        {project.title}
                    </h1>
                </motion.div>

                {/* Project Image */}
                {project.image && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative mb-12 rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>
                )}

                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {project.tags.map(tag => (
                        <span
                            key={tag}
                            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-zinc-400 font-bold px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#5B7CFA]/30 hover:text-[#5B7CFA] transition-all"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5B7CFA]/40" />
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Description Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 md:p-10 mb-10 backdrop-blur-sm"
                >
                    <div className="absolute -top-20 -right-20 h-40 w-40 bg-[#5B7CFA]/10 blur-[60px] rounded-full" />

                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B7CFA] mb-6">
                        About this project
                    </h3>
                    <p className="text-lg leading-relaxed text-zinc-400">
                        {project.description}
                    </p>
                </motion.div>

                {/* External Link */}
                {project.url && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-zinc-200"
                        >
                            <span>Visit project</span>
                            <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
