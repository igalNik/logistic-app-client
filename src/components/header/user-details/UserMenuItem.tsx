import Icon from '../../Icon';

interface UserMenuItemProps {
  text: string;
  iconName: string;
  onClick: () => void;
}

function UserMenuItem({ text, iconName, onClick }: UserMenuItemProps) {
  return (
    <div className="gap-2 rounded px-2 py-0.5 hover:bg-stone-100 flex w-full cursor-pointer items-center justify-start transition-colors duration-200">
      <span className="max-h-xs max-w-xs" onClick={() => onClick()}>
        <Icon name={iconName} options={{ fontSize: '18px' }} />
      </span>
      <span className={`text-sm`}>{text}</span>
    </div>
  );
}

export default UserMenuItem;
