import { HTMLAttributes } from 'react';
import { DropdownOption } from '../types/dropdown.types';
import { mergeClasses } from '../utils/tailwind.util';
import Icon from './Icon';

interface OptionProps extends HTMLAttributes<HTMLLIElement> {
  option: DropdownOption;
  isSelected?: boolean;
  isHighlighted?: boolean;
  onOptionSelect?: (option: DropdownOption) => void;
  setRef: (el: HTMLLIElement) => void;
}

function Option({
  option,
  isSelected = false,
  isHighlighted = false,
  setRef,
  ...props
}: OptionProps) {
  return (
    <li
      // onMouseEnter={props.onMouseEnter}
      // onMouseMove={props.onMouseMove}
      ref={setRef}
      // onClick={() => props.onClick}
      // aria-selected={props.state.selected?.label == option.label}
      className={mergeClasses(
        `${isSelected ? 'bg-blue-100 border-blue-200 border-2' : ''}`,
        props.className,
        'py-2 px-4 rounded-lg gap-x-1 flex items-center hover:cursor-pointer',
        `px-4 py-2 ${
          isHighlighted ? 'bg-blue-500 border-gray-300 text-white' : ''
        }`
      )}
      {...props}
    >
      {option.icon && <Icon name={option.icon} className="text-gray-200" />}
      <span className="">{`${option.label}`}</span>
    </li>
  );
}

export default Option;
