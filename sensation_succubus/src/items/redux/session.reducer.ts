import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
    id: string | null,
}

const initialState: SessionState = {
    id: null,
}

export const setId = createAction<string | null>('session/setId');

const sessionReducer = createReducer(initialState, builder => {
    builder
        .addCase(setId, (state, action: PayloadAction<string | null>) => {
            state.id = action.payload;
        })
})

export default sessionReducer;
