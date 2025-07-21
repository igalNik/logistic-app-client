import { useRef, useState } from 'react';
import Icon from '../../Icon';
import UserDetailsMenu from './UserDetailsMenu';
import useClickOutside from '../../../hooks/useClickOutside';

import { useMe } from './../../../api/queries';

function UserDetails() {
  const [showMenu, setShowMenu] = useState(false);

  const { data: user } = useMe();

  const userDetailsElement = useRef(null);

  useClickOutside(userDetailsElement, () => setShowMenu(false));

  function handleUserDetailsClick() {
    setShowMenu((prev) => !prev);
  }

  if (!user) return;
  return (
    <div ref={userDetailsElement}>
      <div
        onClick={handleUserDetailsClick}
        className="gap-1 rounded px-2 py-1 hover:bg-stone-100 flex cursor-pointer items-center justify-center"
      >
        <span>
          <Icon
            name={'User'}
            options={{
              fontSize: '24px',
              color: 'inherit',
            }}
          />
        </span>
        <span>{user.fullName}</span>
      </div>

      {showMenu && <UserDetailsMenu />}
    </div>
  );
}

export default UserDetails;
