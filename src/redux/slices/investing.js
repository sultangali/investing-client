import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchAll = createAsyncThunk(
  "auth/fetchAll",
  async () => {
    const { data } = await axios.get(`/api/investing/all-products`);
    return data;
  }
)

const initialState = {
  items: [],
  data: null,
  status: 'idle',
  error: null,
  isLoaded: false
}

const slice = createSlice({
  name: "investing",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.items = action.payload;
        state.isLoaded = true;
      })
      .addCase(fetchAll.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      })
  }
});

export const investingReducer = slice.reducer;
