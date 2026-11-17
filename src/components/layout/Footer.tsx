
import {
    FiGithub,
    FiLinkedin,
    FiArrowUp,
    FiArrowRight
} from "react-icons/fi";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className="border-t border-white/10 bg-[#0b0d12]">
            <div className="mx-auto max-w-7xl px-6 py-14">

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

                    {/* Brand */}
                    <div>
                        <a
                            href="#home"
                            className="inline-block font-['Space_Grotesk'] text-2xl font-bold text-white"
                        >
                            Aniket<span className="text-blue-500">.</span>
                        </a>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
                            Full Stack Developer passionate about building
                            modern, scalable and meaningful web applications.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://github.com/AniketPatil17122000"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit GitHub profile"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                            >
                                <FiGithub size={19} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/aniket-patil-1087421aa"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit LinkedIn profile"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white"
                            >
                                <FiLinkedin size={19} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-6 font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-blue-400"
                                >
                                    <FiArrowRight
                                        size={13}
                                        className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                    />
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div>
                        <h3 className="mb-6 font-semibold text-white">
                            Let's Connect
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-gray-400">
                            Interested in working together or discussing
                            an opportunity? Let's connect.
                        </p>

                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-500/40 px-4 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
                        >
                            Get In Touch
                            <FiArrowRight size={16} />
                        </a>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">

                    <p className="text-center text-sm text-gray-500">
                        © {currentYear} Aniket Patil. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                        Designed & Built with React and Tailwind CSS.
                    </p>

                    <a
                        href="#home"
                        aria-label="Back to top"
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                        <FiArrowUp size={18} />
                    </a>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
