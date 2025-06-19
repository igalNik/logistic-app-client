import { ButtonHTMLAttributes, ReactNode } from 'react';
import { mergeClasses } from '../utils/tailwind.util';
import Icon, { IconOptions } from './Icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //   type?: 'primary' | 'secondary';
  iconName?: string;
  iconOptions?: IconOptions;
  children?: ReactNode | undefined;
}

function Button({ children, iconName, iconOptions, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={mergeClasses(
        'bg-gray-100 active:bg-blue-200 hover:bg-gray-200 rounded-md border-gray-300 px-4 py-2 focus:ring-blue-400 h-full min-w-fit flex-1 cursor-pointer border-1 transition focus:ring-2 focus:outline-none',
        props.className
      )}
    >
      <span className="gap-1 flex h-full items-center justify-center">
        {iconName && <Icon name={iconName} options={iconOptions} />}
        {children}
      </span>
    </button>
  );
}

export default Button;
