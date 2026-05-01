import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ufcApi } from '../services/api';

export const fetchFighters = createAsyncThunk(
  'fighters/fetchFighters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ufcApi.get('/fighters?select=*');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const fighterSlice = createSlice({
  name: 'fighters',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFighters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFighters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFighters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default fighterSlice.reducer;