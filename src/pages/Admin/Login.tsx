
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";
import { loginAdmin } from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await loginAdmin({ email, password });
            navigate("/admin/dashboard", { replace: true });
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-[#141821] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500";

    return (
        <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141821] p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                        <FiLock size={26} />
                    </div>

                    <h1 className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                        Admin Login
                    </h1>

                    <p className="mt-3 text-sm text-gray-400">
                        Sign in to manage your portfolio.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Email Address
                        </label>

                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={inputClass}
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Password
                        </label>

                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className={inputClass}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                        {!loading && <FiLogIn />}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="text-sm text-gray-400 transition hover:text-blue-400"
                    >
                        Back to Portfolio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;