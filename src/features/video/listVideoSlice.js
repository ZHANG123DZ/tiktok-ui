import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listVideo: [],
  prevUrl: '',
};

const listVideoSlice = createSlice({
  name: 'listVideo',
  initialState,
  reducers: {
    setListVideo: (state, action) => {
      state.listVideo = action.payload;
    },
    setPreUrl: (state, action) => {
      state.prevUrl = action.payload;
    },
  },
});

export const { setListVideo, setPreUrl } = listVideoSlice.actions;
export default listVideoSlice.reducer;
