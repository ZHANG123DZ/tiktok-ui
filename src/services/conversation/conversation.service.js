import httpRequest from '@/utils/httpRequest';

export const createConversation = async (otherUserId, data = {}) => {
  try {
    const res = httpRequest.post('/conversations', {
      participantsId: otherUserId,
      ...data,
    });
    return res.data;
  } catch (err) {
    console.error('Failed to create conversation:', err);
    throw err;
  }
};

export const getOrCreateConversation = async (otherUserId) => {
  try {
    const res = await httpRequest.post('/conversations/get-or-create', {
      participantId: otherUserId,
    });
    return res.data;
  } catch (err) {
    console.error('Failed to get or create conversation:', err);
    throw err;
  }
};

export const getConversations = async () => {
  try {
    const res = await httpRequest.get('/conversations');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch conversations:', err);
    throw err;
  }
};

export const getConversationById = async (id) => {
  try {
    const res = await httpRequest.get(`/conversations/${id}`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch conversation:', err);
    throw err;
  }
};

export const updateConversation = async (id, data) => {
  try {
    const res = await httpRequest.put(`/conversations/${id}`, data);
    return res.data;
  } catch (err) {
    console.error('Failed to update conversation:', err);
    throw err;
  }
};

export const deleteConversation = async (id) => {
  try {
    const res = await httpRequest.delete(`/conversations/${id}`);
    return res.data;
  } catch (err) {
    console.error('Failed to delete conversation:', err);
    throw err;
  }
};

export const markedRead = async (id, data) => {
  try {
    const res = await httpRequest.patch(
      `/conversations/${id}/marked-read`,
      data
    );
    return res.data;
  } catch (err) {
    console.error('Failed to delete conversation:', err);
    throw err;
  }
};

export const joinGroup = async (id, data) => {
  try {
    const res = await httpRequest.post(`/conversations/${id}/join`, data);
    return res.data;
  } catch (err) {
    console.error('Failed to join group:', err);
    throw err;
  }
};

export const leaveGroup = async (id) => {
  try {
    const res = await httpRequest.del(`/conversations/${id}/leave`);
    return res.data;
  } catch (err) {
    console.error('Failed to leave group:', err);
    throw err;
  }
};

export const setStatus = async (id, status) => {
  try {
    const res = await httpRequest.post(`/conversations/${id}/status`, {
      status: status,
    });
    return res.data;
  } catch (err) {
    console.error('Failed to leave group:', err);
    throw err;
  }
};

export default {
  setStatus,
  createConversation,
  getOrCreateConversation,
  getConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
  markedRead,
  joinGroup,
  leaveGroup,
};
