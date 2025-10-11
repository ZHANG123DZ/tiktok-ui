import { useEffect } from 'react';

const useSystemNotificationOnTabHidden = ({
  title = 'Bạn đã rời khỏi tab',
  body = 'Quay lại để tiếp tục sử dụng ứng dụng!',
  icon = '', // đường dẫn đến icon nếu có
  requirePermission = true,
}) => {
  useEffect(() => {
    // 1. Xin quyền thông báo nếu cần
    if (requirePermission && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // 2. Hàm xử lý khi tab thay đổi trạng thái
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (Notification.permission === 'granted') {
          new Notification(title, {
            body,
            icon,
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [title, body, icon, requirePermission]);
};

export default useSystemNotificationOnTabHidden;
