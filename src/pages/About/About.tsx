
import {
    FiCode,
    FiServer,
    FiDatabase,
    FiLayers,
    FiGitBranch,
    FiMonitor
} from "react-icons/fi";
import Reveal from "../../components/animations/Reveal";

const About = () => {
    const highlights = [
        {
            icon: <FiCode size={22} />,
            title: "Frontend Development",
            description:
                "Creating responsive, accessible and interactive user interfaces using React, NextJs, TypeScript  , Javascript and modern UI frameworks."
        },
        {
            icon: <FiServer size={22} />,
            title: "Backend Development",
            description:
                "Building RESTful APIs, implementing business logic and developing server-side applications with Node.js and Express."
        },
        {
            icon: <FiDatabase size={22} />,
            title: "Database Management",
            description:
                "Working with MongoDB and MySQL to manage application data and build reliable data-driven solutions."
        },
        {
            icon: <FiLayers size={22} />,
            title: "Enterprise Applications",
            description:
                "Contributing to enterprise solutions involving order management, HR workflows, integrations and complex business processes."
        },
        {
            icon: <FiGitBranch size={22} />,
            title: "API Integration",
            description:
                "Integrating REST and SOAP APIs to connect services, handle data exchange and deliver seamless application workflows."
        },
        {
            icon: <FiMonitor size={22} />,
            title: "Problem Solving",
            description:
                "Understanding business requirements, improving existing applications and writing clean, maintainable code."
        }
    ];

    const technologies = [
        "React",
        "JavaScript",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "MySQL",
        "Tailwind CSS",
        "REST APIs",
        "Docker",
        "Dev-Ops",
        "Kubernetes"
    ];

    return (
        <section id="about" className="mx-auto max-w-7xl px-6 py-24">

            {/* Section Heading */}
            <Reveal>
                <div className="mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                        Get to know me
                    </p>

                    <h2 className="font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
                        About Me<span className="text-blue-500">.</span>
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                        A little about my experience, technical background
                        and the way I approach software development.
                    </p>
                </div>
            </Reveal>

            <Reveal>
                <div className="grid items-start gap-12 lg:grid-cols-2">

                    {/* About Content */}
                    <div>
                        <h3 className="mb-6 text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                            Turning ideas into reliable digital solutions.
                        </h3>

                        <p className="mb-5 leading-8 text-gray-400">
                            I'm a Full Stack Developer with 4+ years of
                            experience building and enhancing modern web
                            applications. My strongest expertise is in
                            frontend development with React, JavaScript
                            and TypeScript, complemented by hands-on
                            experience in Node.js and backend development.
                        </p>

                        <p className="mb-5 leading-8 text-gray-400">
                            I've contributed to enterprise applications
                            involving sales and order management, HR
                            workflows, API integrations and
                            metadata-driven interfaces. My experience
                            includes developing user-facing features,
                            integrating backend services and improving
                            existing application workflows.
                        </p>

                        <p className="leading-8 text-gray-400">
                            I enjoy solving practical engineering
                            challenges, learning new technologies and
                            building applications that are maintainable,
                            scalable and useful to their users.
                        </p>

                        {/* Technologies */}
                        <div className="mt-9">
                            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                                Technologies I work with
                            </h4>

                            <div className="flex flex-wrap gap-3">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-white/10 bg-[#141821] px-4 py-2 text-sm text-gray-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Highlight Cards */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {highlights.map((item, index) => (
                            <div
                                key={index}
                                className="group rounded-xl border border-white/10 bg-[#141821] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-[#181e2a]"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                                    {item.icon}
                                </div>

                                <h4 className="mb-3 font-semibold text-white">
                                    {item.title}
                                </h4>

                                <p className="text-sm leading-7 text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </Reveal>
        </section>
    );
};

export default About;
