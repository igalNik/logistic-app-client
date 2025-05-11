import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  memo,
  MouseEventHandler,
} from 'react';
import Icon from './Icon';
import { mergeClasses } from '../utils/tailwind.util';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  id?: string | undefined;
  iconName?: string | undefined;
  clearButton?: boolean | undefined;
  onInputChange?: (value: string) => void;
  onClear?: () => void;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function (
    {
      label,
      id,
      iconName,
      onInputChange,
      clearButton = false,
      onClear = undefined,
      ...props
    },
    ref
  ) {
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (onInputChange) onInputChange(event.target.value);
    };

    const handleClear: MouseEventHandler<HTMLDivElement> = function () {
      if (onClear !== undefined) onClear();
    };

    return (
      <div className="flex flex-col">
        {label?.length && (
          <label htmlFor={id?.length ? id : ''}>{label.length && label}</label>
        )}
        <div className="relative">
          {iconName && (
            <div className="inset-y-0 ps-3.5 text-gray-500 pointer-events-none absolute flex items-center focus:ring-0">
              <Icon name={iconName} />
            </div>
          )}

          <input
            ref={ref}
            type="text"
            {...props}
            id={id}
            onInput={handleInputChange}
            className={mergeClasses(
              'rounded-lg bg-gray-50 text-md border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-400 w-full border-1 focus:ring-2 focus:outline-none',
              `${iconName ? 'ps-11' : ''}`
            )}
          />
          {clearButton && (
            <div
              className={`inset-y-0 ps-3.5 text-gray-500 left-1 absolute flex cursor-pointer items-center focus:ring-0`}
              onClick={handleClear}
            >
              <Icon name={'Close'} />
            </div>
          )}
        </div>
      </div>
    );
  })
);

export default Input;
