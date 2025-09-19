import httpRequest from '../../utils/httpRequest';

export const getTag = async (name) => {
  try {
    const res = await httpRequest.get(`/tags/${name}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export default {
  getTag,
};
