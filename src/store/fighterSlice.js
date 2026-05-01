import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ufcApi } from '../services/api';

export const fetchFighters = createAsyncThunk(
  'fighters/fetchFighters',
  async (_, { rejectWithValue }) => {
    try {
      let allFighters = [];
      let from = 0;
      let to = 999;
      let hasMore = true;

      // We loop because Supabase hard-caps requests at 1000 rows
      while (hasMore) {
        const response = await ufcApi.get('/fighters?select=*&order=Fighter_Name.asc', {
          headers: { 'Range': `${from}-${to}` }
        });

        const batch = response.data.map(row => ({
          id: row.Fighter_URL?.split('/').pop() || Math.random().toString(),
          name: row.Fighter_Name || 'Unknown',
          weightClass: row.Weight || 'Unknown',
          wins: row.Wins ?? 0,
          losses: row.Losses ?? 0,
          draws: row.Draws ?? 0,
          stance: row.Stance || 'Unknown',
          slpm: row.SLpM || 0,
          strAcc: parseFloat(row.Str_Acc) || 0,
          strDef: parseFloat(row.Str_Def) || 0,
          tdAvg: row.TD_Avg || 0,
          tdAcc: parseFloat(row.TD_Acc) || 0,
          tdDef: parseFloat(row.TD_Def) || 0,
          subAvg: row.Sub_Avg || 0
        }));

        allFighters = [...allFighters, ...batch];

        // If we got less than 1000, we reached the end of the CSV
        if (response.data.length < 1000) {
          hasMore = false;
        } else {
          from += 1000;
          to += 1000;
        }
      }

      return allFighters;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const fighterSlice = createSlice({
  name: 'fighters',
  initialState: { data: [], status: 'idle', count: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFighters.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchFighters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.count = action.payload.length;
      });
  },
});

export default fighterSlice.reducer;