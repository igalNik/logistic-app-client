import { ReactNode, useState } from 'react';
import IconButton from '../IconButton';

export interface SideNavHeaderProps {
  showItemsLabels: boolean;
  onArrowClick: () => void;
  children: ReactNode;
}

// prettier-ignore
function SideNavHeader({ showItemsLabels, onArrowClick, children }: SideNavHeaderProps) {

  const [showChildren, setShowChildren] = useState(showItemsLabels);
  function handleLeftClick() {
    onArrowClick();
    setShowChildren(true);
  }
  function handleRightClick() {
    onArrowClick();
    setShowChildren(false);
  }
  return (
    <header
      className={`h-12 bg-bg-sidebar flex ${showChildren ? 'gap-2 justify-start' : 'justify-center'} border-menu-section px-2 py-3 items-center border-b`}
    >
      <div
        className={`gap-2 rounded-md bg-menuitem-hover px-1 py-1  hover:bg-bg-sidebar flex w-auto cursor-pointer items-center justify-start transition-colors duration-200`}
      >
        {showItemsLabels && <IconButton iconName={"ArrowRight"} iconOptions={{fontSize: '16px'}} onClick={handleRightClick} className='hover:bg-transparent'/>}
        {!showItemsLabels &&<IconButton iconName={"ArrowLeft"} iconOptions={{fontSize: '16px'}}  onClick={handleLeftClick} className='hover:bg-transparent'/>}
      </div>
      {showChildren && <span className="flex justify-start">{children}</span>}
    </header>
  );
}

export default SideNavHeader;
