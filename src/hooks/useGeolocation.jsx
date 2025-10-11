import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: 'Trình duyệt không hỗ trợ Geolocation',
      }));
      return;
    }

    const geoSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const geoError = (error) => {
      let message = '';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = 'Bạn đã từ chối truy cập vị trí.';
          break;
        case error.POSITION_UNAVAILABLE:
          message = 'Không thể xác định vị trí.';
          break;
        case error.TIMEOUT:
          message = 'Yêu cầu vị trí quá thời gian cho phép.';
          break;
        default:
          message = 'Đã xảy ra lỗi không xác định.';
      }

      setLocation((prev) => ({
        ...prev,
        error: message,
      }));
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  return location;
};

export default useGeolocation;
