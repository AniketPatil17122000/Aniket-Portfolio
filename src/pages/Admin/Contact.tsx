import { useEffect, useState } from "react";
import axiosInstance from "../../services/api/axiosInstance";
import type { Contact } from "../../types/contact.types";
import { updateContactStatus  , deleteContact } from "../../services/contactService";

const Contacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.get("/contact");

            setContacts(response.data.data);
        } catch (error: any) {
            setError(
                error.response?.data?.message || "Failed to fetch messages."
            );
        } finally {
            setLoading(false);
        }
    };
    const filteredContacts = contacts.filter((item) => {
        if (statusFilter === "All") return true;

        return item.status === statusFilter;
    });

    const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
        return;
    }

    try {
        await deleteContact(id);

        setContacts((prev) =>
            prev.filter((item) => item._id !== id)
        );

        if (selectedContact?._id === id) {
            setSelectedContact(null);
        }
    } catch (error: any) {
        setError(
            error.response?.data?.message || "Failed to delete message."
        );
    }
};

    const handleStatusChange = async (
        id: string,
        status: "New" | "Read" | "Replied"
    ) => {
        try {
            await updateContactStatus(id, status);

            setContacts((prev) =>
                prev.map((item) =>
                    item._id === id ? { ...item, status } : item
                )
            );
        } catch (error: any) {
            setError(
                error.response?.data?.message || "Failed to update status."
            );
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Contact Messages
                    </h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Manage messages received from your portfolio.
                    </p>
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-white/10 bg-[#141821] px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500"
                >
                    <option value="All">All Messages</option>
                    <option value="New">New</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                </select>
            </div>

            {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {loading ? (
                <p className="text-gray-400">Loading messages...</p>
            ) : filteredContacts.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-[#141821] p-6 text-center text-gray-400">
                    No contact messages found.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141821]">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-white/10 text-gray-400">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredContacts.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-b border-white/5 text-gray-300"
                                >
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4">{item.email}</td>
                                    <td className="p-4">{item.subject}</td>
                                    <td className="p-4"><select
                                        value={item.status || "New"}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                item._id!,
                                                e.target.value as "New" | "Read" | "Replied"
                                            )
                                        }
                                        className="rounded-lg border border-white/10 bg-[#141821] px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                                    >
                                        <option value="New">New</option>
                                        <option value="Read">Read</option>
                                        <option value="Replied">Replied</option>
                                    </select></td>
                                    <td className="p-4">
                                        {item.createdAt
                                            ? new Date(item.createdAt).toLocaleDateString()
                                            : "-"}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => setSelectedContact(item)}
                                            className="rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-400 transition hover:bg-blue-500/20"
                                        >
                                            View Message
                                        </button>
                                        <button
    onClick={() => handleDelete(item._id!)}
    className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
>
    Delete
</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141821] p-6">

                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">
                                Message Details
                            </h2>

                            <button
                                onClick={() => setSelectedContact(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="mt-1 text-white">{selectedContact.name}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="mt-1 text-white">{selectedContact.email}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Subject</p>
                                <p className="mt-1 text-white">{selectedContact.subject}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Message</p>
                                <p className="mt-1 whitespace-pre-wrap rounded-lg bg-[#0b0d12] p-4 text-gray-300">
                                    {selectedContact.message}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Status</p>
                                <p className="mt-1 text-white">{selectedContact.status}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Received</p>
                                <p className="mt-1 text-white">
                                    {selectedContact.createdAt
                                        ? new Date(selectedContact.createdAt).toLocaleString()
                                        : "-"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedContact(null)}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;