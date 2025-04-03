import Icon from './Icon';

interface ButtonWithIconProps {
  text: string;
  iconName?: string;
  onClick?: () => void;
}

function ButtonWithIcon({ text, iconName, onClick }: ButtonWithIconProps) {
  return (
    <button
      onClick={onClick}
      className="group gap-1 rounded border-header-border-color p-2 text-bg-sidebar-alt relative flex border-[1px] border-solid focus-within:ring focus-within:outline-none"
    >
      <span className="relative z-10">{text}</span>
      {iconName && (
        <span className="relative z-10">
          <Icon name={iconName} />
        </span>
      )}
      <span className="right-0 top-0 h-0 w-0 from-slate-100 to-white ease-in-out absolute mx-auto bg-gradient-to-r transition-all duration-100 group-active:h-full group-active:w-full" />
    </button>
  );
}

export default ButtonWithIcon;
