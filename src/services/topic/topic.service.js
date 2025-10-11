import httpRequest from '../../utils/httpRequest';

export const getAll = async () => {
  try {
    const res = await httpRequest.get(`/topics`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export const getTopic = async (name, page = 1, limit = 20) => {
  try {
    const res = await httpRequest.get(
      `/topics/${name}?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export default {
  getTopic,
  getAll,
};
