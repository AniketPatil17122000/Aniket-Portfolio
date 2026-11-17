
import type { ApiResponse } from "../types/common.type";
import type { Project } from "../types/project.type";
import axiosInstance from "./api/axiosInstance";


export const getProjects = async () => {
    const response = await axiosInstance.get<ApiResponse<Project[]>>("/projects");
    return response.data;
};

export const getProjectById = async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data;
};

export const createProject = async (data: Partial<Project>) => {
    const response = await axiosInstance.post<ApiResponse<Project>>(
        "/projects",
        data
    );
    return response.data;
};

export const updateProject = async (
    id: string,
    data: Partial<Project>
) => {
    const response = await axiosInstance.patch<ApiResponse<Project>>(
        `/projects/${id}`,
        data
    );
    return response.data;
};

export const deleteProject = async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<null>>(
        `/projects/${id}`
    );
    return response.data;
};