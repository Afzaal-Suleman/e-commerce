import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk(
  'userInfo/getOrders',
  async (ids, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/order/getallordersbyid/${ids}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const items = await response.json();
      
      return items.order;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return rejectWithValue(error.message);
    }
  }
);
export const getUserById = createAsyncThunk(
  'userInf/getUserById',
  async(ids, {rejectWithValue})=>{
    try {
      const response = await fetch(`http://localhost:3000/users/?id=${ids}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const userInfo = await response.json();
      console.log(userInfo);
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)



export const deleteAddress = createAsyncThunk(
  'userInf/deleteAddress',
  async (ids, { rejectWithValue }) => {
    try {
      // Fetch user data using the user ID
      const response = await fetch(`http://localhost:3000/users/?id=${ids.user}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json();
      if (users.length === 0) {
        throw new Error('User not found');
      }

      // Remove the address at the specified index
      const user = users[0];
      user.address.splice(ids.index, 1); // Remove the address at the given index

      // Update user data on the server
      const updateResponse = await fetch(`http://localhost:3000/users/${ids.user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (!updateResponse.ok) {
        throw new Error('Failed to update user');
      }
      const updatedUser = await updateResponse.json();

      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

