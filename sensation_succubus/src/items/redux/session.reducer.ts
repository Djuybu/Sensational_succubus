import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
    token: string | null,
}

const initialState: SessionState = {
    token: null,
}

export const setId = createAction<string | null>('session/setId');

const sessionReducer = createReducer(initialState, builder => {
    builder
        .addCase(setId, (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        })
})

export default sessionReducer;
