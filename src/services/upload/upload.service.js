import httpRequest from '../../utils/httpRequest';

export const uploadSingleFile = async (data) => {
  try {
    const res = await httpRequest.post('/upload/upload-file', data, {
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
    const res = await httpRequest.post('/upload/upload-multi-file', data, {
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
    const res = await httpRequest.patch('/upload/replace', data, {
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

export const deleteFile = async (data) => {
  try {
    const res = await httpRequest.del(`/upload/delete/${data.url}`, data, {
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
  deleteFile,
  replace,
};
