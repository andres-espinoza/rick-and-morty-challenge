import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

const useScrollReset = (page: number): null => {
  // const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return null;
};

export default useScrollReset;
