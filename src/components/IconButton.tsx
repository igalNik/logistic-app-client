import { HTMLAttributes } from 'react';
import { mergeClasses } from '../utils/tailwind.util';
import Icon from './Icon';

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  iconName: string;
  onClick: () => void;
}

function IconButton({ iconName, onClick, ...props }: IconButtonProps) {
  return (
    <div
      onClick={onClick}
      className={mergeClasses(
        'hover:bg-gray-300/50 active:bg-gray-300/20 p-1 ease-in-out flex-1 cursor-pointer rounded-full transition-all transition-discrete duration-100 active:scale-110',
        props.className
      )}
    >
      <Icon name={iconName}></Icon>
    </div>
  );
}

export default IconButton;
