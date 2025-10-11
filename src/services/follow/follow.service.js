import httpRequest from '../../utils/httpRequest';

export const getFollowers = async (data) => {
  const res = await httpRequest.get(
    `/follows/followed-by/${data.type}/${data.followAbleId}`
  );
  return res.data;
};

export const getFollowing = async (data) => {
  const res = await httpRequest.get(
    `/follows/list/${data.type}/${data.userId}`
  );
  return res.data;
};

export const follow = async (data) => {
  const res = await httpRequest.post(
    `/follows/${data.type}/${data.followAbleId}`,
    data
  );
  return res.data;
};

export const unfollow = async (data) => {
  const res = await httpRequest.del(
    `/follows/${data.type}/${data.followAbleId}`
  );
  return res.data;
};

export const check = async (data) => {
  const res = await httpRequest.get(
    `/follows/check/${data.type}/${data.followAbleId}`
  );
  return res.data;
};
export default { getFollowers, getFollowing, follow, unfollow, check };
