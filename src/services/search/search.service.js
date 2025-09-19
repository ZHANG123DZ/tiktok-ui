import httpRequest from '../../utils/httpRequest';

export const search = async (query) => {
  const queryContent = encodeURIComponent(query);
  try {
    const res = await httpRequest.get(`/search?q=${queryContent}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export const suggestion = async (query) => {
  const queryContent = encodeURIComponent(query);
  try {
    const res = await httpRequest.get(`/search/suggestion?q=${queryContent}`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export default {
  search,
  suggestion,
};
