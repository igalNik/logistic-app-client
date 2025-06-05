import { HTMLAttributes, Suspense } from 'react';
import Icons from './../utils/Icons';

export interface IconOptions {
  fill?: string;
  className?: string;
  color?: string;
  fontSize?: string;
}

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  options?: IconOptions;
  onClick?: () => void | undefined;
}

function Icon({ name, options = {}, onClick, ...props }: IconProps) {
  const fallbackEL = (
    <div
      className="w-6 h-6 border-gray-300 border-t-blue-500 animate-spin rounded-full border-4"
      {...props}
    ></div>
  );

  const Icon = Icons[name as keyof typeof Icons];

  return (
    <Suspense fallback={fallbackEL}>
      <Icon sx={options} className={options.className} onClick={onClick} />
    </Suspense>
  );
}

export default Icon;
