import { RefObject, useEffect } from 'react';

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(
    function () {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);

      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    },
    [ref, callback]
  );
}

export default useClickOutside;
