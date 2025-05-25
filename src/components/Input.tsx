import {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  memo,
  MouseEventHandler,
  useCallback,
} from 'react';
import Icon from './Icon';
import { mergeClasses } from '../utils/tailwind.util';
import Tooltip from './Tooltip';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  id?: string | undefined;
  iconName?: string | undefined;
  clearButton?: boolean | undefined;
  onClear?: () => void;
  errorMessages?: string[];
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function (
    {
      label,
      id,
      value = '',
      iconName,
      clearButton = false,
      onClear = undefined,
      errorMessages,
      ...props
    },
    ref
  ) {
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        props.onChange?.(event);
      },
      [props]
    );

    const handleClear: MouseEventHandler<HTMLDivElement> = useCallback(() => {
      onClear?.();
    }, [onClear]);

    return (
      <div className="flex flex-col">
        {label?.length && (
          <label htmlFor={id?.length ? id : ''}>{label.length && label}</label>
        )}
        <div className="relative">
          {(iconName || (errorMessages && errorMessages?.length > 0)) && (
            <div className="inset-y-0 ps-3.5 text-gray-500 absolute z-50 flex items-center focus:ring-0">
              {errorMessages && errorMessages?.length > 0 ? (
                <Tooltip iconName="ErrorOutline" type="error">
                  {errorMessages.map((message) => (
                    <li
                      key={message}
                      id="department-id-error"
                      className="text-red-600 text-sm mt-1"
                      aria-live="polite"
                    >
                      {message}
                    </li>
                  ))}
                </Tooltip>
              ) : (
                <Icon name={iconName!} />
              )}
            </div>
          )}

          <input
            {...props}
            ref={ref}
            type="text"
            id={id}
            value={value}
            onChange={handleInputChange}
            className={mergeClasses(
              `rounded-lg bg-gray-50 text-md ${
                errorMessages && errorMessages?.length > 0
                  ? 'border-red-300'
                  : 'border-gray-300'
              } px-4 py-2 focus:border-blue-500 focus:ring-blue-400 w-full border-1 focus:ring-2 focus:outline-none`,
              `${iconName || (errorMessages && errorMessages?.length > 0) ? 'ps-11' : ''}`,
              props.className
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
