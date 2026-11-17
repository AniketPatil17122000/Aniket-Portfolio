import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/projects/Projectslice";
import skillsReducer from "../features/skills/Skillsslice";
import themeReducer from "../features/theme/Themeslice";
import experienceReducer from "../features/experience/ExperienceSlice";


export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    skills: skillsReducer,
    theme: themeReducer,
        experience: experienceReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;