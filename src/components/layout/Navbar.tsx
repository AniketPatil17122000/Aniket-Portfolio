
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        const sections = navLinks
            .map((link) => document.querySelector(link.href))
            .filter((section): section is Element => section !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px",
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleNavigation = (href: string) => {
        setMenuOpen(false);

        document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#0b0d12]/90 shadow-lg shadow-black/10 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <button
                    onClick={() => handleNavigation("#home")}
                    className="font-['Space_Grotesk'] text-xl font-bold tracking-wide text-white"
                    aria-label="Go to home section"
                >
                    Aniket Patil<span className="text-blue-500">.</span>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.slice(1);

                        return (
                            <button
                                key={link.name}
                                onClick={() => handleNavigation(link.href)}
                                aria-current={isActive ? "location" : undefined}
                                className={`relative py-2 text-sm font-medium transition ${
                                    isActive
                                        ? "text-blue-400"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {link.name}

                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-500"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xl text-white transition hover:border-blue-500/50 hover:bg-blue-500/10 md:hidden"
                    aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-white/10 bg-[#0b0d12] md:hidden"
                    >
                        <div className="space-y-1 px-6 py-4">
                            {navLinks.map((link) => {
                                const isActive =
                                    activeSection === link.href.slice(1);

                                return (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavigation(link.href)}
                                        aria-current={isActive ? "location" : undefined}
                                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                                            isActive
                                                ? "bg-blue-500/10 text-blue-400"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                    >
                                        {link.name}

                                        {isActive && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
