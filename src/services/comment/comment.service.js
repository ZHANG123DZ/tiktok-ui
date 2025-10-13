import httpRequest from '../../utils/httpRequest';

export const createComment = async (slug, data) => {
  try {
    const res = await httpRequest.post(`/posts/${slug}/comments`, data);
    return res.data;
  } catch (err) {
    console.error('Failed to create comment:', err);
    throw err;
  }
};

export const updateComment = async (slug, id, data) => {
  try {
    const res = await httpRequest.patch(`/posts/${slug}/comments/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Failed to update comment:', error);
  }
};

export const deleteComment = async (slug, id) => {
  try {
    const res = await httpRequest.del(`/posts/${slug}/comments/${id}`);
    return res;
  } catch (error) {
    console.error('Failed to delete comment:', error);
  }
};

export const getCommentsByPostId = async (slug) => {
  try {
    const res = await httpRequest.get(`/posts/${slug}/comments`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    throw error;
  }
};

export default {
  createComment,
  updateComment,
  getCommentsByPostId,
  deleteComment,
};
