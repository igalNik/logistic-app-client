import { ReactNode } from 'react';
import { useTailwindBreakpoint } from '../hooks/useTailwindBreakpoint';

interface OverlayProps {
  isOpen: boolean;
  onClick: any;
  children: ReactNode;
}

const Overlay = ({ isOpen, onClick, children }: OverlayProps) => {
  const breakPoint = useTailwindBreakpoint();

  return (
    <div className="h-screen w-full">
      <div
        onClick={onClick}
        className={`bg-slate-900 top-0 blur-sm z-10 ${isOpen ? '' : 'hidden'} fixed mx-auto h-screen w-screen items-center justify-center opacity-20`}
      ></div>
      <div className={`${breakPoint.isMobile() ? 'absolute' : ''} z-20 h-full`}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
