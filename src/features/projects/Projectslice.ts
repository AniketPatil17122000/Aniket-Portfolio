// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// interface Project {
//   id: string;
//   title: string;
//   description: string;
// }

// interface ProjectsState {
//   items: Project[];
// }

// const initialState: ProjectsState = {
//   items: [],
// };

// const projectsSlice = createSlice({
//   name: "projects",
//   initialState,
//   reducers: {
//     setProjects: (state, action: PayloadAction<Project[]>) => {
//       state.items = action.payload;
//     },
//   },
// });

// export const { setProjects } = projectsSlice.actions;

// export default projectsSlice.reducer;


import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import type { Project } from "../../types/project.type";
import { getProjects } from "../../services/ProjectService";


interface ProjectsState {
    items: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectsState = {
    items: [],
    loading: false,
    error: null
};

// Fetch projects from backend
export const fetchProjects = createAsyncThunk(
    "projects/fetchProjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProjects();
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch projects"
                );
            }

            return rejectWithValue("Something went wrong");
        }
    }
);

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch projects";
            });
    }
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
