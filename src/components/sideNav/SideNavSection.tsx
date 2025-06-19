import { ReactNode } from 'react';

interface SideNavSectionProps {
  title: string;
  showTitle: boolean;
  children: ReactNode;
}

function SideNavSection({ title, showTitle, children }: SideNavSectionProps) {
  return (
    <div>
      {showTitle && (
        <div className={`font-semibold pb-2 text-white/[.6] uppercase`}>
          {title}
        </div>
      )}
      <ul>{children}</ul>
    </div>
  );
}

export default SideNavSection;
