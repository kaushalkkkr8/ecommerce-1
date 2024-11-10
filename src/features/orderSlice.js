import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api="https://major-project1-backend.vercel.app"
// const api="http://localhost:5000"
export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  const res = await axios.get(`${api}/order`);

  return res.data;
});

export const postOrder = createAsyncThunk("order/postOrder", async (newOrder) => {

  
  const res = await axios.post(`${api}/order`, newOrder);

  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: [],
    status: "idle",
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
      
        state.status = "success";
        state.order = action.payload;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default orderSlice.reducer;
