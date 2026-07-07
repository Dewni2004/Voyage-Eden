import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { redirectMap } from '../../utils/redirectMap';

const LANG_PREFIXES = ['fr', 'en', 'de', 'es', 'it'];

const RedirectHandler = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;

    // 1. Redirect /home (and /home/) to /
    if (currentPath === '/home' || currentPath === '/home/') {
      navigate('/' + location.search, { replace: true });
      return;
    }

    // 2. Strip language-code prefixes like /es/, /fr/, /de/, /en/, /it/
    //    e.g. /es/itinerarios → /itinerarios, /es/ → /
    const langPrefixMatch = currentPath.match(
      new RegExp(`^/(${LANG_PREFIXES.join('|')})(\/.*)?$`)
    );
    if (langPrefixMatch) {
      const remainder = langPrefixMatch[2] || '/';
      navigate(`${remainder}${location.search}`, { replace: true });
      return;
    }

    // 3. Check the static redirect map (exact match or with/without trailing slash)
    const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' ? currentPath : currentPath + '/';
    const alternativePath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;

    const matchedRedirect = redirectMap[currentPath] || redirectMap[normalizedPath] || redirectMap[alternativePath];

    if (matchedRedirect) {
      let finalRedirect = matchedRedirect;
      if (finalRedirect.startsWith('/blog/')) {
        finalRedirect = finalRedirect.substring(5);
      } else if (finalRedirect.startsWith('/itinerary/')) {
        finalRedirect = finalRedirect.substring(10);
      }
      navigate(`${finalRedirect}${location.search}`, { replace: true });
      return;
    }

    // Catch any direct visits to /blog/slug or /itinerary/slug and redirect to /slug
    if (currentPath.startsWith('/blog/')) {
      navigate(`${currentPath.substring(5)}${location.search}`, { replace: true });
      return;
    }
    if (currentPath.startsWith('/itinerary/')) {
      navigate(`${currentPath.substring(10)}${location.search}`, { replace: true });
      return;
    }
  }, [location, navigate]);

  return <>{children}</>;
};

export default RedirectHandler;

