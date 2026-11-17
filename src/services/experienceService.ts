
import axiosInstance from "./api/axiosInstance";

import type { Experience } from "../types/experience.types";
import type { ApiResponse } from "../types/common.type";

export const getExperiences = async () => {
    const response = await axiosInstance.get<ApiResponse<Experience[]>>("/experience");
    return response.data;
};

export const createExperience = async (data: Partial<Experience>) => {
    const response = await axiosInstance.post<ApiResponse<Experience>>(
        "/experience",
        data
    );
    return response.data;
};

export const updateExperience = async (
    id: string,
    data: Partial<Experience>
) => {
    const response = await axiosInstance.patch<ApiResponse<Experience>>(
        `/experience/${id}`,
        data
    );
    return response.data;
};

export const deleteExperience = async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<null>>(
        `/experience/${id}`
    );
    return response.data;
};