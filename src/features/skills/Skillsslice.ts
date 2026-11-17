// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface SkillsState {
//   items: string[];
// }

// const initialState: SkillsState = {
//   items: [],
// };

// const skillsSlice = createSlice({
//   name: "skills",
//   initialState,
//   reducers: {
//     setSkills: (state, action: PayloadAction<string[]>) => {
//       state.items = action.payload;
//     },
//   },
// });

// export const { setSkills } = skillsSlice.actions;

// export default skillsSlice.reducer;



import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import type { Skill } from "../../types/skill.types";
import { getSkills } from "../../services/skillService";

interface SkillsState {
    items: Skill[];
    loading: boolean;
    error: string | null;
}

const initialState: SkillsState = {
    items: [],
    loading: false,
    error: null
};

// Fetch skills from backend
export const fetchSkills = createAsyncThunk(
    "skills/fetchSkills",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSkills();
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch skills"
                );
            }

            return rejectWithValue("Something went wrong");
        }
    }
);

const skillsSlice = createSlice({
    name: "skills",
    initialState,
    reducers: {
        setSkills: (state, action: PayloadAction<Skill[]>) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch skills";
            });
    }
});

export const { setSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
