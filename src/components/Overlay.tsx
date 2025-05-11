import { ReactNode } from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClick: any;
  children: ReactNode;
}

const Overlay = ({ isOpen, onClick, children }: OverlayProps) => {
  return (
    <div className="h-[50vh] w-full">
      <div
        onClick={onClick}
        className={`${isOpen ? 'block' : 'hidden'} bg-slate-900 blur-2xl bg-opacity-10 z-50 mx-auto items-center justify-center`}
      ></div>
      <div className="h- relative z-20">{children}</div>
    </div>
  );
};

export default Overlay;
