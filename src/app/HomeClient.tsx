"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Code2,
    Cpu,
    Wifi,
    Braces,
    Database,
    GitBranch,
    Layers,
    Instagram,
    Facebook,
    Linkedin,
    Github,
    Coffee,
    Heart,
    ChevronsRight,
    ArrowRight,
    ChevronDown,
    ArrowUp,
    Copy,
    Check,
    Clock,
} from "lucide-react";

const Antigravity = dynamic(() => import("../components/Antigravity"), {
    ssr: false,
});

const ProjectCarousel = dynamic(() => import("../components/ProjectCarousel"), {
    ssr: false,
});

const ScrollProgress = dynamic(() => import("../components/ScrollProgress"), {
    ssr: false,
});

const CustomCursor = dynamic(() => import("../components/CustomCursor"), {
    ssr: false,
});

const TypingText = dynamic(() => import("../components/TypingText"), {
    ssr: false,
});

// Typing animation words
const roleWords = ["Developer", "Creator", "Engineer", "Builder"];

export default function HomeClient() {
    const [showParticles, setShowParticles] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    useEffect(() => {
        if ("requestIdleCallback" in window) {
            const id = requestIdleCallback(() => setShowParticles(true));
            return () => cancelIdleCallback(id);
        } else {
            const t = setTimeout(() => setShowParticles(true), 1200);
            return () => clearTimeout(t);
        }
    }, []);

    const copyEmail = useCallback(() => {
        navigator.clipboard.writeText("koudela.m@icloud.com");
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#5B7CFA]/30">
            {/* Custom Cursor */}
            <CustomCursor />

            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Global Background Accents */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* The Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(#5B7CFA 0.5px, transparent 0.5px), radial-gradient(#5B7CFA 0.5px, #050505 0.5px)`,
                        backgroundSize: "40px 40px",
                        backgroundPosition: "0 0, 20px 20px",
                    }}
                />

                {/* Large Moving Glows */}
                <div
                    className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#5B7CFA]/15 blur-[120px] animate-pulse"
                    style={{ animationDuration: "8s" }}
                />

                <div
                    className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#5B7CFA]/6 blur-[100px] animate-pulse"
                    style={{ animationDuration: "12s" }}
                />

                {/* Static glow for visual balance */}
                <div className="absolute bottom-[10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[100px]" />
            </div>

            {/* HERO SECTION */}
            <section className="relative flex min-h-screen items-center overflow-hidden z-10">
                {/* Hero-specific background with Antigravity particles */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="relative h-full w-full pointer-events-none opacity-40">
                        <Antigravity
                            count={220}
                            magnetRadius={10}
                            ringRadius={7}
                            waveSpeed={0.4}
                            waveAmplitude={0.6}
                            particleSize={1.3}
                            lerpSpeed={0.05}
                            color="#5B7CFA"
                            autoAnimate={true}
                            particleVariance={1}
                        />
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-20 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#5B7CFA]/30 bg-[#5B7CFA]/10 px-4 py-2 text-sm text-[#5B7CFA]"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B7CFA] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B7CFA]" />
                            </span>
                            Available for work
                        </motion.div>

                        <div>
                            <h1 className="text-6xl font-bold tracking-tight sm:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                                Martin Koudela
                            </h1>
                            <p className="mt-8 max-w-xl text-xl text-zinc-400 leading-relaxed">
                                <span translate="no">Junior</span>{" "}
                                <span className="text-white">
                                    Full-stack <TypingText words={roleWords} className="text-[#5B7CFA]" />
                                </span>{" "}
                                focused on software development and embedded systems.
                            </p>
                        </div>

                        {/* Primary Call to Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="group relative rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-zinc-200"
                            >
                                <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center gap-2">
                                    View projects
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </span>
                            </a>

                            <a
                                href="#contact"
                                className="group relative rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold transition-all hover:border-white/20 hover:bg-white/10 backdrop-blur-sm"
                            >
                                <div className="absolute inset-0 rounded-full bg-[#5B7CFA]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative">Contact me</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Profile Image - ORIGINAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center md:justify-end relative"
                    >
                        {/* Soft glow behind the image */}
                        <div className="absolute inset-0 bg-[#5B7CFA]/20 blur-[100px] rounded-full scale-75 animate-pulse" />
                        <Image
                            src="/me.png"
                            alt="Martin Koudela"
                            draggable="false"
                            width={320}
                            height={420}
                            priority
                            className="w-80 sm:w-88 drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 rounded-[32px] object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="relative z-30 mx-auto max-w-6xl px-6">
                {/* ABOUT SECTION */}
                <motion.section
                    id="about"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="relative py-32"
                >
                    <div className="absolute -left-20 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-[#5B7CFA]/5 blur-[80px]" />

                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B7CFA]">
                                About me
                            </h2>
                        </div>

                        <h3 className="text-4xl font-bold leading-tight sm:text-6xl text-white">
                            I build clean and <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B7CFA] to-blue-400">
                                modern experiences.
                            </span>
                        </h3>

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <p className="text-xl leading-relaxed text-zinc-400">
                                I'm a high school IT student focused on software development,
                                working with modern frameworks and building{" "}
                                <span className="text-white">clean</span>,{" "}
                                <span className="text-white">reliable</span> applications, while
                                also developing embedded and hardware-based systems with an
                                emphasis on <span className="text-white">performance</span> and{" "}
                                <span className="text-white">clarity</span>.
                            </p>

                            {/* Detailed Info Blocks */}
                            <div className="space-y-6 border-l border-white/5 pl-8">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Philosophy</h4>
                                    <p className="text-zinc-500 text-sm">
                                        Minimalism in design, depth in performance. Every pixel
                                        should serve a purpose.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Education</h4>
                                    <p className="text-zinc-500 text-sm">
                                        IT-focused high school student, continuously learning
                                        through real-world projects.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SKILLS SECTION - ORIGINAL */}
                <section id="skills" className="py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-16"
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B7CFA]">
                            Skills
                        </h2>
                    </motion.div>

                    {/* Technology Grid - ORIGINAL with Lucide icons */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {[
                            { name: "PYTHON", icon: Code2 },
                            { name: "C / C++", icon: Code2 },
                            { name: "PHP / LARAVEL", icon: Braces },
                            { name: "JS / TS", icon: Braces },
                            { name: "REACT", icon: Layers },
                            { name: "NEXT.JS", icon: Layers },
                            { name: "SQL DBs", icon: Database },
                            { name: "TAILWIND css", icon: Layers },
                            { name: "BOOTSTRAP css", icon: Layers },
                            { name: "EMBEDDED (MCUs)", icon: Cpu },
                            { name: "IoT", icon: Wifi },
                            { name: "GIT", icon: GitBranch },
                        ].map(({ name, icon: Icon }, index) => (
                            <motion.div
                                key={name}
                                initial={{ scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent aspect-square transition-all duration-500 hover:border-[#5B7CFA]/30 hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(91,124,250,0.1)]"
                            >
                                <div
                                    className="relative rounded-full bg-white/5 p-3 transition-colors group-hover:bg-[#5B7CFA]/10"
                                    role="img"
                                    aria-label={name}
                                >
                                    <Icon
                                        size={24}
                                        strokeWidth={1.5}
                                        className="text-[#5B7CFA] transition-transform group-hover:scale-110"
                                        aria-hidden="true"
                                    />
                                </div>
                                <span
                                    className="text-xs font-bold tracking-wider text-zinc-500 group-hover:text-white transition-colors"
                                    translate="no"
                                >
                                    {name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <motion.section
                    id="projects"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="py-32 overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-2">
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B7CFA]">
                                Selected Projects
                            </h2>
                        </div>

                        {/* Interaction hint for desktop */}
                        <div className="mt-8 md:mt-0 flex items-center gap-3 text-zinc-500">
                            <div className="h-[1px] w-8 bg-zinc-800" />
                            <p className="text-xs uppercase tracking-widest font-medium">
                                Drag to explore
                            </p>
                            <ChevronsRight size={25} className="text-zinc-500" />
                        </div>
                    </div>

                    <ProjectCarousel />
                </motion.section>

                {/* CONTACT SECTION */}
                <motion.section
                    id="contact"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="py-32 relative"
                >
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-[#5B7CFA]/10 blur-[120px] rounded-full -z-10 animate-pulse" />

                    <div className="relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:p-16 text-center overflow-hidden backdrop-blur-sm">
                        {/* Decorative glows */}
                        <div
                            className="absolute -top-24 -right-24 h-64 w-64 bg-blue-500/10 blur-[80px] rounded-full animate-pulse"
                            style={{ animationDuration: "8s" }}
                        />
                        <div
                            className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-500/10 blur-[80px] rounded-full animate-pulse"
                            style={{ animationDuration: "10s" }}
                        />

                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5B7CFA]">
                            Get in touch
                        </h2>

                        <h3 className="mt-8 text-4xl font-bold sm:text-6xl">
                            Let's build something <br />
                            <span className="text-zinc-500">extraordinary.</span>
                        </h3>

                        <p className="mx-auto mt-8 max-w-lg text-lg text-zinc-400 leading-relaxed">
                            Currently available for new projects and collaborations. Feel free
                            to reach out for a chat.
                        </p>

                        {/* Response time indicator */}
                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-zinc-500">
                            <Clock size={14} />
                            <span>Usually responds within 24 hours</span>
                        </div>

                        <div className="mt-12 flex flex-col items-center gap-6">
                            {/* Email buttons */}
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="mailto:koudela.m@icloud.com"
                                    className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-black transition-all hover:scale-105 hover:bg-zinc-200"
                                >
                                    Send an email
                                    <ArrowRight size={20} />
                                </a>

                                <button
                                    onClick={copyEmail}
                                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-5 text-lg font-medium transition-all hover:border-white/20 hover:bg-white/10"
                                >
                                    {emailCopied ? (
                                        <>
                                            <Check size={20} className="text-emerald-400" />
                                            <span className="text-emerald-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={20} />
                                            <span>Copy email</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Social Media Links */}
                            <div className="flex gap-4 mt-4">
                                {[
                                    {
                                        icon: Github,
                                        href: "https://github.com/martinkoudela",
                                        label: "GitHub",
                                        hoverColor: "hover:text-white hover:border-white/30",
                                    },
                                    {
                                        icon: Linkedin,
                                        href: "https://www.linkedin.com/in/martin-koudela-a5b645343/",
                                        label: "LinkedIn",
                                        hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
                                    },
                                    {
                                        icon: Instagram,
                                        href: "https://www.instagram.com/koudy_martin/",
                                        label: "Instagram",
                                        hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/30",
                                    },
                                    {
                                        icon: Facebook,
                                        href: "https://www.facebook.com/koudela.martin.9?locale=cs_CZ",
                                        label: "Facebook",
                                        hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/30",
                                    },
                                    {
                                        icon: Coffee,
                                        href: "https://buymeacoffee.com/martinkoudela",
                                        label: "Buy me a coffee",
                                        hoverColor: "hover:text-[#FFDD00] hover:border-[#FFDD00]/30",
                                    },
                                ].map(({ icon: Icon, href, label, hoverColor }) => (
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className={`group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all ${hoverColor}`}
                                    >
                                        <div className="absolute inset-0 rounded-full bg-current/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Icon
                                            size={22}
                                            className="relative text-zinc-400 transition-colors group-hover:text-current"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* FOOTER */}
                <footer className="py-12 border-t border-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Left side */}
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>© {new Date().getFullYear()} Martin Koudela</span>
                            <Heart size={14} className="text-red-500 animate-pulse" />
                        </div>

                        {/* Back to top */}
                        <button
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
                        >
                            <span>Back to top</span>
                            <ArrowUp
                                size={16}
                                className="transition-transform group-hover:-translate-y-1"
                            />
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
