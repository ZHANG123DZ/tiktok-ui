import { toast } from 'react-toastify';

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Copied', { closeButton: true });
  } catch (err) {
    toast.error('Copy error', { closeButton: true });
  }
};

export default handleCopy;
