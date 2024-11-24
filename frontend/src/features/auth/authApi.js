import { createAsyncThunk } from "@reduxjs/toolkit";
import { json } from "react-router-dom";


export const logInUser = createAsyncThunk(
  'users/logInUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/user/loginuser',{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
      
      const users = await response.json();
      // localStorage.setItem('token', users.data.refreshToken);
      return users.data 
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkUser = createAsyncThunk(
  'user/checkUser',
  async(token, {rejectWithValue})=>{
    
    try {
      const response = await fetch('http://localhost:8080/user/refreshaccesstoken',{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({refreshToken:token})
      })
      const users = await response.json();
      // localStorage.setItem('token', users.data.refreshToken);
      return users.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json(); // Assuming the server returns user data
      return users.userDto; // Returning the users data to be handled by Redux
    } catch (error) {
      return rejectWithValue(error.message); // Returning error message if fetch fails
    }
  }
);


export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (update, { rejectWithValue }) => {
    
    try {
      const response = await fetch('http://localhost:8080/user/adduseraddress/'+update._id, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( update ),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const users = await response.json(); // Assuming the server returns user data
      return users.userDto;
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const signout = createAsyncThunk(
  'user/signout',
  async( token, {rejectWithValue})=>{

    try {
      const response = await fetch('http://localhost:8080/user/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      return response.data
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)

export const emailRequest = createAsyncThunk(
  'user/emailRequest',
  async( email, {rejectWithValue})=>{

    try {
      const response = await fetch('http://localhost:8080/user/reset-password-request', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( email ), 
      })
      
      // return response
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)


export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async( data, {rejectWithValue})=>{

    try {
      const response = await fetch('http://localhost:8080/user/reset-password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( data ), 
      })
      
      return response
    } catch (error) {
      rejectWithValue(error.message)
    }
  }
)
//afzaaladi48@gmail.com