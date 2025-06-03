// components/Tooltip.tsx
import { ReactNode } from 'react';
import Icon from './Icon';

interface TooltipProps {
  iconName: string;
  children: ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

const Tooltip: React.FC<TooltipProps> = ({
  type = 'info',
  iconName,
  children,
}) => {
  return (
    <div className="group fixed inline-block">
      <Icon name={iconName} options={{ color: 'red' }}></Icon>
      <div className="mb-2 right-0 absolute bottom-full z-10 hidden group-focus-within:block group-hover:block">
        <div className="bg-white text-white text-xs rounded py-1 px-2 shadow-md border-gray-200 z-50 border-[1px] whitespace-nowrap">
          {children}
        </div>
        <div className="w-2 h-2 shadow-md bg-white -mt-1 border-b-gray-200 border-r-gray-200 right-2 absolute z-20 mx-auto rotate-45 border-r-[1px] border-b-[2px]" />
      </div>
    </div>
  );
};

export default Tooltip;
