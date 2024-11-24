import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getAllOrders, resetCurrentOrder, updateOrderStatus } from "./orderApi";

const initialState = {
    orders: [],
    status: "idle",
    currentOrderPlaced: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(createOrder.pending, (state)=>{
            state.status = "loading"
        })
        .addCase(createOrder.fulfilled, (state, action)=>{
            state.status = "success",
            // state.orders.push(action.payload)
            state.currentOrderPlaced = action.payload
        })
        .addCase(createOrder.rejected, (state)=>{
            state.status = 'failed'
        })
        .addCase(getAllOrders.fulfilled, (state, action)=>{
            state.status = "success",
            state.orders = action.payload
        })
        .addCase(getAllOrders.rejected, (state)=>{
            state.status = 'failed'
        })
        .addCase(resetCurrentOrder.fulfilled, (state) => {
            state.currentOrderPlaced = null;
            state.status = 'resetCart';
        })
        .addCase(resetCurrentOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message; // Set error message on failure
        })
        .addCase(updateOrderStatus.fulfilled, (state) => {
            state.status = 'update';
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message; // Set error message on failure
        });
    }
})
export const selectCurrentOrder = (state) => state.order.currentOrderPlaced

export default orderSlice.reducer