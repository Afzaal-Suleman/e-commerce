import { createSlice } from "@reduxjs/toolkit";
import { addTocart, getCartItems, updateItems, deleteItem, resetCart } from "./cartApi";
const initialState = {
    items: [], // Changed `item` to `items` for consistency
    status: 'idle',
    error: null, // Added for handling errors
    cartloaded: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTocart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTocart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optional: Update cart items or handle success
            })
            .addCase(getCartItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Update items with fetched data
                state.cartloaded = true
            })
            .addCase(getCartItems.rejected, (state) => {
                state.status = 'idle';
                state.cartloaded = true
            })
            .addCase(updateItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Update item in a non-mutative way
                // state.items = state.items.map(item =>
                //     item._id === action.payload._id ? action.payload : item
                // );
            })
            .addCase(deleteItem.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.status = 'deleteItem';
                // Remove item in a non-mutative way
                state.items = state.items.filter(item => item._id !== action.payload._id);
            })
            .addCase(resetCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetCart.fulfilled, (state) => {
                state.status = 'succeeded';
                state.items = []; // Clear cart items on reset
            })
            .addCase(addTocart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(resetCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;
