import { createSlice } from '@reduxjs/toolkit';
import { getConversations } from './getAllAsync';

const initialState = {
  conversations: [],
  pendingConversations: [],
  selectedConversation: null,
  isLoading: false,
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setCurrentConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    //conversations/getAll
    builder
      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.accepted;
        state.pendingConversations = action.payload.pending;
        state.isLoading = false;
      })
      .addCase(getConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConversations.rejected, (state) => {
        state.conversations = [];
        state.pendingConversations = [];
        state.isLoading = false;
      });
  },
});

export const { setCurrentConversations, setSelectedConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
