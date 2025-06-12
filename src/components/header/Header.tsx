import { ReactNode } from 'react';
import UserDetails from './user-details/UserDetails';
import { useTailwindBreakpoint } from '../../hooks/useTailwindBreakpoint';

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="h-12 gap-4 border-menu-section border-b-header-border-color bg-white px-4 flex items-center justify-between border-b">
      {children}
      <UserDetails />
    </header>
  );
}

export default Header;
