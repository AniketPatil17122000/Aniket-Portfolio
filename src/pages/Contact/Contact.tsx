
import { useState, type FormEvent, type ChangeEvent } from "react";
import {
    FiMail,
    FiMapPin,
    FiSend,
    FiGithub,
    FiLinkedin
} from "react-icons/fi";

import { submitContact } from "../../services/contactService";
import type { Contact as ContactType } from "../../types/contact.types";
import Reveal from "../../components/animations/Reveal";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSuccess("");
        setError("");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            await submitContact(formData as ContactType);

            setSuccess("Your message has been sent successfully!");

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Unable to send your message. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-[#0b0d12] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 disabled:opacity-60";

    return (
        <section
            id="contact"
            className="mx-auto max-w-7xl px-6 py-24"
        >
            {/* Section Heading */}
            <Reveal>
                <div className="mb-14">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                        Get In Touch
                    </p>

                    <h2 className="font-['Space_Grotesk'] text-3xl font-bold sm:text-4xl">
                        Let's Work Together
                        <span className="text-blue-500">.</span>
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                        Have an opportunity, a project idea or just want
                        to connect? I'd love to hear from you.
                    </p>
                </div>
            </Reveal>

            <Reveal>
                <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">

                    {/* Contact Information */}
                    <div className="space-y-6">

                        <div className="rounded-2xl border border-white/10 bg-[#141821] p-7">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                                <FiMail size={22} />
                            </div>

                            <h3 className="mb-2 text-lg font-semibold text-white">
                                Let's Connect
                            </h3>

                            <p className="text-sm leading-7 text-gray-400">
                                Whether it's a job opportunity, collaboration
                                or a technical discussion, feel free to
                                drop me a message.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#141821] p-7">
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                                <FiMapPin size={22} />
                            </div>

                            <h3 className="mb-2 text-lg font-semibold text-white">
                                Location
                            </h3>

                            <p className="text-sm text-gray-400">
                                Ghansoli , Navi Mumbai , Maharashtra, India
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="rounded-2xl border border-white/10 bg-[#141821] p-7">
                            <h3 className="mb-5 font-semibold text-white">
                                Find me online
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="https://github.com/AniketPatil17122000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                                >
                                    <FiGithub size={18} />
                                    GitHub
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/aniket-patil-1087421aa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                                >
                                    <FiLinkedin size={18} />
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-2xl border border-white/10 bg-[#141821] p-6 sm:p-8"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-white">
                                Send Me a Message
                            </h3>

                            <p className="mt-2 text-sm text-gray-400">
                                Fill out the form and I'll get back to you.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Your Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className={inputClass}
                                minLength={2}
                                maxLength={80}
                                autoComplete="name"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={inputClass}
                                maxLength={120}
                                autoComplete="email"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Subject
                            </label>

                            <input
                                id="subject"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What would you like to discuss?"
                                className={inputClass}
                                minLength={3}
                                maxLength={120}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-medium text-gray-300"
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message..."
                                rows={5}
                                className={`${inputClass} resize-none`}
                                minLength={10}
                                maxLength={2000}
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div
                                role="status"
                                aria-live="polite"
                                className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400"
                            >
                                {success}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                "Sending Message..."
                            ) : (
                                <>
                                    Send Message
                                    <FiSend size={17} />
                                </>
                            )}
                        </button>

                    </form>
                </div>
            </Reveal>
        </section>
    );
};

export default Contact;
