import httpRequest from '../../utils/httpRequest';

export const getUser = async (userName) => {
  const res = await httpRequest.get(`/users/${userName}`);
  return res.data;
};

export const getUserPosts = async (userName) => {
  const res = await httpRequest.get(`/users/${userName}/posts`);
  return res.data;
};

export default { getUser, getUserPosts };
