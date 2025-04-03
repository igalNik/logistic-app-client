import { RefObject } from 'react';
import BlankPage from '../../BlankPage';
import UserMenuItem from './UserMenuItem';

export interface UserDetailsMenuProps {
  ref: RefObject<HTMLDivElement | null>;
}

function UserDetailsMenu() {
  return (
    <div className="absolute">
      <BlankPage>
        <div className="m-2 text-sm text-bg-sidebar-alt">
          {userMenuItems.map((item, index) => (
            <UserMenuItem
              text={item.text}
              iconName={item.iconName}
              onClick={() => {}}
              key={`${item.text}-${index}`}
            />
          ))}
        </div>
      </BlankPage>
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
