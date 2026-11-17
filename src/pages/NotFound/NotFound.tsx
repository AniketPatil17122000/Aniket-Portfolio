
import { Link } from "react-router-dom";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";

const NotFound = () => {
    return (
        <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
            <FiAlertCircle className="mb-6 text-blue-500" size={55} />

            <h1 className="font-['Space_Grotesk'] text-7xl font-bold text-blue-500 sm:text-9xl">
                404
            </h1>

            <h2 className="mt-6 text-2xl font-semibold text-white">
                Page Not Found
            </h2>

            <p className="mt-4 max-w-md leading-7 text-gray-400">
                The page you're looking for doesn't exist or may have been moved.
            </p>

            <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
            >
                <FiArrowLeft />
                Back to Home
            </Link>
        </section>
    );
};

export default NotFound;
