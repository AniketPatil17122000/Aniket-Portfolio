import axiosInstance from "./api/axiosInstance";
import type { ApiResponse } from "../types/common.type";

interface ImageUploadResponse {
    secure_url: string;
    public_id: string;
}

export const uploadProjectImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file, file.name);

    const response = await axiosInstance.post<
        ApiResponse<ImageUploadResponse>
    >("/images/project", formData, {
        headers: {
            "Content-Type": undefined,
        },
    });

    return response.data;
};