import { useEffect, useState } from "react";
import type { Project } from "../../types/project.type";
import { createProject, getProjects, deleteProject, updateProject } from "../../services/ProjectService";
import { uploadProjectImage } from "../../services/imageService";

import { FiX, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        technologies: "",
        category: "Full Stack" as Project["category"],
        image: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        status: "Draft" as Project["status"],
    });
    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            setError("Only JPG, PNG and WEBP images are allowed.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        try {
            setError("");
            setImageUploading(true);

            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            const response = await uploadProjectImage(file);

            setFormData((prev) => ({
                ...prev,
                image: response.data.secure_url,
            }));

            setImagePreview(response.data.secure_url);
            URL.revokeObjectURL(previewUrl);
        } catch (error: any) {
            setError(
                error.response?.data?.message || "Image upload failed."
            );
        } finally {
            setImageUploading(false);
            e.target.value = "";
        }
    };
    const handleEdit = (project: Project) => {
        setError("");
        setEditingId(project._id);

        setFormData({
            title: project.title,
            slug: project.slug,
            description: project.description,
            technologies: project.technologies.join(", "),
            category: project.category,
            image: project.image || "",
            liveUrl: project.liveUrl || "",
            githubUrl: project.githubUrl || "",
            featured: project.featured,
            status: project.status,
        });
        setImagePreview(project.image || "");

        setShowForm(true);
    };
    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) return;

        try {
            await deleteProject(id);
            await fetchAllProjects();
        } catch {
            setError("Failed to delete project.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            const payload = {
                ...formData,
                technologies: formData.technologies
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean),
                image: formData.image || undefined,
                liveUrl: formData.liveUrl || undefined,
                githubUrl: formData.githubUrl || undefined,
            };

            if (editingId) {
                await updateProject(editingId, payload);
            } else {
                await createProject(payload);
            }

            setShowForm(false);
            setEditingId(null);

            setFormData({
                title: "",
                slug: "",
                description: "",
                technologies: "",
                category: "Full Stack",
                image: "",
                liveUrl: "",
                githubUrl: "",
                featured: false,
                status: "Draft",
            });

            await fetchAllProjects();
        } catch (error: any) {
            setError(
                error.response?.data?.message || "Failed to save project."
            );
        } finally {
            setSaving(false);
        }
    };

    const fetchAllProjects = async () => {
        try {
            setLoading(true);
            const response = await getProjects();
            setProjects(response.data);
        } catch {
            setError("Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProjects();
    }, []);

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Manage your portfolio projects.
                    </p>
                </div>

                <button
             onClick={() => {
    setEditingId(null);
    setError("");
    setImagePreview("");

    setFormData({
        title: "",
        slug: "",
        description: "",
        technologies: "",
        category: "Full Stack",
        image: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        status: "Draft",
    });

    setShowForm(true);
}}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                >
                    <FiPlus />
                    Add Project
                </button>
            </div>

            {loading ? (
                <p className="text-gray-400">Loading projects...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : projects.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-[#141821] p-8 text-center text-gray-400">
                    No projects found. Add your first project.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141821]">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-gray-400">
                            <tr>
                                <th className="p-4">Project</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Featured</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project._id}
                                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                                >
                                    <td className="p-4 font-medium text-white">
                                        {project.title}
                                    </td>

                                    <td className="p-4 text-gray-400">
                                        {project.category}
                                    </td>

                                    <td className="p-4">
                                        <span className={`rounded-full px-3 py-1 text-xs ${project.status === "Published"
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-yellow-500/10 text-yellow-400"
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>

                                    <td className="p-4 text-gray-400">
                                        {project.featured ? "Yes" : "No"}
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-500/10"
                                                title="Edit project"
                                            >
                                                <FiEdit2 />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                                                title="Delete project"
                                            >
                                                <FiTrash2 />
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
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141821] p-6">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                {editingId ? "Edit Project" : "Add New Project"}
                            </h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-gray-300">Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    placeholder="Project title"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">Slug</label>
                                <input
                                    required
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slug: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    placeholder="project-slug"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    placeholder="Describe your project..."
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Technologies (comma separated)
                                </label>
                                <input
                                    required
                                    value={formData.technologies}
                                    onChange={(e) =>
                                        setFormData({ ...formData, technologies: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    placeholder="React, TypeScript, Node.js"
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                category: e.target.value as Project["category"],
                                            })
                                        }
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none"
                                    >
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Full Stack">Full Stack</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value as Project["status"],
                                            })
                                        }
                                        className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none"
                                    >
                                        <option value="Draft">Draft</option>
                                        <option value="Published">Published</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Project Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white"
                                />

                                <p className="mt-2 text-xs text-gray-500">
                                    JPG, PNG or WEBP. Maximum size: 5 MB.
                                </p>

                                {imageUploading && (
                                    <p className="mt-3 text-sm text-blue-400">
                                        Uploading image...
                                    </p>
                                )}

                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Project preview"
                                        className="mt-4 h-40 w-full rounded-lg border border-white/10 object-cover"
                                    />
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    type="url"
                                    value={formData.liveUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, liveUrl: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    placeholder="Live URL (optional)"
                                />

                                <input
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, githubUrl: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-white/10 bg-[#0b0d12] p-3 text-sm text-white outline-none focus:border-blue-500"
                                    placeholder="GitHub URL (optional)"
                                />
                            </div>

                            <label className="flex items-center gap-3 text-sm text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) =>
                                        setFormData({ ...formData, featured: e.target.checked })
                                    }
                                    className="h-4 w-4 accent-blue-500"
                                />
                                Featured project
                            </label>

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
                                    disabled={saving || imageUploading}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                                >
                                    {imageUploading
                                        ? "Uploading Image..."
                                        : saving
                                            ? "Saving..."
                                            : editingId
                                                ? "Update Project"
                                                : "Save Project"}
                                </button>
                            </div>

                            {error && (
                                <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Projects;