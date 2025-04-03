import { ReactNode, useState } from 'react';
import Icon from '../Icon';

export interface SideNavHeaderProps {
  showContent: boolean;
  onArrowClick: () => void;
  children: ReactNode;
}

// prettier-ignore
function SideNavHeader({ showContent, onArrowClick, children }: SideNavHeaderProps) {

  const [showChildren, setShowChildren] = useState(showContent);
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
        className={`gap-2 rounded-md bg-menuitem-hover px-1 py-1 hover:bg-bg-sidebar flex w-auto cursor-pointer items-center justify-start transition-colors duration-200`}
      >
        <Icon name={"ArrowRight"} options={{fontSize: '16px'}} onClick={handleRightClick}/>
        <Icon name={"ArrowLeft"} options={{fontSize: '16px'}}  onClick={handleLeftClick}/>
      </div>
      {showChildren && <span className="flex justify-start">{children}</span>}
    </header>
  );
}

export default SideNavHeader;
