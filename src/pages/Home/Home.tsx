
import { useEffect } from "react";
import { FiArrowDownRight, FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import About from "../About/About";
import Skills from "../Skills/Skills";
import Experience from "../Experience/Experience";
import { motion } from "framer-motion";



import { fetchProjects } from "../../features/projects/Projectslice";
import { useAppDispatch } from "../../app/hook";
import Projects from "../Projects/Project";
import Contact from "../Contact/Contact";

function Home() {
    const dispatch = useAppDispatch();

    // const { items: projects, loading, error } = useAppSelector(
    //     (state) => state.projects
    // );

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    return (
        <main className="mx-auto max-w-7xl px-6">

            
<motion.section
    id="home"
    className="grid min-h-[calc(100vh-80px)] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
>
    {/* Left Content */}
    <div>
        {/* Availability */}
        <div className="mb-8 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]" />
            <span className="text-sm tracking-wide text-gray-400">
                Full Stack Developer | Open to Opportunities
            </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl font-['Space_Grotesk'] text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Building
            <br />
            scalable
            <br />
            <span className="text-blue-500">
                digital experiences.
            </span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            I'm a Software Developer with 4+ years of experience
            building modern web applications using React,NextJs , TypeScript,Javascript,
            Node.js . I enjoy creating intuitive user
            experiences and developing reliable backend solutions
            that solve real-world problems.
        </p>

        {/* Experience Highlights */}
        <div className="mt-8 flex flex-wrap gap-8">
            <div>
                <h3 className="text-3xl font-bold text-white">4+</h3>
                <p className="mt-1 text-sm text-gray-500">Years Experience</p>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-white">Full Stack</h3>
                <p className="mt-1 text-sm text-gray-500">Development Focus</p>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-white">React</h3>
                <p className="mt-1 text-sm text-gray-500">Core Expertise</p>
            </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
                View Projects
                <FiArrowDownRight />
            </a>

            <a
                href="#contact"
                className="rounded-lg border border-white/15 px-6 py-3 font-medium text-gray-300 transition hover:border-blue-500 hover:text-white"
            >
                Contact Me
            </a>

         <a
    href="/Aniket_Patil_CV.pdf"
    download="Aniket_Patil_CV.pdf"
    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-blue-500 hover:bg-blue-500/10"
>
    <FiDownload />
    Download Resume
</a>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex items-center gap-6 text-gray-400">
            <a
                href="https://github.com/AniketPatil17122000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition hover:text-blue-400"
            >
                <FiGithub size={22} />
            </a>

            <a
                href="https://www.linkedin.com/in/aniket-patil-1087421aa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-blue-400"
            >
                <FiLinkedin size={22} />
            </a>
        </div>

        {/* Projects API Status */}
        {/* <div className="mt-10 border-t border-white/10 pt-6">
            {loading && (
                <p className="text-sm text-gray-400">
                    Loading projects...
                </p>
            )}

            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}

            {!loading && !error && (
                <p className="text-sm text-gray-400">
                    Currently showcasing{" "}
                    <span className="font-semibold text-white">
                        {projects.length} projects
                    </span>
                </p>
            )}
        </div> */}
    </div>

    {/* Right Profile Card */}
    <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mx-auto w-full max-w-md animate-[float_5s_ease-in-out_infinite]"
    >
        <div className="absolute -inset-4 rounded-3xl bg-blue-600/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141821] p-6 shadow-2xl shadow-blue-950/30">

            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 font-['Space_Grotesk'] text-2xl font-bold text-white">
                    AP
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white">
                        Aniket Patil
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                        Full Stack Developer
                    </p>
                    <span className="mt-2 inline-flex items-center gap-2 text-xs text-green-400">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Available for opportunities
                    </span>
                </div>
            </div>

            {/* Code Window */}
            <div className="mt-6 rounded-xl border border-white/10 bg-[#0b0d12] p-5">
                <div className="mb-5 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-gray-500">
                        developer.ts
                    </span>
                </div>

                <div className="space-y-3 font-mono text-sm">
                    <p className="text-purple-400">const developer = {"{"}</p>
                    <p className="pl-5 text-gray-400">
                        name: <span className="text-green-400">"Aniket"</span>,
                    </p>
                    <p className="pl-5 text-gray-400">
                        role: <span className="text-green-400">"Full Stack Developer"</span>,
                    </p>
                    <p className="pl-5 text-gray-400">
                        experience: <span className="text-orange-400">"4+ years"</span>,
                    </p>
                    <p className="pl-5 text-gray-400">
                        passion: <span className="text-green-400">"Building solutions"</span>
                    </p>
                    <p className="text-purple-400">{"}"}</p>
                </div>
            </div>

            {/* Technologies */}
            <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Technologies I work with
                </p>

                <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"].map((tech) => (
                        <span
                            key={tech}
                            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-gray-300 transition hover:border-blue-500/50 hover:text-blue-400"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-gray-400">
                Turning ideas into reliable digital products.
            </div>
        </div>
    </motion.div>
</motion.section>

            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
        </main>
    );
}

export default Home;
