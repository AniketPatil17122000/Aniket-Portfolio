
import axiosInstance from "./api/axiosInstance";

import type { Skill } from "../types/skill.types";
import type { ApiResponse } from "../types/common.type";

export const getSkills = async () => {
    const response = await axiosInstance.get<ApiResponse<Skill[]>>("/skills");
    return response.data;
};

export const createSkill = async (data: Partial<Skill>) => {
    const response = await axiosInstance.post<ApiResponse<Skill>>(
        "/skills",
        data
    );
    return response.data;
};

export const updateSkill = async (
    id: string,
    data: Partial<Skill>
) => {
    const response = await axiosInstance.patch<ApiResponse<Skill>>(
        `/skills/${id}`,
        data
    );
    return response.data;
};

export const deleteSkill = async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<null>>(
        `/skills/${id}`
    );
    return response.data;
};