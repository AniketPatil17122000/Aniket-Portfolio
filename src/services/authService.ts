import type { ApiResponse } from "../types/common.type";
import axiosInstance from "./api/axiosInstance";

interface LoginPayload {
    email: string;
    password: string;
}

interface Admin {
    id: string;
    email: string;
    token?: string;
}

export const loginAdmin = async (data : LoginPayload) => {
        const response = await axiosInstance.post<ApiResponse<Admin>>("/auth/login", data);
           if (response.data.data.token) {
        sessionStorage.setItem("adminToken", response.data.data.token);
    }
        return response.data;


}

export const getAdminProfile = async () => {
       const response = await axiosInstance.get<ApiResponse<Admin>>("/auth/profile");
    return response.data;
}

export const logoutAdmin = () => {
    sessionStorage.removeItem("adminToken");
};


interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const changeAdminPassword = async (data: ChangePasswordPayload) => {
    const response = await axiosInstance.patch(
        "/auth/change-password",
        data
    );

    return response.data;
};