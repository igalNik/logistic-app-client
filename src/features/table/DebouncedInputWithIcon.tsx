import { useRef, useState, useEffect } from 'react';
import Icon from '../../components/Icon';
export interface DebouncedInputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onTextChange: (value: string) => void;
  debounce: number;
  iconName: string;
}
function DebouncedInputWithIcon({
  value: initialValue,
  onTextChange,
  debounce = 0,
  iconName,
  ...props
}: DebouncedInputWithIconProps) {
  const [value, setValue] = useState(initialValue);
  // prettier-ignore
  const containerEl = useRef<HTMLDivElement | null>(null);
  const inputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!debounce) {
      onTextChange(value);
      return;
    }
    const timeout = setTimeout(() => {
      onTextChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (containerEl.current?.contains(event.target as Node))
      inputEl.current?.focus();
  }
  console.log(props.className);

  return (
    <div
      ref={containerEl}
      onClick={handleClick}
      className="rounded border-header-border-color bg-white text-bg-sidebar-alt border-[1px] border-solid focus-within:ring focus-within:outline-none"
    >
      <Icon name={iconName} />
      <input
        {...props}
        ref={inputEl}
        id="search"
        type="text"
        className={'p-2 focus:outline-none'}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default DebouncedInputWithIcon;
