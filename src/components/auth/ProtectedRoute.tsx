import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAdminProfile } from "../../services/authService";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            const token = sessionStorage.getItem("adminToken");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                await getAdminProfile();
                setIsAuthenticated(true);
            } catch {
                sessionStorage.removeItem("adminToken");
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAdmin();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;