import Antigravity from '../components/Antigravity';
import {
  Code2,
  Cpu,
  Wifi,
  Shield,
  Braces,
  Database,
  GitBranch,
  Layers,
} from "lucide-react";



export default function Home() {
  return (
      <div className="min-h-screen bg-black text-white dark:bg-black dark:text-zinc-50">
        <main className="mx-auto max-w-6xl px-6">


          {/* HERO */}
          <section className="relative flex min-h-screen items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="relative h-full w-full">
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

            {/* Content */}
            <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">

              {/* LEFT – TEXT */}
              <div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                  Martin Koudela
                </h1>

                <p className="mt-6 max-w-xl text-lg text-zinc-400">
                  Junior Full-stack developer focused on modern web experiences,
                  performance and clean design.
                </p>

                <div className="mt-10 flex gap-4">
                  <a
                      href="#projects"
                      className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
                  >
                    View projects
                  </a>

                  <a
                      href="#contact"
                      className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* RIGHT – IMAGE */}
              <div className="flex justify-center md:justify-end">
                <img
                    src="/me.png"
                    alt="Martin Koudela"
                    className="
          w-80
          sm:w-88
          shadow-lg
        "
                />
              </div>

            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="py-32">
            <div className="max-w-2xl">
              <h2 className="text-sm font-medium uppercase tracking-widest text-[#5B7CFA]">
                About
              </h2>

              <h3 className="mt-4 text-3xl font-semibold">
                I build clean and modern web interfaces.
              </h3>

              <p className="mt-6 text-lg leading-relaxed text-zinc-400">
                I’m a high school IT student with a strong focus on web development.
                I enjoy working with modern frameworks, designing clean UI,
                and building applications that are both performant and visually polished.
              </p>
            </div>
          </section>


          {/* SKILLS */}
          <section id="skills" className="py-32">
            <h2 className="text-sm font-medium uppercase tracking-widest text-[#5B7CFA]">
              Skills
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {[
                { name: "Python", icon: Code2 },
                { name: "C / C++", icon: Code2 },
                { name: "Embedded Systems", icon: Cpu },
                { name: "Microcontrollers", icon: Cpu },
                { name: "IoT Systems", icon: Wifi },
                { name: "PenTesting", icon: Shield },
                { name: "PHP / Laravel", icon: Braces },
                { name: "Next.js", icon: Layers },
                { name: "React", icon: Layers },
                { name: "Tailwind CSS", icon: Layers },
                { name: "MySQL / PostgreSQL", icon: Database },
                { name: "Git", icon: GitBranch },
              ].map(({ name, icon: Icon }) => (
                  <div
                      key={name}
                      className="
          flex items-center gap-3
          rounded-xl
          border border-white/10
          bg-white/5
          px-4 py-3
          text-sm
          text-zinc-300
          backdrop-blur
          transition
          hover:border-[#5B7CFA]/40
          hover:text-white
        "
                  >
                    <Icon
                        size={16}
                        strokeWidth={1.8}
                        className="text-[#5B7CFA]"
                    />
                    <span>{name}</span>
                  </div>
              ))}
            </div>
          </section>



          {/* PROJECTS */}
          <section id="projects" className="py-32">
            <h2 className="text-sm font-medium uppercase tracking-widest text-[#5B7CFA]">
              Projects
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-xl font-medium">
                  Portfolio Website
                </h3>

                <p className="mt-3 text-zinc-400">
                  One-page personal portfolio built with Next.js, Tailwind CSS
                  and modern animation techniques.
                </p>

                <p className="mt-4 text-sm text-[#5B7CFA]">
                  Next.js · Tailwind · Three.js
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-xl font-medium">
                  School Projects
                </h3>

                <p className="mt-3 text-zinc-400">
                  Collection of smaller web and backend projects created during
                  my IT studies.
                </p>

                <p className="mt-4 text-sm text-[#5B7CFA]">
                  PHP · SQL · JavaScript
                </p>
              </div>
            </div>
          </section>


          {/* CONTACT */}
          <section id="contact" className="py-32">
            <h2 className="text-sm font-medium uppercase tracking-widest text-[#5B7CFA]">
              Contact
            </h2>

            <p className="mt-6 text-lg text-zinc-400">
              Want to work together or just say hi?
            </p>

            <a
                href="mailto:martin@example.com"
                className="mt-6 inline-block text-lg font-medium text-white hover:text-[#5B7CFA] transition"
            >
              koudela.m@icloud.com
            </a>
          </section>


          {/* FOOTER */}
          <footer className="py-12 text-sm text-zinc-500">
            © {new Date().getFullYear()} Martin Koudela
          </footer>


        </main>
      </div>
  );
}
