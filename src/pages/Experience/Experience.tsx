
import { useEffect } from "react";
import {
    FiBriefcase,
    FiMapPin,
    FiCalendar,
    FiArrowUpRight
} from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchExperiences } from "../../features/experience/ExperienceSlice";
import Reveal from "../../components/animations/Reveal";

const Experience = () => {
    const dispatch = useAppDispatch();

    const { items: experiences, loading, error } = useAppSelector(
        (state) => state.experience
    );

    useEffect(() => {
        dispatch(fetchExperiences());
    }, [dispatch]);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });

    return (
        <section
            id="experience"
            className="mx-auto max-w-7xl px-6 py-24"
        >
            {/* Section Heading */}
            <Reveal>
                <div className="mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                        My Journey
                    </p>

                    <h2 className="font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
                        Work Experience
                        <span className="text-blue-500">.</span>
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                        My professional journey, the teams I've worked
                        with and the applications I've contributed to.
                    </p>
                </div>
            </Reveal>

            {/* Loading */}
            {loading && (
                <div className="py-12 text-center text-gray-400">
                    Loading experience...
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                    <p className="mb-4 text-red-400">{error}</p>

                    <button
                        onClick={() => dispatch(fetchExperiences())}
                        className="rounded-lg border border-white/10 px-5 py-2 text-sm text-gray-300 transition hover:border-blue-500 hover:text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && experiences.length === 0 && (
                <div className="rounded-xl border border-white/10 bg-[#141821] py-12 text-center">
                    <p className="text-gray-400">
                        Professional experience will be updated soon.
                    </p>
                </div>
            )}

            {/* Experience Timeline */}
            {!loading && !error && experiences.length > 0 && (
                <div className="relative ml-3 border-l border-white/10 pl-8 sm:ml-5 sm:pl-12">

                    {experiences.map((item, index) => (
                        <Reveal key={index}>
                            <div className="relative mb-10 last:mb-0">

                                {/* Timeline Icon */}
                                <div className="absolute -left-[53px] top-0 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-[#141821] text-blue-500 shadow-lg shadow-blue-950/20 sm:-left-[65px]">
                                    <FiBriefcase size={19} />
                                </div>

                                {/* Experience Card */}
                                <div className="group rounded-2xl border border-white/10 bg-[#141821] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 sm:p-8">

                                    {/* Header */}
                                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                                        <div>
                                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                                                    {item.employmentType}
                                                </span>

                                                {item.currentlyWorking && (
                                                    <span className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                                                        Currently Working
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-xl font-bold text-white transition group-hover:text-blue-400 sm:text-2xl">
                                                {item.role}
                                            </h3>

                                            <p className="mt-2 text-base font-medium text-blue-400">
                                                {item.company}
                                            </p>
                                        </div>

                                        <FiArrowUpRight
                                            size={20}
                                            className="hidden text-gray-600 transition group-hover:text-blue-400 sm:block"
                                        />
                                    </div>

                                    {/* Employment Details */}
                                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 pb-5 text-sm text-gray-400">

                                        <span className="flex items-center gap-2">
                                            <FiCalendar className="text-blue-500" />

                                            {formatDate(item.startDate)} –{" "}
                                            {item.currentlyWorking
                                                ? "Present"
                                                : item.endDate
                                                    ? formatDate(item.endDate)
                                                    : "Not specified"}
                                        </span>

                                        {item.location && (
                                            <span className="flex items-center gap-2">
                                                <FiMapPin className="text-blue-500" />
                                                {item.location}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="mt-5 whitespace-pre-line text-sm leading-8 text-gray-400">
                                        {item.description}
                                    </p>

                                    {/* Technologies */}
                                    {item.technologies.length > 0 && (
                                        <div className="mt-6">
                                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Technologies & Tools
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {item.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-lg border border-white/10 bg-[#0b0d12] px-3 py-2 text-xs text-gray-300 transition hover:border-blue-500/40 hover:text-white"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </Reveal>
                    ))}

                </div>
            )}
        </section>
    );
};

export default Experience;
