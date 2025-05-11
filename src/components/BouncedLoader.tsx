import { HTMLAttributes } from 'react';
import { mergeClasses } from '../utils/tailwind.util';

interface BouncedLoaderProps extends HTMLAttributes<HTMLDivElement> {}
function BouncedLoader({ ...props }: BouncedLoaderProps) {
  return (
    <div
      className={mergeClasses(
        'gap-2 h-3 z-50 flex items-center',
        props.className
      )}
      role="status"
      aria-label="טוען"
    >
      <span className="w-1 h-2 bg-gray-300 animate-[bounce_1s_infinite_ease-in-out] rounded-full" />
      <span className="w-1 h-3 bg-gray-300 animate-[bounce_1s_infinite_ease-in-out_0.2s] rounded-full" />
      <span className="w-1 h-2 bg-gray-300 animate-[bounce_1s_infinite_ease-in-out_0.4s] rounded-full" />
    </div>
  );
}

export default BouncedLoader;
