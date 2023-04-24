import { useEffect, useRef } from 'react';

const useOutsideClick = (callback: () => any) => {
  const ref = useRef<Element | any>(null);
  const parentRef = useRef<Element | any>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const parent = parentRef.current ?? document;

    parent.addEventListener('click', handleClick, true);

    return () => {
      parent.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return {
    ref,
    parentRef,
  };
};

export default useOutsideClick;
