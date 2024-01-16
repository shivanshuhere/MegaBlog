import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null, // here we use an object
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
        },
    },
});

export default authSlice.reducer; //  authSlice

export const { login, logout } = authSlice.actions; // authslice fxns/ redcuers
