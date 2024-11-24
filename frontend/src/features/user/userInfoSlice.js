import { createSlice } from "@reduxjs/toolkit";
import { getOrders, getUserById, deleteAddress } from "./userInfoApi";

const initialState = {
    status: 'idle',
    userInfoOrders: null,
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getOrders.pending, (state)=>{
            state.status = 'Loading'
        })
        .addCase(getOrders.fulfilled, (state, action)=>{
            state.status = "success",
            state.userInfoOrders = action.payload
        })
        .addCase(getUserById.pending, (state)=>{
            state.status = 'Loading'
        })
        .addCase(getUserById.fulfilled, (state, action)=>{
            state.status = "success",
            state.userData.push(action.payload)
        })
        .addCase(deleteAddress.pending, (state)=>{
            state.status = 'Loading'
        })
        .addCase(deleteAddress.fulfilled, (state)=>{
            state.status = "update"
        })
    }
})
export default userInfoSlice.reducer