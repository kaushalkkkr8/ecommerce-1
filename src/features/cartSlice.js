import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const api = "https://major-project1-backend.vercel.app";
// const api="http://localhost:5000"
export const fetchCartItem = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axios.get(`${api}/cartData`);

  return res.data;
});

export const addToCart = createAsyncThunk("cart/postCart", async (newCartItem) => {
  const res = await axios.post(`${api}/cart`, newCartItem);

  return res.data;
});

export const deleteCartItem = createAsyncThunk("cart/deleteCart", async (id) => {
  const res = await axios.delete(`${api}/cart/${id}`);

  return id;
});
// export const cartItems=

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cart: [],
    cartStat: {
      totalItem: 0,
      totalAmount: 0,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    updateCartStat: (state, action) => {
      state.cartStat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartItem.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = action.payload;
    });
    builder.addCase(fetchCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(deleteCartItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.status = "success";
      state.cart = state.cart.filter((prod) => prod._id != action.payload);
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { updateCartStat } = cartSlice.actions;

export default cartSlice.reducer;
