import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async(order, {rejectWithValue})=>{
        
        try {

            const response = await fetch('http://localhost:8080/order/userorder',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order)
                }
            )
            if(!response){
                rejectWithValue("order not created plz try again")
            }
            const res = await response.json();
            
            return res.savedOrder;
        } catch (error) {
            rejectWithValue(error.message)
            console.log(error.message);
            
        }
    }
)

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async(_, {rejectWithValue})=>{
        try {
            const response = await fetch('http://localhost:8080/order/getallorders')
            const res = await response.json()
            console.log(res.order, 12);
            
            return res.order;
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

export const resetCurrentOrder = createAsyncThunk(
    'order/resetCurrentOrder',
    async(_, {rejectWithValue})=>{
      try {
        return true
      } catch (error) {
        rejectWithValue(error.message)
      }
    }
)

export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async( data, {rejectWithValue})=>{
        try {
            console.log(data,  'ww');
            
            const response = await fetch('http://localhost:8080/order/updateOrderStatus/'+data._id,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const res = response.stringify()
            return res;
        } catch (error) {
            rejectWithValue(error.message)   
        }
    }
)