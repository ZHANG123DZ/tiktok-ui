import httpRequest from '../../utils/httpRequest';

export const getUser = async (userName) => {
  const res = await httpRequest.get(`/users/${userName}`);
  return res.data;
};

export const getUserPosts = async (userName) => {
  const res = await httpRequest.get(`/users/${userName}/posts`);
  return res.data;
};

export const getIntroUsers = async (page, limit) => {
  const res = await httpRequest.get(`/users/intro?page=${page}&limit=${limit}`);
  return res.data;
};

export const online = async (data) => {
  const res = await httpRequest.post(`/users/online`, data);
  return res;
};

export const offline = async (data) => {
  const res = await httpRequest.post(`/users/offline`, data);
  return res;
};

export const getUserStatus = async (userName) => {
  const res = await httpRequest.get(`/users/status/${userName}`);
  return res;
};

export default {
  getUser,
  getUserPosts,
  getIntroUsers,
  online,
  offline,
  getUserStatus,
};
