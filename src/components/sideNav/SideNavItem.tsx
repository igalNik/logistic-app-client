import { NavLink } from 'react-router-dom';
import Icon from '../Icon';

interface SideNavItemProps {
  text: string;
  iconName: string;
  onClick?: () => void | undefined;
  showLabel: boolean;
  navTo: string;
}
function SideNavItem({
  text,
  iconName,
  onClick,
  showLabel = true,
  navTo,
}: SideNavItemProps) {
  return (
    <NavLink
      to={navTo}
      className={({ isActive }) =>
        `gap-2 rounded px-2 py-0.5 hover:bg-menuitem-hover flex w-auto cursor-pointer items-center justify-start transition-colors duration-200 ${isActive ? 'bg-menuitem-hover' : ''} `
      }
    >
      <span className="max-h-xs max-w-xs" onClick={onClick}>
        <Icon
          name={iconName}
          options={{
            fontSize: '18px',
            color: 'inherit',
          }}
        />
      </span>
      {showLabel && <span className={`text-sm`}>{text}</span>}
    </NavLink>
  );
}

export default SideNavItem;
