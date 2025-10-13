import store from '../store/store';

function formatRelativeTime(inputTime, t) {
  const state = store.getState();
  const language = state.language.language;

  const now = new Date();
  const givenTime = new Date(inputTime);

  const diffInSeconds = Math.floor((now - givenTime) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInYears = Math.floor(diffInWeeks / 12);

  if (diffInSeconds < 60) {
    return 'bây giờ';
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }

  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }

  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }

  if (diffInWeeks < 4) {
    return `${diffInWeeks} tuần trước`;
  }

  const day = givenTime.getDate().toString().padStart(2, '0');
  const month = (givenTime.getMonth() + 1).toString().padStart(2, '0');
  const year = givenTime.getFullYear();
  if (diffInYears == 0) return `${month}-${day}`;
  return `${year}-${month}-${day}`;
}

export default formatRelativeTime;
