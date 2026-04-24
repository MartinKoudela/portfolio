"use client";

import { useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Copy, Check, Github, Linkedin, Instagram, Facebook, Coffee } from "lucide-react";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

const TypingText = dynamic(() => import("../components/TypingText"), { ssr: false });

const roleWords = ["Developer", "Creator", "Engineer", "Builder"];

export default function HomeClient() {
    const [emailCopied, setEmailCopied] = useState(false);

    const copyEmail = useCallback(() => {
        navigator.clipboard.writeText("mk@martinkoudela.com");
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    }, []);

    return (
        <div className="min-h-screen bg-[#0D0D0C] text-[#E8E8E2] selection:bg-[#5B7CFA]/20 selection:text-white">

            {/* ── Hero ── */}
            <section className="relative min-h-screen flex flex-col">
                <div className="flex-1 grid md:grid-cols-[1fr_260px] max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-16 gap-0">

                    {/* Left */}
                    <div className="flex flex-col justify-between md:pr-16 md:border-r border-white/[0.06]">
                        <div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#5B7CFA] uppercase mb-10"
                            >
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-black leading-[0.87] tracking-[-0.04em] text-[#E8E8E2]"
                                style={{ fontSize: "clamp(62px, 10vw, 148px)" }}
                            >
                                MARTIN<br />KOUDELA
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="mt-8 text-[#6B6B65] text-lg max-w-sm leading-relaxed"
                            >
                                Junior Full-stack{" "}
                                <TypingText words={roleWords} className="text-[#E8E8E2]" />
                                {" "}focused on software development and embedded systems.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-3 mt-14"
                        >
                            <a
                                href="#projects"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8E8E2] text-[#0D0D0C] text-sm font-bold hover:bg-white transition-colors"
                            >
                                View Projects <ArrowUpRight size={14} />
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-sm text-[#6B6B65] hover:text-[#E8E8E2] hover:border-white/20 transition-colors"
                            >
                                Contact
                            </a>
                        </motion.div>
                    </div>

                    {/* Right sidebar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:flex flex-col justify-between pl-12"
                    >
                        <div className="space-y-8 pt-2">
                            <div>
                                <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-2">Based in</p>
                                <p className="text-sm text-[#6B6B65]">Zlín, Czech Republic</p>
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-2">Focus</p>
                                <p className="text-sm text-[#6B6B65]">Full-stack development<br />+ Embedded systems</p>
                            </div>
                            <div>
                                <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-2">Status</p>
                                <p className="text-sm text-[#6B6B65]">Open to opportunities</p>
                            </div>
                        </div>

                        <Image
                            src="/me.png"
                            alt="Martin Koudela"
                            width={220}
                            height={280}
                            priority
                            draggable={false}
                            className="w-full grayscale hover:grayscale-0 transition-all duration-1000 mt-8"
                        />
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-8">
                    <div className="border-t border-white/[0.06] pt-5 flex items-center justify-between">
                        <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase">Portfolio 2026</p>
                        <motion.p
                            animate={{ opacity: [1, 0.35, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase"
                        >
                            Scroll ↓
                        </motion.p>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 md:px-12">

                {/* ── About ── */}
                <section id="about" className="py-24 border-t border-white/[0.06]">
                    <div className="grid md:grid-cols-[160px_1fr] gap-12 md:gap-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase pt-1"
                        >
                            01 — About
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid md:grid-cols-2 gap-12"
                        >
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                                    I build clean and<br />modern experiences.
                                </h2>
                                <p className="text-[#6B6B65] leading-relaxed">
                                    I'm a high school IT student focused on software development,
                                    working with modern frameworks and building{" "}
                                    <span className="text-[#E8E8E2]">clean</span>,{" "}
                                    <span className="text-[#E8E8E2]">reliable</span> applications, while
                                    also developing embedded and hardware-based systems with an
                                    emphasis on <span className="text-[#E8E8E2]">performance</span> and{" "}
                                    <span className="text-[#E8E8E2]">clarity</span>.
                                </p>
                            </div>

                            <div className="space-y-8 md:pt-1">
                                <div>
                                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-3">Philosophy</p>
                                    <p className="text-[#6B6B65] text-sm leading-relaxed">
                                        Minimalism in design, depth in performance. Every pixel should serve a purpose.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-3">Education</p>
                                    <p className="text-[#6B6B65] text-sm leading-relaxed">
                                        IT-focused high school student, continuously learning through real-world projects.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Projects ── */}
                <section id="projects" className="py-24 border-t border-white/[0.06]">
                    <div className="grid md:grid-cols-[160px_1fr] gap-12 md:gap-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase pt-1"
                        >
                            02 — Work
                        </motion.p>

                        <div>
                            {projects.map((project, index) => (
                                <ProjectRow key={project.slug} project={project} index={index} />
                            ))}
                            <div className="border-t border-white/[0.06]" />
                        </div>
                    </div>
                </section>

                {/* ── Skills ── */}
                <section id="skills" className="py-24 border-t border-white/[0.06]">
                    <div className="grid md:grid-cols-[160px_1fr] gap-12 md:gap-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase pt-1"
                        >
                            03 — Skills
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-2 md:grid-cols-3 gap-10"
                        >
                            {[
                                {
                                    label: "Languages",
                                    items: ["Python", "C / C++", "PHP", "JavaScript", "TypeScript"],
                                },
                                {
                                    label: "Frameworks",
                                    items: ["Laravel", "Next.js / React", "Three.js / WebGL", "FastAPI", "Tailwind CSS"],
                                },
                                {
                                    label: "Other",
                                    items: ["SQL Databases", "Embedded MCUs", "IoT", "Git", "REST APIs"],
                                },
                            ].map(({ label, items }) => (
                                <div key={label}>
                                    <p className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase mb-5">{label}</p>
                                    <ul className="space-y-2.5">
                                        {items.map((item) => (
                                            <li key={item} className="text-sm text-[#6B6B65]" translate="no">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── Contact ── */}
                <section id="contact" className="py-24 border-t border-white/[0.06]">
                    <div className="grid md:grid-cols-[160px_1fr] gap-12 md:gap-20">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-[10px] tracking-[0.3em] text-[#3D3D38] uppercase pt-1"
                        >
                            04 — Contact
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-[-0.02em] mb-8">
                                Let's build<br />something.
                            </h2>

                            <p className="text-[#6B6B65] mb-10 max-w-md leading-relaxed">
                                Currently available for new projects and collaborations.
                                Feel free to reach out for a chat.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-12">
                                <a
                                    href="mailto:mk@martinkoudela.com"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8E8E2] text-[#0D0D0C] text-sm font-bold hover:bg-white transition-colors"
                                >
                                    Send an email <ArrowUpRight size={14} />
                                </a>
                                <button
                                    onClick={copyEmail}
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 text-sm text-[#6B6B65] hover:text-[#E8E8E2] hover:border-white/20 transition-colors"
                                >
                                    {emailCopied ? (
                                        <><Check size={14} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                                    ) : (
                                        <><Copy size={14} /><span>Copy email</span></>
                                    )}
                                </button>
                            </div>

                            <div className="flex gap-2.5">
                                {[
                                    { icon: Github, href: "https://github.com/martinkoudela", label: "GitHub" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/martin-koudela-a5b645343/", label: "LinkedIn" },
                                    { icon: Instagram, href: "https://www.instagram.com/koudy_martin/", label: "Instagram" },
                                    { icon: Facebook, href: "https://www.facebook.com/koudela.martin.9?locale=cs_CZ", label: "Facebook" },
                                    { icon: Coffee, href: "https://buymeacoffee.com/martinkoudela", label: "Buy me a coffee" },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="h-10 w-10 flex items-center justify-center border border-white/10 text-[#6B6B65] hover:text-[#E8E8E2] hover:border-white/20 transition-colors"
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── Footer ── */}
                <footer className="py-8 border-t border-white/[0.06] flex items-center justify-between">
                    <p className="text-[10px] tracking-[0.2em] text-[#3D3D38] uppercase">
                        © {new Date().getFullYear()} Martin Koudela
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-[10px] tracking-[0.2em] text-[#3D3D38] uppercase hover:text-[#6B6B65] transition-colors"
                    >
                        Back to top ↑
                    </button>
                </footer>
            </main>
        </div>
    );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
    const [hovered, setHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 400, damping: 35 });
    const smoothY = useSpring(mouseY, { stiffness: 400, damping: 35 });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.055 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }}
        >
            <Link
                href={`/project/${project.slug}`}
                className="group flex items-start md:items-center justify-between gap-4 py-5 border-t border-white/[0.06] hover:border-[#5B7CFA]/20 transition-colors"
            >
                <div className="flex items-start md:items-center gap-5 flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-[#3D3D38] flex-shrink-0 mt-[3px] md:mt-0 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                        <h3
                            className="text-base font-bold text-[#E8E8E2] group-hover:text-[#5B7CFA] transition-colors"
                            translate="no"
                        >
                            {project.title}
                        </h3>
                        <p className="text-sm text-[#3D3D38] mt-0.5 line-clamp-1 group-hover:text-[#6B6B65] transition-colors">
                            {project.description}
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                    <div className="flex gap-4">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] tracking-wide text-[#3D3D38] group-hover:text-[#6B6B65] transition-colors"
                                translate="no"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <ArrowUpRight
                        size={14}
                        className="text-[#3D3D38] group-hover:text-[#5B7CFA] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </div>
            </Link>

            {project.image && (
                <motion.div
                    className="pointer-events-none fixed z-50 w-52 h-36 rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60"
                    style={{ left: smoothX, top: smoothY, x: 24, y: -72 }}
                    animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.94 }}
                    transition={{ duration: 0.15 }}
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale"
                    />
                </motion.div>
            )}
        </motion.div>
    );
}
