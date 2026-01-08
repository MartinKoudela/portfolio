# Martin Koudela | Portfolio

A modern, performant personal portfolio website built with Next.js 16 and React 19, featuring 3D particle effects, smooth animations, and a responsive design.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)

## Features

- **3D Particle System** - Interactive particle background using React Three Fiber with mouse-following gravity effects
- **Smooth Animations** - Page transitions and micro-interactions powered by Framer Motion
- **Project Carousel** - Draggable/swipeable showcase of featured projects
- **Responsive Design** - Fully optimized for all screen sizes
- **Dark Theme** - Modern dark aesthetic with accent colors
- **Performance Optimized** - Device-aware rendering, lazy loading, and image optimization
- **SEO Ready** - OpenGraph, Twitter cards, structured data, and dynamic sitemap
- **Accessibility** - ARIA labels, keyboard navigation, and respects `prefers-reduced-motion`

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| 3D Graphics | Three.js, React Three Fiber |
| Animation | Framer Motion |
| Icons | Lucide React |
| Analytics | Vercel Analytics, Speed Insights |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main entry point
│   ├── layout.tsx        # Root layout with metadata
│   ├── HomeClient.tsx    # Main client component with all sections
│   ├── globals.css       # Tailwind CSS + custom theme
│   ├── robots.ts         # SEO robots configuration
│   └── sitemap.ts        # Dynamic sitemap generation
├── components/
│   ├── Antigravity.jsx   # 3D particle system
│   ├── ProjectCarousel.jsx # Draggable project slider
│   ├── Navbar.tsx        # Navigation component
│   ├── TypingText.tsx    # Typing animation
│   └── ScrollProgress.tsx # Scroll progress bar
├── lib/
│   ├── utils.ts          # Utility functions
│   └── deviceUtils.ts    # Device capability detection
└── public/               # Static assets
```

## Sections

- **Hero** - Animated intro with typing effect and 3D particle background
- **About** - Personal introduction and philosophy
- **Skills** - Technology grid with icons
- **Projects** - Horizontal draggable carousel showcasing work
- **Contact** - Email CTA with social media links

## Configuration

Key configuration files:

- `next.config.ts` - Next.js settings, image optimization
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration
- `postcss.config.mjs` - PostCSS with Tailwind

## Performance

- Dynamic imports for heavy components
- Image optimization with AVIF/WebP formats
- Device-aware particle count adjustment
- Console removal in production builds
- Optimized bundle splitting

## Author

**Martin Koudela** - Junior Full-stack Developer

- Website: [martinkoudela.com](https://martinkoudela.com)
- GitHub: [@MartinKoudela](https://github.com/MartinKoudela)
- LinkedIn: [Martin Koudela](https://www.linkedin.com/in/martin-koudela-a5b645343/)

---

Built with Next.js and deployed on Vercel.
