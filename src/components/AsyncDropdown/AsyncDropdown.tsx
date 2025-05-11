// src/components/AsyncSelect.tsx
import { useState, useEffect } from 'react';
import { mergeClasses } from '../../utils/tailwind.util';
import Dropdown from '../Dropdown';
import { Option } from '../../types/dropdown.types';
import BouncedLoader from '../BouncedLoader';
import { AsyncDropdownProps } from './types';

function AsyncDropdown({
  label,
  id,
  placeholder = 'בחר אפשרות',
  fetchOptions,
  ...props
}: AsyncDropdownProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOptions = async () => {
      try {
        setIsLoading(true);
        const result = await fetchOptions();

        if (!result) setError('no data');

        setOptions(() => result);
      } catch (err: any) {
        setError(`שגיאה בטעינת האפשרויות: ${err?.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    getOptions();
  }, [fetchOptions]);

  return (
    <div className="relative" dir="rtl">
      <Dropdown
        {...props}
        id={id}
        label={String(label)}
        options={options}
        placeholder={isLoading ? '' : placeholder}
        className={mergeClasses('w-full', props.className)}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="center pr-4 absolute bottom-[14px] flex w-full items-center justify-start">
          <BouncedLoader />
        </div>
      )}
      <div className="text-red-600">{error}</div>
    </div>
  );
}

export default AsyncDropdown;
