import { useState, Fragment } from 'react';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
import SideNavHeader from './SideNavHeader';
import SideNavSection from './SideNavSection';
import SideNaveSeparator from './SideNaveSeparator';
import SideNavItem from './SideNavItem';
import { sideNavData } from './sideNavData';
import { SideNavItemData, SideNavSectionData } from './types';

interface SideNavProps {
  expend: boolean;
}

function SideNav({ expend = true }: SideNavProps) {
  //   const [screenSize, isScreenAbove] = useScreenSize();

  const [showItemsLabels, setShowItemsLabels] = useState(expend);

  return (
    <nav className="text-white/[.8] flex h-full w-full flex-col justify-center">
      <SideNavHeader
        showContent={showItemsLabels}
        onArrowClick={() => setShowItemsLabels((prev) => !prev)}
      >
        {showItemsLabels && <ParaglidingIcon color="inherit" />}
      </SideNavHeader>
      <ul className="px-2 py-2 bg-sidebar-gradient flex h-full flex-col">
        {sideNavData.map((section: SideNavSectionData, index) => (
          <Fragment key={section.id}>
            <SideNavSection showTitle={showItemsLabels} title={section.title}>
              {section.items.map((item: SideNavItemData) => (
                <SideNavItem
                  text={item.text}
                  iconName={item.iconName}
                  showLabel={showItemsLabels}
                  navTo={item.navTo}
                  key={item.id}
                />
              ))}
            </SideNavSection>
            {showItemsLabels && (
              <SideNaveSeparator
                key={`${section.title}-separator-${section.id}`}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
}
export default SideNav;
