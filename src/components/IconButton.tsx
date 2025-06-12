import { HTMLAttributes } from 'react';
import { mergeClasses } from '../utils/tailwind.util';
import Icon, { IconOptions } from './Icon';

interface IconButtonProps extends HTMLAttributes<HTMLDivElement> {
  iconName: string;
  onClick: () => void;
  iconOptions?: IconOptions;
}

function IconButton({
  iconName,
  onClick,
  iconOptions,
  ...props
}: IconButtonProps) {
  return (
    <div
      onClick={onClick}
      className={mergeClasses(
        'hover:bg-gray-300/50 active:bg-gray-300/20 p-1 ease-in-out flex-1 cursor-pointer rounded-full transition-all transition-discrete duration-100 active:scale-110',
        props.className
      )}
    >
      <Icon name={iconName} options={iconOptions}></Icon>
    </div>
  );
}

export default IconButton;
