import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api="https://major-project1-backend.vercel.app"
// const api="http://localhost:5000"
export const postAddress = createAsyncThunk("address/postAddress", async (address) => {

  
  const res = await axios.post(`${api}/address`,  address );

  return res.data;
});
export const fetchaddress = createAsyncThunk("address/fetchaddress", async () => {
  const res = await axios.get(`${api}/address`);

  return res.data;
});

export const deleteAddress = createAsyncThunk("address/deleteaddress", async (id) => {
  const res = await axios.delete(`${api}/address/${id}`);

  return res.data;
});
const addressSlice = createSlice({
  name: "Address",
  initialState: {
    address: [],
    status: "idle",
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchaddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchaddress.fulfilled, (state, action) => {
        state.status = "success";

        state.address = action.payload.address;
      })
      .addCase(fetchaddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAddress.fulfilled, (state, action) => {

        state.status = "success";
        state.address = Array.isArray(state.address) ? [...state.address, action.payload.address] : [action.payload.address];
      })
      .addCase(postAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {

        state.status = "success";
        state.address = state.address.filter((add) => add._id != action.payload.id);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default addressSlice.reducer;
