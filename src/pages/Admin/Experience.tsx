import { useEffect, useState } from "react";
import { getExperiences } from "../../services/experienceService";
import type { Experience } from "../../types/experience.types";
import {
    createExperience,
    updateExperience,
    deleteExperience,
} from "../../services/experienceService";


import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const ExperiencePage = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        role: "",
        company: "",
        location: "",
        employmentType: "Full-time" as Experience["employmentType"],
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        technologies: "",
    });

    const handleEdit = (experience: Experience) => {
        setEditingId(experience._id);

        setFormData({
            role: experience.role,
            company: experience.company,
            location: experience.location || "",
            employmentType: experience.employmentType,
            startDate: experience.startDate
                ? experience.startDate.split("T")[0]
                : "",
            endDate: experience.endDate
                ? experience.endDate.split("T")[0]
                : "",
            currentlyWorking: experience.currentlyWorking,
            description: experience.description,
            technologies: experience.technologies?.join(", ") || "",
        });

        setError("");
        setShowForm(true);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const payload = {
                ...formData,
                endDate: formData.currentlyWorking
                    ? undefined
                    : formData.endDate || undefined,
                technologies: formData.technologies
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean),
            };

            if (editingId) {
                await updateExperience(editingId, payload);
            } else {
                await createExperience(payload);
            }

            setShowForm(false);
            setEditingId(null);

            setFormData({
                role: "",
                company: "",
                location: "",
                employmentType: "Full-time",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
                description: "",
                technologies: "",
            });

            await fetchAllExperiences();

        } catch (error: any) {
            setError(
                error.response?.data?.message || "Failed to save experience."
            );
        } finally {
            setSaving(false);
        }
    };

    const fetchAllExperiences = async () => {
        try {
            setLoading(true);
            const response = await getExperiences();
            setExperiences(response.data);
        } catch {
            setError("Failed to load experience.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmed) return;

        try {
            setError("");

            await deleteExperience(id);

            await fetchAllExperiences();
        } catch (error: any) {
            setError(
                error.response?.data?.message || "Failed to delete experience."
            );
        }
    };

    useEffect(() => {
        fetchAllExperiences();
    }, []);

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Experience</h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Manage your professional experience.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                    <FiPlus />
                    Add Experience
                </button>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading experience...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : experiences.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-[#141821] p-8 text-center text-gray-400">
                    No experience found. Add your first experience.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141821]">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-gray-400">
                            <tr>
                                <th className="p-4">Role</th>
                                <th className="p-4">Company</th>
                                <th className="p-4">Employment</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {experiences.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                                >
                                    <td className="p-4 font-medium text-white">
                                        {item.role}
                                    </td>

                                    <td className="p-4 text-gray-400">
                                        {item.company}
                                    </td>

                                    <td className="p-4 text-gray-400">
                                        {item.employmentType}
                                    </td>

                                    <td className="p-4 text-gray-400">
                                        {item.startDate} – {item.currentlyWorking ? "Present" : item.endDate}
                                    </td>

                                    <td className="p-4 text-gray-500">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="rounded-lg p-2 text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
                                            title="Edit Experience"
                                        >
                                            <FiEdit2 size={18} />
                                        </button>
                                        <button
    onClick={() => handleDelete(item._id)}
    className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
    title="Delete Experience"
>
    <FiTrash2 size={18} />
</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141821] p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                {editingId ? "Edit Experience" : "Add Experience"}
                            </h3>

                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Job Role</label>
                                    <input
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="Software Developer"
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Company</label>
                                    <input
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="Company name"
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Location</label>
                                    <input
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="Pune, India"
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Employment Type</label>
                                    <select
                                        value={formData.employmentType}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            employmentType: e.target.value as Experience["employmentType"],
                                        })}
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Start Date</label>
                                    <input
                                        onClick={(e) => {
                                            e.currentTarget.showPicker();
                                        }}
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startDate: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">End Date</label>
                                    <input
                                        onClick={(e) => {
                                            e.currentTarget.showPicker();
                                        }}
                                        type="date"
                                        disabled={formData.currentlyWorking}
                                        value={formData.endDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, endDate: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none cursor-pointer disabled:opacity-40"
                                    />
                                </div>
                            </div>

                            <label className="flex items-center gap-3 text-sm text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={formData.currentlyWorking}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        currentlyWorking: e.target.checked,
                                        endDate: "",
                                    })}
                                    className="h-4 w-4 accent-blue-500"
                                />
                                I currently work here
                            </label>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe your responsibilities and achievements..."
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Technologies (comma separated)
                                </label>
                                <input
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    placeholder="React, TypeScript, Node.js"
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-gray-300 hover:bg-white/5"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Experience"
                                            : "Save Experience"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperiencePage;