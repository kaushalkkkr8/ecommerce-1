import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api="https://major-project1-backend.vercel.app"
// const api="http://localhost:5000"
export const fetchProducts = createAsyncThunk("product/fetchProduct", async () => {
  const res = await axios.get(`${api}/prod`);

  return res.data;
});

export const updateProductWishlist = createAsyncThunk("product/updateProduct", async ({ id, updatedData }) => {
  const res = await axios.put(`${api}/prod/${id}`, updatedData);
 
  return res.data;
});

const productSlice = createSlice({
  name: "E-commerce",
  initialState: {
    products: [],
 
    status: "idle",
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateProductWishlist.fulfilled, (state, action) => {
      state.status = "success";
    
      
      const index = state.products.findIndex((product) => product._id === action.payload.products._id);
      if (index !== -1) {
        state.products[index] = action.payload.products; 
      }
    });
  },
});
export default productSlice.reducer;
