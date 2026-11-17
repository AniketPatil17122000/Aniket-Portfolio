
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#0b0d12] text-white">
            <Navbar />

            <main className="pt-20">
                <Outlet />
            </main>

<Footer />
        </div>
    );
};

export default MainLayout;
