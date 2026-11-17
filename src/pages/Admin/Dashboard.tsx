
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiFolder,
    FiCode,
    FiBriefcase,
    FiMessageSquare,
    FiArrowRight,
    FiLogOut,
    FiRefreshCw
} from "react-icons/fi";


import { fetchProjects } from "../../features/projects/Projectslice";
import { fetchSkills } from "../../features/skills/Skillsslice";

import { logoutAdmin } from "../../services/authService";
import axiosInstance from "../../services/api/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchExperiences } from "../../features/experience/ExperienceSlice";
import type { Contact } from "../../types/contact.types";

const Dashboard = () => {
    const dispatch = useAppDispatch();

    const { items: projects } = useAppSelector((state) => state.projects);
    const { items: skills } = useAppSelector((state) => state.skills);
    const { items: experiences } = useAppSelector((state) => state.experience);
    const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
    const [newContactCount, setNewContactCount] = useState(0);
    const [contactsLoading, setContactsLoading] = useState(true);

    const [contactCount, setContactCount] = useState(0);
const fetchContactCount = async () => {
    try {
        setContactsLoading(true);

        const response = await axiosInstance.get("/contact");
        const contactData: Contact[] = response.data.data;

        setContactCount(contactData.length);

        setNewContactCount(
            contactData.filter((item) => item.status === "New").length
        );

        setRecentContacts(contactData.slice(0, 5));
    } catch (error) {
        console.error("Failed to fetch contacts", error);
    } finally {
        setContactsLoading(false);
    }
};

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchSkills());
        dispatch(fetchExperiences());


        fetchContactCount();
    }, [dispatch]);

    const handleLogout = () => {
        logoutAdmin();
        window.location.href = "/admin/login";
    };

    const stats = [
        {
            title: "Published Projects",
            count: projects.filter((project) => project.status === "Published").length,
            icon: <FiFolder size={24} />,
            color: "text-blue-400",
        },
        {
            title: "Total Skills",
            count: skills.length,
            icon: <FiCode size={24} />,
            color: "text-purple-400",
        },
        {
            title: "Work Experiences",
            count: experiences.length,
            icon: <FiBriefcase size={24} />,
            color: "text-green-400",
        },
        {
            title: "Contact Messages",
            count: contactsLoading ? "..." : contactCount,
            icon: <FiMessageSquare size={24} />,
            color: "text-yellow-400",
        },
        {
            title: "New Messages",
            count: contactsLoading ? "..." : newContactCount,
            icon: <FiMessageSquare size={24} />,
            color: "text-red-400",
        },
    ];

    return (
        <section className="mx-auto min-h-screen max-w-7xl px-6 py-12">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                        Administration
                    </p>

                    <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                        Dashboard<span className="text-blue-500">.</span>
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage your portfolio content.
                    </p>
                </div>
                <button
                    onClick={fetchContactCount}
                    disabled={contactsLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-blue-500 hover:text-blue-400 disabled:opacity-50"
                >
                    <FiRefreshCw className={contactsLoading ? "animate-spin" : ""} />
                    Refresh
                </button>

                <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-red-500 hover:text-red-400"
                >
                    <FiLogOut />
                    Logout
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border border-white/10 bg-[#141821] p-6 transition hover:border-blue-500/40"
                    >
                        <div className={`mb-5 ${stat.color}`}>
                            {stat.icon}
                        </div>

                        <p className="text-sm text-gray-400">
                            {stat.title}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {stat.count}
                        </h2>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="mb-6 text-xl font-semibold text-white">
                    Quick Management
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: "Manage Projects", path: "/admin/projects" },
                        { title: "Manage Skills", path: "/admin/skills" },
                        { title: "Manage Experience", path: "/admin/experience" },
                        { title: "Contact Messages", path: "/admin/contacts" },
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141821] p-6 text-gray-300 transition hover:border-blue-500/50 hover:text-blue-400"
                        >
                            <span className="font-medium">{item.title}</span>
                            <FiArrowRight />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        Recent Contact Messages
                    </h2>

                    <Link
                        to="/admin/contacts"
                        className="flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
                    >
                        View All <FiArrowRight />
                    </Link>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141821]">
                    {recentContacts.length === 0 ? (
                        <p className="p-6 text-center text-gray-400">
                            No contact messages yet.
                        </p>
                    ) : (
                        <div className="divide-y divide-white/10">
                            {recentContacts.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                                >
                                    <div>
                                        <p className="font-medium text-white">
                                            {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            {item.subject}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {item.email}
                                        </p>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${item.status === "New"
                                                ? "bg-red-500/10 text-red-400"
                                                : item.status === "Read"
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : "bg-green-500/10 text-green-400"
                                            }`}
                                    >
                                        {item.status || "New"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard