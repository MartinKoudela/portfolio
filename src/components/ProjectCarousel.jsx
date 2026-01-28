"use client";
import React, {useRef, useState, useEffect} from "react";
import {motion, useMotionValue} from "framer-motion";
import Link from "next/link";
import {projects} from "@/data/projects";

/**
 * ProjectCarousel Component
 *
 * A horizontal, draggable slider for showcasing portfolio projects.
 * Uses Framer Motion for smooth dragging and transitions.
 */
export default function ProjectCarousel() {
    const containerRef = useRef(null);
    const [constraints, setConstraints] = useState({left: 0, right: 0});

    // Dynamically calculate drag constraints based on the total width of projects
    useEffect(() => {
        const updateConstraints = () => {
            if (containerRef.current && containerRef.current.parentElement) {
                const fullWidth = containerRef.current.scrollWidth;
                const parentWidth = containerRef.current.parentElement.offsetWidth;
                // The scrollable width is the difference between total content width and the visible container width
                const scrollableWidth = Math.max(0, fullWidth - parentWidth);
                setConstraints({left: -scrollableWidth, right: 0});
            }
        };

        updateConstraints();
        // Re-run after short delays to account for late layout shifts and image loading
        const timer = setTimeout(updateConstraints, 500);
        const timer2 = setTimeout(updateConstraints, 2000);

        window.addEventListener('resize', updateConstraints);
        return () => {
            window.removeEventListener('resize', updateConstraints);
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <div className="relative w-full">
            {/* Scroll area with edge fade mask */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}
            >
                <motion.div
                    ref={containerRef}
                    drag="x"
                    dragConstraints={constraints}
                    dragElastic={0.1}
                    dragMomentum={true}
                    dragTransition={{bounceStiffness: 300, bounceDamping: 30}}
                    style={{touchAction: 'pan-y'}}
                    className="flex w-max gap-6 cursor-grab active:cursor-grabbing px-6 py-4"
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index}/>
                    ))}
                </motion.div>
            </div>

            {/* Visual indicator for mobile users to suggest swipeability */}
            <div className="mt-6 flex justify-center gap-2 md:hidden">
                <div className="h-1 w-12 rounded-full bg-white/10"/>
                <div className="h-1 w-6 rounded-full bg-[#5B7CFA]/40"/>
            </div>
        </div>
    );
}

/**
 * ProjectCard Component
 *
 * Individual project tile featuring a spotlight effect on hover,
 * project metadata, and a preview image.
 */
function ProjectCard({project, index}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Updates local mouse position for the spotlight gradient
    function handleMouseMove(e) {
        if (e.buttons > 0) return; // Don't update spotlight while dragging to save performance
        const {currentTarget, clientX, clientY} = e;
        const {left, top} = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{scale: 1, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: index * 0.1}}
            onMouseMove={handleMouseMove}
            className="group relative h-[550px] w-[300px] flex-shrink-0 overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.02] p-1 transition-all duration-500 hover:border-[#5B7CFA]/30 hover:bg-white/[0.04] sm:w-[380px]"
        >
            {/*
          Spotlight effect
          A subtle radial gradient that follows the mouse when hovered.
      */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(91, 124, 250, 0.08), transparent 80%)`,
                }}
            />

            <div
                className="relative h-full overflow-hidden rounded-[28px] bg-[#0a0a0a] p-6 flex flex-col">
                {/* Project Image */}
                {project.image && (
                    <div className="relative h-44 w-full overflow-hidden rounded-2xl mb-6 bg-white/[0.03]">
                        <img
                            src={project.image}
                            alt={project.title}
                            draggable="false"
                            className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700
                 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                        />
                    </div>
                )}


                {/* Text Content */}
                <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#5B7CFA]"
                        translate="no">
                        {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-3">
                        {project.description}
                    </p>
                    <span>
                        <a href={project.url} target="_blank" rel="noreferrer"
                           className="text-[#5B7CFA] hover:underline" translate="no">
                        {project.url}
                        </a>
                    </span>
                    <br/>
                    <Link
                        href={`/project/${project.slug}`}
                        className="inline-block text-sm text-[#5B7CFA] hover:underline mt-2"
                    >
                        View details →
                    </Link>
                </div>

                {/* Tags / Technology Stack */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2" translate="no">
                        {project.tags.map(tag => (
                            <span
                                key={tag}
                                className="
                  flex items-center gap-1.5
                  text-[10px] uppercase tracking-wider text-zinc-400 font-bold
                  px-3 py-1.5
                  rounded-full
                  bg-white/[0.03]
                  border border-white/5
                  transition-all duration-300
                  group-hover:bg-[#5B7CFA]/5
                  group-hover:border-[#5B7CFA]/20
                  group-hover:text-[#5B7CFA]
                "
                            >
                {/* Status-style dot indicator */}
                                <span className="w-1 h-1 rounded-full bg-[#5B7CFA]/40 group-hover:bg-[#5B7CFA]"/>
                                {tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
