import httpRequest from '../../utils/httpRequest';

export const getMusic = async (id) => {
  try {
    const res = await httpRequest.get(`/musics/${id}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export default {
  getMusic,
};
