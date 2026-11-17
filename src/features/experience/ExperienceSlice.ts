
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import type { Experience } from "../../types/experience.types";
import { getExperiences } from "../../services/experienceService";

interface ExperienceState {
    items: Experience[];
    loading: boolean;
    error: string | null;
}

const initialState: ExperienceState = {
    items: [],
    loading: false,
    error: null
};

// Fetch experience from backend
export const fetchExperiences = createAsyncThunk(
    "experience/fetchExperiences",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getExperiences();
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch experience"
                );
            }

            return rejectWithValue("Something went wrong");
        }
    }
);

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExperiences.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExperiences.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchExperiences.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch experience";
            });
    }
});

export default experienceSlice.reducer;
