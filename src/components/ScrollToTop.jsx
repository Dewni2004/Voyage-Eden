import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // A small timeout ensures React has finished painting the new page
    // before we force the scroll to the top. This fixes mobile browsers
    // jumping to the footer on navigation.
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
