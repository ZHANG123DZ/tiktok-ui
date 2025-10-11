import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  autoScroll: true,
};

const autoScrollSlice = createSlice({
  name: 'autoScroll',
  initialState,
  reducers: {
    toggleScroll: (state) => {
      state.autoScroll = !state.autoScroll;
    },
  },
});

export const { toggleScroll } = autoScrollSlice.actions;
export default autoScrollSlice.reducer;
