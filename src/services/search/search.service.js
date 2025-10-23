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
  try {
    const res = await httpRequest.post(`/search/suggestion`, { query: query });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export const history = async () => {
  try {
    const res = await httpRequest.get(`/search/history`);
    return res.data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
};

export const createSearch = async (keyword) => {
  try {
    const res = await httpRequest.post(`/search`, { keyword });
    return res.data;
  } catch (error) {
    console.error('Failed to create search:', error);
    return null;
  }
};

// export const updateSearch = async (id, keyword) => {
//   try {
//     const res = await httpRequest.put(`/search/${id}`, { keyword });
//     return res.data;
//   } catch (error) {
//     console.error('Failed to update search:', error);
//     return null;
//   }
// };

export const deleteSearch = async (id) => {
  try {
    const res = await httpRequest.del(`/search/${id}`);
    return res.data;
  } catch (error) {
    console.error('Failed to delete search:', error);
    return null;
  }
};

export const clearAll = async () => {
  try {
    const res = await httpRequest.del(`/search`);
    return res.data;
  } catch (error) {
    console.error('Failed to delete search:', error);
    return null;
  }
};

export default {
  search,
  suggestion,
  history,
  createSearch,
  deleteSearch,
  clearAll,
};
