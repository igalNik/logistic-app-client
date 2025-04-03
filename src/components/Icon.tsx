import { Suspense, useRef } from 'react';
import Icons from './../utils/Icons';

interface IconOptions {
  fill?: string;
  className?: string;
  color?: string;
  fontSize?: string;
}

interface IIcon {
  name: string;
  options?: IconOptions;
  onClick?: () => void | undefined;
}

function Icon({ name, options = {}, onClick }: IIcon) {
  const fallbackEL = (
    <div className="w-6 h-6 border-gray-300 border-t-blue-500 animate-spin rounded-full border-4"></div>
  );

  const Icon = useRef(Icons[name as keyof typeof Icons]).current;

  return (
    <Suspense fallback={fallbackEL}>
      <Icon sx={options} className={options.className} onClick={onClick} />
    </Suspense>
  );
}

export default Icon;
