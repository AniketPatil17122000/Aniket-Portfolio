
import axiosInstance from "./api/axiosInstance";

import type { Contact } from "../types/contact.types";
import type { ApiResponse } from "../types/common.type";

export const submitContact = async (data: Contact) => {
    const response = await axiosInstance.post<ApiResponse<Contact>>("/contact", data);
    return response.data;
};

export const updateContactStatus = async (
    id: string,
    status: "New" | "Read" | "Replied"
) => {
    const response = await axiosInstance.patch<ApiResponse<Contact>>(
        `/contact/${id}/status`,
        { status }
    );

    return response.data;
};

export const deleteContact = async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<null>>(
        `/contact/${id}`
    );

    return response.data;
};