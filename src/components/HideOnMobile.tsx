import { ReactNode } from 'react';
import { mergeClasses } from '../utils/tailwind.util';

interface HideOnMobileProps {
  children: ReactNode;
  className?: string;
}

function HideOnMobile({ children, className }: HideOnMobileProps) {
  return (
    <div className={mergeClasses(className, 'md:block hidden')}>{children}</div>
  );
}

export default HideOnMobile;
