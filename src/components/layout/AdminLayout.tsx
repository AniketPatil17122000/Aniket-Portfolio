import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../services/authService";
import {
    FiGrid,
    FiFolder,
    FiCode,
    FiBriefcase,
    FiMessageSquare,
    FiLogOut,
    FiLock,
} from "react-icons/fi";


const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutAdmin();
        navigate("/admin/login", { replace: true });
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid /> },
        { name: "Projects", path: "/admin/projects", icon: <FiFolder /> },
        { name: "Skills", path: "/admin/skills", icon: <FiCode /> },
        { name: "Experience", path: "/admin/experience", icon: <FiBriefcase /> },
        { name: "Messages", path: "/admin/contacts", icon: <FiMessageSquare /> },
        { name: "Change Password", path: "/admin/change-password", icon: <FiLock /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#0b0d12] text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-[#141821] p-5">
                <h2 className="mb-10 text-xl font-bold">
                    Admin<span className="text-blue-500">.</span>
                </h2>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/admin/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                                    isActive
                                        ? "bg-blue-500/10 text-blue-400"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                    <FiLogOut />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <div className="ml-64 flex min-h-screen flex-1 flex-col">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0b0d12]/90 px-8 backdrop-blur-lg">
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                    <span className="text-sm text-gray-400">Portfolio Management</span>
                </header>

                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;