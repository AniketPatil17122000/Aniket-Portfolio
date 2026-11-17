
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("adminToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const token = sessionStorage.getItem("adminToken");

            if (token) {
                sessionStorage.removeItem("adminToken");

                if (window.location.pathname.startsWith("/admin")) {
                    window.location.href = "/admin/login";
                }
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
