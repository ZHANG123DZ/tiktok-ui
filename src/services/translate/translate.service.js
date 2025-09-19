import httpRequest from '../../utils/httpRequest';

export const translate = async (content) => {
  try {
    const res = await httpRequest.post(`/translate`, { content });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export default {
  translate,
};
