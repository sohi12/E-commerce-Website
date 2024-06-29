import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    products: []
}

export let getProducts = createAsyncThunk('products/getProducts', async () => {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data.data
})

let productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, () => {

        });

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
        });

        builder.addCase(getProducts.rejected, (state, action) => {
            console.log(action.error);
        });
    }
})

export let productsReducer = productsSlice.reducer