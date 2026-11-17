
import { useEffect } from "react";
import {
    FiGithub,
    FiExternalLink,
    FiArrowUpRight
} from "react-icons/fi";

import { fetchProjects } from "../../features/projects/Projectslice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Reveal from "../../components/animations/Reveal";

const Projects = () => {
    const dispatch = useAppDispatch();

    const { items: projects, loading, error } = useAppSelector(
        (state) => state.projects
    );

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const publishedProjects = projects.filter(
        (project) => project.status === "Published"
    );

    return (
        <section
            id="projects"
            className="mx-auto max-w-7xl px-6 py-24"
        >
            {/* Section Heading */}
            <Reveal>
                <div className="mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                        My Work
                    </p>

                    <h2 className="font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
                        Featured Projects
                        <span className="text-blue-500">.</span>
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                        A selection of projects I've contributed to,
                        showcasing my experience in building practical,
                        scalable and user-focused applications.
                    </p>
                </div>
            </Reveal>

            {/* Loading */}
            {loading && (
                <div className="py-12 text-center text-gray-400">
                    Loading projects...
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                    <p className="mb-4 text-red-400">{error}</p>

                    <button
                        onClick={() => dispatch(fetchProjects())}
                        className="rounded-lg border border-white/10 px-5 py-2 text-sm text-gray-300 transition hover:border-blue-500 hover:text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && publishedProjects.length === 0 && (
                <div className="rounded-xl border border-white/10 bg-[#141821] py-12 text-center">
                    <p className="text-gray-400">
                        No published projects available yet.
                    </p>
                </div>
            )}

            {/* Project Cards */}
            {!loading && !error && publishedProjects.length > 0 && (
                <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                    {publishedProjects.map((project) => (
                        <Reveal key={project._id}>
                            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141821] transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">

                                {/* Project Image */}
                                <div className="relative aspect-video overflow-hidden bg-[#1c2230]">

                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={`${project.title} project preview`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <span className="font-['Space_Grotesk'] text-7xl font-bold text-blue-500/30">
                                                {project.title.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/70 via-transparent to-transparent opacity-70" />

                                    {project.featured && (
                                        <span className="absolute left-4 top-4 rounded-full border border-blue-400/30 bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                            Featured Project
                                        </span>
                                    )}

                                    <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Project Content */}
                                <div className="flex flex-1 flex-col p-6">

                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <h3 className="text-xl font-bold text-white transition group-hover:text-blue-400">
                                            {project.title}
                                        </h3>

                                        <FiArrowUpRight
                                            size={20}
                                            className="shrink-0 text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-400"
                                        />
                                    </div>

                                    <p className="text-sm leading-7 text-gray-400">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-lg border border-white/10 bg-[#0b0d12] px-3 py-1.5 text-xs text-gray-300 transition hover:border-blue-500/40 hover:text-white"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Project Links */}
                                    <div className="mt-auto flex flex-wrap items-center gap-5 border-t border-white/10 pt-5 mt-7">

                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View ${project.title} on GitHub`}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-blue-400"
                                            >
                                                <FiGithub size={17} />
                                                GitHub
                                            </a>
                                        )}

                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`View live demo of ${project.title}`}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-blue-400"
                                            >
                                                <FiExternalLink size={17} />
                                                Live Demo
                                            </a>
                                        )}

                                        {!project.githubUrl && !project.liveUrl && (
                                            <span className="text-xs text-gray-500">
                                                Project details available on request
                                            </span>
                                        )}

                                    </div>
                                </div>
                            </article>
                        </Reveal>
                    ))}

                </div>
            )}
        </section>
    );
};

export default Projects;
