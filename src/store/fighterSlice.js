import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ufcApi } from '../services/api';

export const fetchFighters = createAsyncThunk(
  'fighters/fetchFighters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ufcApi.get('/fighters?select=*');
      const normalizedData = response.data.map(row => ({
        id: row.id || row.fighter_id || Math.random().toString(),
        name: row.name || row.fighter_name || row.Fighter || 'Unknown Fighter',
        nickname: row.nickname || row.nick_name || '',
        weightClass: row.weight_class || row.weightClass || row.WeightClass || 'Unknown',
        rank: row.rank !== undefined ? row.rank : null,
        countryFlag: row.country_flag || row.countryFlag || '🏳️',
        country: row.country || 'Unknown',
        wins: row.wins || row.w || row.Wins || (row.record?.w) || 0,
        losses: row.losses || row.l || row.Losses || (row.record?.l) || 0,
        draws: row.draws || row.d || row.Draws || (row.record?.d) || 0,
        winStreak: row.win_streak || row.winStreak || 0,
        stance: row.stance || row.Stance || 'Unknown',
        slpm: row.slpm || row.sig_str_landed_per_min || row.SLpM || 0,
        strAcc: row.str_acc || row.strAcc || row.Str_Acc || 0,
        strDef: row.str_def || row.strDef || row.Str_Def || 0,
        tdAvg: row.td_avg || row.tdAvg || row.TD_Avg || 0,
        tdDef: row.td_def || row.tdDef || row.TD_Def || 0,
        finishRate: row.finish_rate || row.finishRate || 0
      }));

      return normalizedData;
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