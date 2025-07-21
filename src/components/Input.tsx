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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined;
  id?: string | undefined;
  iconName?: string | undefined;
  clearButton?: boolean | undefined;
  onClear?: () => void;
  errorMessages?: string[];
  containerClassName?: string;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function (
    {
      label,
      id,
      value = '',
      iconName,
      clearButton,
      onClear,
      containerClassName = '',
      errorMessages,
      ...props
    },
    ref
  ) {
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        props.onChange?.(event);
      },
      [props.onChange]
    );

    const handleClear: MouseEventHandler<HTMLDivElement> = useCallback(() => {
      onClear?.();
    }, [onClear]);

    return (
      <div className={mergeClasses('flex flex-1 flex-col', containerClassName)}>
        {label && <label htmlFor={id}>{label}</label>}
        <div className="relative">
          {(iconName || (errorMessages && errorMessages?.length > 0)) && (
            <div className="inset-y-0 ps-3.5 text-gray-500 absolute flex items-center focus:ring-0">
              {errorMessages ? (
                <Tooltip iconName="ErrorOutline" type="error">
                  {errorMessages.map((message) => (
                    <li
                      key={message}
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
            type="text"
            {...props}
            ref={ref}
            id={id}
            value={value}
            onChange={handleInputChange}
            className={mergeClasses(
              `rounded-lg bg-gray-50 text-md ${
                errorMessages ? 'border-red-300' : 'border-gray-300'
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
