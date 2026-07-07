import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { redirectMap } from '../../utils/redirectMap';

const RedirectHandler = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if the current path exists in the redirect map (exact match or with trailing slash)
    const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' ? currentPath : currentPath + '/';
    const alternativePath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;

    const matchedRedirect = redirectMap[currentPath] || redirectMap[normalizedPath] || redirectMap[alternativePath];

    if (matchedRedirect) {
      // If we found a redirect target, navigate to it, preserving search parameters
      navigate(`${matchedRedirect}${location.search}`, { replace: true });
    }
  }, [location, navigate]);

  return <>{children}</>;
};

export default RedirectHandler;
