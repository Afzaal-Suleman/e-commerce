import { createSlice } from "@reduxjs/toolkit";
import { logInUser, signout, signupUser, updateUser, checkUser, emailRequest, resetPassword } from "./authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedInUser: null,
        status: 'idle', // 'idle', 'loading', 'success', 'failed'
        error: null,
        userChecked: false,
        mailSent: false,
        resetpass: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Clear error on pending
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.loggedInUser = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Set error message on failure
            })
            .addCase(logInUser.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Clear error on pending
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.loggedInUser = action.payload;
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Set error message on failure
            })
            .addCase(checkUser.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Clear error on pending
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.loggedInUser = action.payload;
                state.userChecked = true

            })
            .addCase(checkUser.rejected, (state, action) => {
                state.error = action.error.message; // Set error message on failure
                state.userChecked = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.loggedInUser = action.payload;
                state.error = null; // Clear error on success
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Set error message on failure
            })
            .addCase(signout.fulfilled, (state) => {
                state.loggedInUser = null;
                state.status = 'logout';
            })
            .addCase(signout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message; // Set error message on failure
            })
            .addCase(emailRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(emailRequest.fulfilled, (state) => {
                state.status = 'sendEmail';
                state.mailSent = true
            })
            .addCase(emailRequest.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.error.message; // Set error message on failure
            })
            
            .addCase(resetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.status = 'password reset';
                state.resetpass = true
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.error.message; // Set error message on failure
            });
    },
});

export default authSlice.reducer;
