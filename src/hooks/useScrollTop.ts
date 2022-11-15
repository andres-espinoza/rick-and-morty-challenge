import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollReset = (): null => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default useScrollReset;
