import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ufcApi } from '../services/api';

export const fetchFighters = createAsyncThunk(
  'fighters/fetchFighters',
  async (_, { rejectWithValue }) => {
    try {
      let allFighters = [];
      let from = 0;
      let hasMore = true;

      while (hasMore) {
        const response = await ufcApi.get('/fighters?select=*', {
          headers: { 'Range': `${from}-${from + 999}` }
        });

        const batch = response.data.map(row => {
          const name = row.Fighter_Name || 'Unknown';
          // Generate a URL-friendly slug for real images (e.g., "Conor McGregor" -> "conor-mcgregor")
          const imageSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
          
          return {
            id: row.Fighter_URL?.split('/').pop() || Math.random().toString(),
            name: name,
            image: `https://dmxg5wxfqgb4u.cloudfront.net/styles/f_authors_headshot/s3/image-root/${imageSlug}__headshot.png`,
            weightClass: row.Weight || 'Unknown',
            wins: row.Wins ?? 0,
            losses: row.Losses ?? 0,
            draws: row.Draws ?? 0,
            stance: row.Stance || 'Unknown',
            slpm: row.SLpM || 0,
            strAcc: parseFloat(row.Str_Acc) || 0,
            tdAvg: row.TD_Avg || 0,
            tdDef: parseFloat(row.TD_Def) || 0
          };
        });

        allFighters = [...allFighters, ...batch];
        if (response.data.length < 1000) hasMore = false;
        else from += 1000;
      }
      // Filter out 'ghost' fighters to keep only the actual roster
      return allFighters.filter(f => f.wins + f.losses > 0);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fighterSlice = createSlice({
  name: 'fighters',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFighters.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchFighters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      });
  },
});

export default fighterSlice.reducer;