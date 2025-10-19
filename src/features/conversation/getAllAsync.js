import { createAsyncThunk } from '@reduxjs/toolkit';
import conversationService from '../../services/conversation/conversation.service';

export const getConversations = createAsyncThunk(
  'conversation/getAll',
  async () => {
    const res = await conversationService.getConversations();
    return res;
  }
);
