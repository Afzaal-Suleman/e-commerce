import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTocart = createAsyncThunk(
    'counter/addTocart',
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/cart/createcart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            // if (response.ok) {
            //     alert('add to cart Successfully')
            // }
            const items = await response.json();
            return items;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const getCartItems = createAsyncThunk(
    'counter/getCartItems',
    async (ids, { rejectWithValue }) => {
        try {

            const response = await fetch('http://localhost:8080/cart/selectcartitems/' + ids, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const items = await response.json();
            return items.cartItems;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const updateItems = createAsyncThunk(
    'counter/updateItems',
    async (value, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/cart/updatecartItem/' + value._id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(value)
            })
            const res = await response.json();
            return res.cartItems;

        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)
export const deleteItem = createAsyncThunk(
    'counter/deleteItem',
    async (ids, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8080/cart/deletecartitem/' + ids, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const res = await response.json();
            return res.deleteItem;
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)


export const resetCart = createAsyncThunk(
    'counter/resetCart',
    async (userId, { rejectWithValue }) => {
        try {
            // Fetch the cart items for the user
            const response = await fetch(`http://localhost:8080/cart/deleteallcartitem/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item with id: ${item.id}`);
            }
            return [];
        }


        catch (error) {
            return rejectWithValue(error.message);
        }

    });