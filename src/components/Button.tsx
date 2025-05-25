import { ButtonHTMLAttributes, ReactNode } from 'react';
import { mergeClasses } from '../utils/tailwind.util';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //   type?: 'primary' | 'secondary';
  children?: ReactNode | undefined;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={mergeClasses(
        props.className,
        'bg-gray-100 active:bg-blue-200 hover:bg-gray-200 rounded-md border-gray-300 px-4 py-2 focus:ring-blue-400 min-w-fit cursor-pointer border-1 transition focus:ring-2 focus:outline-none'
      )}
    >
      {children}
    </button>
  );
}

export default Button;
