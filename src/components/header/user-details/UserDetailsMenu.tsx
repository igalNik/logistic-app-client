import { RefObject } from 'react';
import UserMenuItem from './UserMenuItem';
import BlankCard from '../../BlankCard';

export interface UserDetailsMenuProps {
  ref: RefObject<HTMLDivElement | null>;
}

function UserDetailsMenu() {
  return (
    <div className="left-0 absolute">
      <BlankCard className="py-3 px-2">
        <div className="text-sm text-bg-sidebar-alt">
          {userMenuItems.map((item, index) => (
            <UserMenuItem
              text={item.text}
              iconName={item.iconName}
              onClick={() => {}}
              key={`${item.text}-${index}`}
            />
          ))}
        </div>
      </BlankCard>
    </div>
  );
}

export default UserDetailsMenu;

interface UserMenuItem {
  text: string;
  iconName: string;
}

const userMenuItems: UserMenuItem[] = [
  {
    text: 'פרופיל',
    iconName: 'Profile',
  },
  {
    text: 'התנתק',
    iconName: 'Logout',
  },
];
