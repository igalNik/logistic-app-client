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
      const handleFocusOut = () => {
        if (
          ref.current &&
          !ref.current.contains(document.activeElement as Node)
        ) {
          callback();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keyup', handleFocusOut);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keyup', handleFocusOut);
      };
    },
    [ref, callback]
  );
}

export default useClickOutside;
