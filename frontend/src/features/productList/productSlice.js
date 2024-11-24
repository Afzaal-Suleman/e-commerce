import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts,sortProducts, filterProducts, getAllCategories, getAllBrands, fetchProductById, updateProduct } from "./productApi";
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        categories: [],
        brands: [],
        selectedProduct:[],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(sortProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(sortProducts.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(filterProducts.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.brands = action.payload;
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedProduct = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            });
    },
   
});
// export const allCategories = (state)=> state.products.categories
export default productsSlice.reducer;
