import { toast } from 'react-toastify';

const handleCopy = async ({ postId = null, authorUserName }) => {
  try {
    if (postId) {
      await navigator.clipboard.writeText(
        `${window.location.origin}/@${authorUserName}/video/${postId}`
      );
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }

    toast.success('Copied', { closeButton: true });
  } catch (err) {
    toast.error('Copy error', { closeButton: true });
  }
};

export default handleCopy;
