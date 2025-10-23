import httpRequest from '../../utils/httpRequest';

export const getReposts = async (userId) => {
  const res = await httpRequest.get(`/reposts/${userId}`);
  return res.data;
};

export const repost = async (postId) => {
  const res = await httpRequest.post(`/reposts`, { postId: postId });
  return res;
};

export const unrepost = async (id) => {
  const res = await httpRequest.del(`/reposts/${id}`);
  return res;
};

export default { getReposts, repost, unrepost };
