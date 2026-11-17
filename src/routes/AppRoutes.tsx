
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Admin/Login";
import Dashboard from "../pages/Admin/Dashboard";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminLayout from "../components/layout/AdminLayout";
import Projects from "../pages/Admin/Projects";
import Skills from "../pages/Admin/Skills";
import ExperiencePage from "../pages/Admin/Experience";
import Contacts from "../pages/Admin/Contact";
import ChangePassword from "../pages/Admin/ChangePassword";




const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/projects" element={<Projects />} />
                <Route path="/admin/skills" element={<Skills />} />
                <Route path="/admin/experience" element={<ExperiencePage />} />
                <Route path="/admin/contacts" element={<Contacts />} />
                <Route path="/admin/change-password" element={<ChangePassword />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
