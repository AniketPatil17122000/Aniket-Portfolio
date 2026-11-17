
import { useEffect } from "react";
import {
    FiCode,
    FiServer,
    FiDatabase,
    FiLayers,
    FiTool
} from "react-icons/fi";

import { fetchSkills } from "../../features/skills/Skillsslice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Reveal from "../../components/animations/Reveal";

const Skills = () => {
    const dispatch = useAppDispatch();

    const { items: skills, loading, error } = useAppSelector(
        (state) => state.skills
    );

    useEffect(() => {
        dispatch(fetchSkills());
    }, [dispatch]);

    const categories = [...new Set(skills.map((skill) => skill.category))];

    const getCategoryIcon = (category: string) => {
        const value = category.toLowerCase();

        if (value.includes("frontend") || value.includes("front-end")) {
            return <FiCode size={22} />;
        }

        if (value.includes("backend") || value.includes("back-end")) {
            return <FiServer size={22} />;
        }

        if (value.includes("database")) {
            return <FiDatabase size={22} />;
        }

        if (value.includes("tool")) {
            return <FiTool size={22} />;
        }

        return <FiLayers size={22} />;
    };

    return (
        <section id="skills" className="mx-auto max-w-7xl px-6 py-24">

            {/* Section Heading */}
            <Reveal>
                <div className="mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                        My Expertise
                    </p>

                    <h2 className="font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
                        Skills & Technologies
                        <span className="text-blue-500">.</span>
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                        Technologies and tools I use to build modern,
                        scalable and reliable web applications.
                    </p>
                </div>
            </Reveal>

            {/* Loading */}
            {loading && (
                <div className="py-12 text-center text-gray-400">
                    Loading skills...
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                    <p className="mb-4 text-red-400">{error}</p>

                    <button
                        onClick={() => dispatch(fetchSkills())}
                        className="rounded-lg border border-white/10 px-5 py-2 text-sm text-gray-300 transition hover:border-blue-500 hover:text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Skills */}
            {!loading && !error && skills.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">

                    {categories.map((category, index) => (
                        <Reveal key={index}>
                            <div
                                className="group h-full rounded-xl border border-white/10 bg-[#141821] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40"
                            >
                                {/* Category Header */}
                                <div className="mb-7 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
                                        {getCategoryIcon(category)}
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {category}
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {skills.filter(
                                                (skill) => skill.category === category
                                            ).length}{" "}
                                            Technologies
                                        </p>
                                    </div>
                                </div>

                                {/* Technology Tags */}
                                <div className="flex flex-wrap gap-3">
                                    {skills
                                        .filter(
                                            (skill) => skill.category === category
                                        )
                                        .map((skill) => (
                                            <span
                                                key={skill._id}
                                                className="rounded-lg border border-white/10 bg-[#0b0d12] px-4 py-2.5 text-sm text-gray-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}

                </div>
            )}

            {/* Empty State */}
            {!loading && !error && skills.length === 0 && (
                <div className="rounded-xl border border-white/10 bg-[#141821] py-12 text-center">
                    <p className="text-gray-400">
                        Skills will be updated soon.
                    </p>
                </div>
            )}

        </section>
    );
};

export default Skills;
