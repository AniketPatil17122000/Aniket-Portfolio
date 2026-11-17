
export interface ApiResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
}

export interface ApiError {
    success: boolean;
    status: number;
    message: string;
}
