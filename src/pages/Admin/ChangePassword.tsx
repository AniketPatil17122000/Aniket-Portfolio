
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiArrowLeft } from "react-icons/fi";
import { changeAdminPassword, logoutAdmin } from "../../services/authService";

const ChangePassword = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.newPassword.length < 8) {
            setError("New password must contain at least 8 characters.");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        if (formData.currentPassword === formData.newPassword) {
            setError("New password must be different from current password.");
            return;
        }

        try {
            setLoading(true);

            const response = await changeAdminPassword(formData);

            setSuccess(response.message || "Password changed successfully.");

            // Old JWT is invalidated by the backend.
            logoutAdmin();

            setTimeout(() => {
                navigate("/admin/login", { replace: true });
            }, 1500);

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Unable to change password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-lg border border-white/10 bg-[#0b0d12] px-4 py-3 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500";

    const renderPasswordField = (
        label: string,
        name: "currentPassword" | "newPassword" | "confirmPassword",
        visible: boolean,
        toggle: () => void,
        placeholder: string,
        autoComplete: string
    ) => (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
                {label}
            </label>

            <div className="relative">
                <input
                    type={visible ? "text" : "password"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={inputClass}
                    required
                />

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    {visible ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Change Password</h2>
                <p className="mt-2 text-sm text-gray-400">
                    Update your admin account password.
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#141821] p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                        <FiLock size={22} />
                    </div>

                    <div>
                        <h3 className="font-semibold text-white">
                            Password Security
                        </h3>
                        <p className="text-xs text-gray-500">
                            Choose a strong password with at least 8 characters.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {renderPasswordField(
                        "Current Password",
                        "currentPassword",
                        showPassword.current,
                        () => setShowPassword({
                            ...showPassword,
                            current: !showPassword.current
                        }),
                        "Enter current password",
                        "current-password"
                    )}

                    {renderPasswordField(
                        "New Password",
                        "newPassword",
                        showPassword.new,
                        () => setShowPassword({
                            ...showPassword,
                            new: !showPassword.new
                        }),
                        "Enter new password",
                        "new-password"
                    )}

                    {renderPasswordField(
                        "Confirm New Password",
                        "confirmPassword",
                        showPassword.confirm,
                        () => setShowPassword({
                            ...showPassword,
                            confirm: !showPassword.confirm
                        }),
                        "Confirm new password",
                        "new-password"
                    )}

                    {error && (
                        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
                            {success} Redirecting to login...
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3 pt-3">
                        <button
                            type="submit"
                            disabled={loading || !!success}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5"
                        >
                            <FiArrowLeft />
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
