import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./session.reducer.ts";

export const store = configureStore({
    reducer: {
        session: sessionReducer,
    }
})

//export necessary type for Typescript projects
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch