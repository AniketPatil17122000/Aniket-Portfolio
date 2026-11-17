import { useEffect, useState } from "react";
import { getSkills } from "../../services/skillService";
import type { Skill } from "../../types/skill.types";
import { createSkill, updateSkill, deleteSkill } from "../../services/skillService";
import { FiX, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";


const Skills = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "Frontend",
        level: 80,
        icon: "",
    });
    const handleEdit = (skill: Skill) => {
        setError("");
        setEditingId(skill._id);

        setFormData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            icon: skill.icon || "",
        });

        setShowForm(true);
    };
    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) return;

        try {
            await deleteSkill(id);
            await fetchAllSkills();
        } catch {
            setError("Failed to delete skill.");
        }
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const payload = {
                ...formData,
                icon: formData.icon || undefined,
            };

            if (editingId) {
                await updateSkill(editingId, payload);
            } else {
                await createSkill(payload);
            }

            setShowForm(false);
            setEditingId(null);

            setFormData({
                name: "",
                category: "Frontend",
                level: 80,
                icon: "",
            });

            await fetchAllSkills();
        } catch (error: any) {
            setError(error.response?.data?.message || "Failed to save skill.");
        } finally {
            setSaving(false);
        }
    };
    const fetchAllSkills = async () => {
        try {
            setLoading(true);
            const response = await getSkills();
            setSkills(response.data);
        } catch {
            setError("Failed to load skills.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSkills();
    }, []);

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Skills</h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Manage your technical skills.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                    <FiPlus />
                    Add Skill
                </button>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading skills...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : skills.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-[#141821] p-8 text-center text-gray-400">
                    No skills found. Add your first skill.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141821]">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-gray-400">
                            <tr>
                                <th className="p-4">Skill</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Proficiency</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {skills.map((skill) => (
                                <tr
                                    key={skill._id}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                                >
                                    <td className="p-4 font-medium text-white">
                                        {skill.name}
                                    </td>

                                    <td className="p-4 text-gray-400">
                                        {skill.category}
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {skill.category}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(skill)}
                                                title="Edit skill"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-500/10"
                                            >
                                                <FiEdit2 size={16} />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(skill._id)}
                                                title="Delete skill"
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                                            >
                                                <FiTrash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141821] p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                {editingId ? "Edit Skill" : "Add New Skill"}
                            </h3>

                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Skill Name
                                </label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    placeholder="e.g. React"
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                >
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                    <option value="Tools">Tools</option>
                                </select>
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label className="text-sm text-gray-300">
                                        Proficiency Level
                                    </label>
                                    <span className="text-sm text-blue-400">
                                        {formData.level}%
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.level}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            level: Number(e.target.value),
                                        })
                                    }
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Icon (Optional)
                                </label>
                                <input
                                    value={formData.icon}
                                    onChange={(e) =>
                                        setFormData({ ...formData, icon: e.target.value })
                                    }
                                    placeholder="e.g. react"
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
                                            ? "Update Skill"
                                            : "Save Skill"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;