import httpRequest from '../../utils/httpRequest';

export const uploadSingleFile = async (data) => {
  try {
    const res = await httpRequest.post('/media/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Tải lên thất bại:', err);
    throw err;
  }
};

export const uploadMultipleFiles = async (data) => {
  try {
    const res = await httpRequest.post('/media/upload-multi', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Tải file lên thất bại:', err);
    throw err;
  }
};

export const replace = async (data) => {
  try {
    const res = await httpRequest.patch('/media/replace', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (err) {
    console.error('Thay thế file thất bại:', err);
    throw err;
  }
};

export const deleteMedia = async (data) => {
  try {
    const res = await httpRequest.del('/media/delete', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  } catch (err) {
    console.error('Xóa file thất bại:', err);
    throw err;
  }
};

export default {
  uploadSingleFile,
  uploadMultipleFiles,
  deleteMedia,
  replace,
};
