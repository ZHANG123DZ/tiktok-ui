import httpRequest from '@/utils/httpRequest';

export const getAllNotification = async () => {
  try {
    const res = httpRequest.get('/notifications');
    return res;
  } catch (err) {
    console.error('Failed to get notifications:', err);
    throw err;
  }
};

export const getAllNotifyByType = async (type) => {
  try {
    const res = httpRequest.get(`/notifications/${type}`);
    return res;
  } catch (err) {
    console.error('Failed to get notifications:', err);
    throw err;
  }
};

export const update = async (notificationId, data) => {
  try {
    const res = httpRequest.patch(`/notifications/${notificationId}`, data);
    return res;
  } catch (err) {
    console.error('Failed to get notifications:', err);
    throw err;
  }
};

export const readAll = async () => {
  try {
    const res = httpRequest.patch(`/notifications/read-all`, {});
    return res;
  } catch (err) {
    console.error('Failed to get notifications:', err);
    throw err;
  }
};

export default {
  getAllNotification,
  getAllNotifyByType,
  update,
  readAll,
};
