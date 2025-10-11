import httpRequest from '../../utils/httpRequest';

export const getBookMarks = async (data) => {
  const res = await httpRequest.get(
    `/book-marks/book-marked-by/${data.type}/${data.bookMarkAbleId}`
  );
  return res;
};

export const getBookMarkedUserId = async (page, limit, data) => {
  const res = await httpRequest.get(
    `/book-marks/list/${data.type}/${data.userId}?page=${page}&limit=${limit}`
  );
  const bookMarks = res.data.map((bookmark) => ({
    ...bookmark,
    id: Number(bookmark.id),
    featuredImage: bookmark.thumbnail_url,
    readingTime: Number(bookmark.reading_time),
    publishedAt: bookmark.published_at,
    viewsCount: Number(bookmark.view_count),
    likesCount: Number(bookmark.like_count),
    commentsCount: Number(bookmark.comment_count),
    topics: bookmark.topics.map((topic) => topic.name),
    author: {
      name: bookmark.author.full_name,
      username: bookmark.author.username,
      avatar: bookmark.author.avatar_url,
    },
  }));
  res.data = bookMarks;
  return res;
};

export const bookmark = async (data) => {
  const res = await httpRequest.post(
    `/book-marks/${data.type}/${data.bookMarkAbleId}`,
    data
  );
  return res;
};

export const unBookMark = async (data) => {
  const res = await httpRequest.del(
    `/book-marks/${data.type}/${data.bookMarkAbleId}`
  );
  return res;
};

export const check = async (data) => {
  const res = await httpRequest.get(
    `/book-marks/check/${data.type}/${data.bookMarkAbleId}`
  );
  return res;
};

export const deleteAllBookMark = async (data) => {
  const res = await httpRequest.del(
    `/book-marks/delete-all/${data.type}/${data.user_id}`
  );
  return res;
};

export default {
  getBookMarks,
  getBookMarkedUserId,
  bookmark,
  unBookMark,
  check,
};
