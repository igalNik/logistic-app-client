import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Input from '../Input';
import { mergeClasses } from '../../utils/tailwind.util';
import Button from '../Button';
import IconButton from '../IconButton';

interface Item {
  id: string;
  value: string;
}

interface StringArrayInputProps {
  // extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  id?: string;
  label: string;
  value?: string[];
  maxLength?: number;
  minLength?: number;
  tabIndex?: number;
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const StringArrayInput = ({
  label = '',
  value = [],
  // maxLength,
  // minLength,
  onChange,
  tabIndex,
  placeholder,
  className,
  ...props
}: StringArrayInputProps) => {
  const [items, setItems] = useState<Item[]>(() => {
    return value ? value.map((v) => ({ id: generateId(), value: v })) : [];
  });

  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  const handleAddItem = useCallback(
    (value: string) => {
      if (inputValue !== '') {
        const newVal = [...items, { id: generateId(), value }];

        setInputValue('');
        setItems(newVal);
        onChange?.(newVal.map((item) => item.value));
      }
    },
    [inputValue, items, onChange]
  );

  const handleRemoveItem = useCallback(
    (id: string) => {
      if (inputValue !== '') {
        setInputValue('');
        setItems((prev) => prev.filter((item) => item.id !== id));
        onChange?.(items.map((item) => item.value));
      }
    },
    [inputValue, items, onChange]
  );
  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [items]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAddItem(inputValue);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAddItem, inputValue, items]);

  return (
    <fieldset
      className={mergeClasses(
        className,
        'border-gray-300 rounded-lg text-gray-700 pb-2 gap-2 flex flex-col border-1'
      )}
    >
      {label && <legend className="text-md px-2">{label}</legend>}
      <div className="px-4 gap-2 bg-white flex justify-between">
        <Input
          {...props}
          tabIndex={tabIndex}
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => handleInputChange(event)}
          className="rounded px-2 py-1 block w-full border"
        />

        <Button
          tabIndex={tabIndex === undefined ? undefined : tabIndex + 1}
          type="button"
          onClick={() => handleAddItem(inputValue)}
          className="m-0 h-full flex-1 grow-0"
          iconName={'Add'}
          iconOptions={{ fontSize: '28px' }}
        ></Button>
      </div>
      {items.length > 0 && (
        <div className="rounded-xl border-gray-300 gap-2 px-4 pt-2 max-h-52 flex flex-col overflow-auto focus:outline-none">
          {items.map((item, index) => (
            <div
              className="bg-gray-100 pr-4 rounded-md flex items-center justify-between"
              key={item.id}
              ref={lastItemRef}
            >
              <span className="">
                <span className="font-semibold">{`${index + 1}.`}</span>
                {` ${item.value}`}
              </span>
              <IconButton
                className="grow-0"
                iconName={'Close'}
                onClick={() => handleRemoveItem(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default StringArrayInput;
