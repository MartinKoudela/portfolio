export const projects = [
    {
        slug: "football-photogallery",
        title: "Football Photogallery",
        description: "A bespoke football photogallery platform developed for a client, designed to showcase match photography in an elegant and organized way. The platform features a photographer-focused dashboard for easy photo uploads and management, a curated highlights section displaying the best shots, and a comprehensive match-based photo archive where visitors can browse galleries organized by individual games. Built with performance in mind, the site handles large image collections efficiently while maintaining a clean, modern user interface.",
        tags: ["Laravel", "MySQL", "Tailwind", "PHP", "Blade"],
        image: "/photogallery.png",
        url: "https://www.slavicinfotky.cz/"
    },
    {
        slug: "raspberry-pi-camera",
        title: "Raspberry Pi Camera",
        description: "A comprehensive Raspberry Pi 4 surveillance and computer vision system built from the ground up. The project integrates a Pi Camera Module 3 NoIR with a PIR motion sensor for intelligent monitoring. The system features real-time object detection powered by YOLOv8 AI model, capable of identifying humans, animals, and vehicles. It includes a modern web interface built with FastAPI and vanilla JavaScript, allowing users to view live streams, capture photos, record videos, and apply visual filters. Additional features include Telegram bot integration for instant notifications with snapshots, multiple color format support, and a responsive dashboard for complete camera control.",
        tags: ["Python", "FastAPI", "OpenCV", "YOLOv8", "Raspberry Pi 4", "WebSockets", "Tailwind"],
        image: "/rpi.jpg",
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

export type Project = typeof projects[number];
