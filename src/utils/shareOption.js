export const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href
  )}`;
  window.open(url, '_blank');
};

export const shareToTwitter = () => {
  const text = encodeURIComponent('Check out this awesome content!');
  const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
    window.location.href
  )}`;
  window.open(url, '_blank');
};
export const shareToTelegram = () => {
  const url = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}`;
  window.open(url, '_blank');
};

export const shareToWhatsApp = () => {
  const message = encodeURIComponent(`${window.location.href}`);
  const url = `https://wa.me/?text=${message}`;
  window.open(url, '_blank');
};
