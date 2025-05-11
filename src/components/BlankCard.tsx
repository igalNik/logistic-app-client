import { HTMLAttributes, ReactNode } from 'react';

interface BlankCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
function BlankCard({ children, ...props }: BlankCardProps) {
  const { className } = props;

  delete props.className;

  return (
    <div
      className={`bg-white rounded-lg shadow-md w-max-[98%] h-full min-h-full w-full ${className ? className : ''}`}
    >
      {children}
    </div>
  );
}

export default BlankCard;
