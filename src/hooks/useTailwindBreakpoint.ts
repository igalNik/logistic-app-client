import { useEffect, useState, useCallback } from 'react';

type TailwindBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<TailwindBreakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function getBreakpoint(width: number): TailwindBreakpoint {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints['xl']) return 'xl';
  if (width >= breakpoints['lg']) return 'lg';
  if (width >= breakpoints['md']) return 'md';
  if (width >= breakpoints['sm']) return 'sm';
  return 'base';
}

export function useTailwindBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<TailwindBreakpoint>(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'base'
  );

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Returns true if 'base' or 'sm'
  const isMobile = useCallback(() => {
    return breakpoint === 'base' || breakpoint === 'sm';
  }, [breakpoint]);

  return { value: breakpoint, isMobile };
}
