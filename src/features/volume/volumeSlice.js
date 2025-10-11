import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  volume: 0.5,
  isMuted: true,
};

const volumeSlice = createSlice({
  name: 'volume',
  initialState,
  reducers: {
    setVolume: (state, action) => {
      state.volume = action.payload;
      state.isMuted = action.payload === 0;
    },
    setMuted: (state, action) => {
      state.isMuted = action.payload;
    },
    turnOffVolume: (state) => {
      state.volume = 0;
      state.isMuted = true;
    },
  },
});

export const { setVolume, turnOffVolume, setMuted } = volumeSlice.actions;
export default volumeSlice.reducer;
