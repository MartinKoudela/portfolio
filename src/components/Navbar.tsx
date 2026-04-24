"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);

            const sections = navItems.map((item) => item.href.slice(1));
            for (const section of [...sections].reverse()) {
                const el = document.getElementById(section);
                if (el && el.getBoundingClientRect().top <= 120) {
                    setActiveSection(section);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "border-b border-white/[0.06] bg-[#0D0D0C]/90 backdrop-blur-xl"
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-sm font-bold tracking-[0.12em] text-[#E8E8E2] uppercase hover:text-[#5B7CFA] transition-colors"
                    >
                        Martin Koudela
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                className={`text-[11px] tracking-[0.2em] uppercase transition-colors ${
                                    activeSection === item.href.slice(1)
                                        ? "text-[#E8E8E2]"
                                        : "text-[#6B6B65] hover:text-[#E8E8E2]"
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-[#6B6B65] hover:text-[#E8E8E2] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-[#0D0D0C]/96 backdrop-blur-xl md:hidden flex flex-col items-start justify-center px-8"
                    >
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href)}
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ delay: 0.05 + i * 0.05 }}
                                className={`text-4xl font-bold py-3 transition-colors ${
                                    activeSection === item.href.slice(1)
                                        ? "text-[#5B7CFA]"
                                        : "text-[#E8E8E2] hover:text-[#5B7CFA]"
                                }`}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
