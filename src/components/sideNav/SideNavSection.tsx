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
        <div className={`pb-2 text-sm font-medium text-white/[.6] uppercase`}>
          {title}
        </div>
      )}
      <ul>{children}</ul>
    </div>
  );
}

export default SideNavSection;
