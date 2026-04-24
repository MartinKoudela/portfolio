export const projects = [
    {
        slug: "laravix-cms",
        title: "Laravix CMS",
        description: "An open-source headless content management system built on Laravel, designed to give developers and agencies full control over multiple websites from a single unified admin panel. Laravix supports a flexible field system with 12+ content field types, dynamic theme switching, built-in SEO tools with automatic sitemap and robots.txt generation, and role-based user management per site. The platform features a modern admin interface powered by Filament and Livewire, complete with activity logging and full multi-tenant architecture. The core is free and open-source, with premium plugins planned for extended functionality.",
        tags: ["Laravel", "PHP", "Filament", "Livewire", "Tailwind", "MySQL"],
        image: "/laravix.png",
        github: "https://github.com/MartinKoudela/laravix-cms",
        url: "https://laravix.com"
    },
    {
        slug: "orbis-projects",
        title: "Orbis Projects",
        description: "A student project showcase platform built for ORBIS Zlín, designed to give students a professional stage to present their work. The platform features a unique theme system where students design and build their own custom Blade templates using Tailwind CSS, maintaining full creative control over how their projects are displayed. Administrators manage project data, taxonomies, and media through a modern Filament dashboard, while a REST API enables dynamic filtering and browsing. Built as a personal initiative during my studies — not a school assignment, but a real tool built to fill a real need.",
        tags: ["Laravel", "PHP", "Filament", "Tailwind", "REST API", "Blade"],
        image: "/orbis-projects.png",
        github: "https://github.com/MartinKoudela/orbis-projects",
        url: "https://orbis.cz"
    },
    {
        slug: "football-photogallery",
        title: "Football Photogallery",
        description: "A bespoke football photogallery platform developed for a client, designed to showcase match photography in an elegant and organized way. The platform features a photographer-focused dashboard for easy photo uploads and management, a curated highlights section displaying the best shots, and a comprehensive match-based photo archive where visitors can browse galleries organized by individual games. Built with performance in mind, the site handles large image collections efficiently while maintaining a clean, modern user interface.",
        tags: ["Laravel", "MySQL", "Tailwind", "PHP", "Blade"],
        image: "/photogallery.png",
        url: "https://www.slavicinfotky.cz/"
    },
    {
        slug: "https://github.com/MartinKoudela/rpi-cam",
        title: "Raspberry Pi Camera",
        description: "A comprehensive Raspberry Pi 4 surveillance and computer vision system built from the ground up. The project integrates a Pi Camera Module 3 NoIR with a PIR motion sensor for intelligent monitoring. The system features real-time object detection powered by YOLOv8 AI model, capable of identifying humans, animals, and vehicles. It includes a modern web interface built with FastAPI and vanilla JavaScript, allowing users to view live streams, capture photos, record videos, and apply visual filters. Additional features include Telegram bot integration for instant notifications with snapshots, multiple color format support, and a responsive dashboard for complete camera control.",
        tags: ["Python", "FastAPI", "OpenCV", "YOLOv8", "Raspberry Pi 4", "WebSockets", "Tailwind"],
        image: "/rpi.jpg",
        github: "https://github.com/MartinKoudela/laravix-cms",

    },
    {
        slug: "l0k1-game",
        title: "L0k1 Game",
        description: "An immersive browser-based 3D horror game set in a hacker's apartment, built with Three.js. Players navigate a detailed cyberpunk room filled with interactive objects — a laptop that opens a fully functional in-game OS with a terminal, file manager, and hacking tools. The game features a dynamic atmosphere with positional audio (distant gunshots, sirens, creaking floors), toggleable lighting, and enemy AI systems including creatures like the Strangler and Shade that stalk the player. The environment is richly decorated with 60+ GLTF models including servers, monitors, graffiti, and surveillance cameras, creating a tense and atmospheric experience.",
        tags: ["Three.js", "TypeScript", "Vite", "WebGL", "GLTF"],
        image: "/l0k1.png",
        github: "https://github.com/MartinKoudela/L0k1-game",

    },
    {
        slug: "trackee",
        title: "Trackee.",
        description: "A modern team collaboration and project management platform designed to streamline workflow and boost productivity. Users can create and join teams, set up projects with detailed task breakdowns, and track progress through intuitive kanban boards. The platform includes a shared calendar system for scheduling deadlines and meetings, customizable user profiles, and real-time collaboration features. Team members can assign tasks, set priorities, add comments, and receive notifications about updates. The clean, minimalist interface ensures users stay focused on what matters most - getting work done.",
        tags: ["Laravel", "Tailwind", "MySQL", "JavaScript", "Blade", "REST API"],
        image: "/trackee1.png",
    },
    {
        slug: "esp32-pentesting-tool",
        title: "Portable ESP32-S3 Pentesting & Research Tool",
        description: "A custom-designed handheld device for ethical hacking, wireless security research, and IoT experimentation. Built around the powerful ESP32-S3 microcontroller, this portable tool combines multiple wireless technologies in a compact, battery-powered form factor. Features include Wi-Fi scanning and analysis, Bluetooth Low Energy reconnaissance, Sub-GHz RF communication for 433/868/915 MHz bands, NFC/RFID reading and emulation, and infrared control capabilities. The device features a custom graphical user interface on a built-in display, modular design for easy expansion, and rechargeable battery with power management. Currently in active development with planned features including packet injection, deauthentication detection, and BadUSB functionality.",
        tags: ["C++", "ESP32-S3", "Embedded", "Cybersecurity", "IoT", "RF", "Hardware"],
    },
    {
        slug: "cafecheck",
        title: "Cafecheck",
        description: "A personal passion project for documenting and sharing experiences at local coffee shops in Zlín and surrounding areas. The website features subjective reviews covering atmosphere, coffee quality, food options, and overall vibe of each location. Each review includes personal photos capturing the unique character of the cafes, along with practical information like opening hours and location. Built as a non-public platform for personal use and sharing with friends who share the same appreciation for good coffee and cozy spaces.",
        tags: ["JavaScript", "Bootstrap", "EmailJS", "HTML", "CSS"],
        image: "/cafecheck1.png",
    },
    {
        slug: "filmio",
        title: "Filmio",
        description: "A school project that evolved into a fully functional film club web application. The platform allows movie enthusiasts to create accounts, join the club community, and participate in shared movie watching sessions. Members can browse the film catalog, vote on upcoming screenings, and discuss movies with other members. The admin dashboard provides complete control over the film database, user management, and scheduling of watch sessions. Features include user authentication with role-based access, a rating and review system, and a clean interface optimized for easy navigation.",
        tags: ["PHP", "MySQL", "Tailwind", "HTML", "Authentication"],
        image: "/filmio1.png",
    },
];

export type Project = typeof projects[number] & { github?: string };
