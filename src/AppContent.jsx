import AppRoutes from './components/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routeTitleMap } from './configs/routeTitleMap';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    // Map path cứng hoặc parse dynamic route nếu cần
    if (path.startsWith('/@')) {
      const username = path.split('/')[1].split('@')[1];
      document.title = `TonyDang (@${username}) | TikTok`;
    } else {
      document.title = routeTitleMap[path] || 'Ứng dụng';
    }
  }, [location.pathname]);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default AppContent;
