import { ReactNode } from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClick: any;
  children: ReactNode;
}

const Overlay = ({ isOpen, onClick, children }: OverlayProps) => {
  return (
    <div className="h-full">
      <div
        onClick={onClick}
        className={`${isOpen ? 'block' : 'hidden'} bg-bg-sidebar inset-0 bg-opacity-50 blur-sm fixed z-10`}
      ></div>
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

export default Overlay;
