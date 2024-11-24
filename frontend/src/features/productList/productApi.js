import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/products/allproduct');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.fetchProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const sortProducts = createAsyncThunk(
  'products/sortProducts',
  async (sort, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/products/allproduct?sort=${sort}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.fetchProduct;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const filterProducts = createAsyncThunk(
  'products/filterProducts',
  async (filter, { rejectWithValue }) => {
    console.log(filter);
    let url = `http://localhost:8080/products/allCategories?category=${filter}`;
    
    if (filter === "all") {
      url = `http://localhost:8080/products/allCategories`;
    }


    try {
      if (!filter || typeof filter !== 'string') {
        throw new Error('Invalid filter parameter');
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      return data.fetchByCategory; // Adjust this line if the actual field name is different
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getAllCategories = createAsyncThunk(
  'products/getAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/products/getAllcategories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.categories;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllBrands = createAsyncThunk(
  'products/getAllBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/products/fetchallhbrand');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.brand;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {

      const response = await fetch(`http://localhost:8080/products/fetchProductById/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      return data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/editProduct',
  async (product, {rejectWithValue})=> {
   try {
    const response = await fetch('http://localhost:8080/products/editProduct',{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (response.ok) {
      alert('Successfully updated')
    }
   } catch (error) {
     rejectWithValue(error)
   }
  }
)