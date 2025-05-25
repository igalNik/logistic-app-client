import { HTMLAttributes } from 'react';
import { ComboBoxOption } from '../../types/comboBox.types';
import { mergeClasses } from '../../utils/tailwind.util';
import Icon from '../Icon';

interface comboBoxProps extends HTMLAttributes<HTMLLIElement> {
  option: ComboBoxOption;
  isSelected?: boolean;
  isHighlighted?: boolean;
  comboBoxSelect?: (option: ComboBoxOption) => void;
  setRef: (el: HTMLLIElement) => void;
}

function MenuItem({
  option,
  isSelected = false,
  isHighlighted = false,
  setRef,
  ...props
}: comboBoxProps) {
  return (
    <li
      onMouseEnter={props.onMouseEnter}
      onMouseMove={props.onMouseMove}
      ref={setRef}
      onClick={() => props.onClick}
      className={mergeClasses(
        `${isSelected ? 'bg-blue-100 border-blue-200 border-2' : ''}`,
        props.className,
        'py-2 px-4 rounded-lg gap-x-1 flex items-center hover:cursor-pointer',
        `px-4 py-2 ${
          isHighlighted ? 'bg-blue-500 border-gray-300 text-white' : ''
        }`
      )}
      {...props}
      value={option.id}
    >
      {option.icon && <Icon name={option.icon} className="text-gray-200" />}
      <span className="">{`${option.label}`}</span>
    </li>
  );
}

export default MenuItem;
