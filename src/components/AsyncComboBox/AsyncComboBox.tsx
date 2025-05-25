// src/components/AsyncSelect.tsx
import { useState, useEffect } from 'react';
import { mergeClasses } from '../../utils/tailwind.util';
import { Option } from '../../types/comboBox.types';
import BouncedLoader from '../BouncedLoader';
import { AsyncComboBoxProps } from './types';
import ComboBox from '../ComboBox';

function AsyncComboBox({ fetchOptions, ...props }: AsyncComboBoxProps) {
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
      <ComboBox
        {...props}
        value={props.value}
        id={props.id}
        label={String(props.label)}
        options={options}
        placeholder={isLoading ? '' : props.placeholder}
        className={mergeClasses(
          `${isLoading ? 'ps-11' : ''} w-full`,
          props.className
        )}
        disabled={isLoading}
        onChange={props.onChange}
        // iconName=''
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

export default AsyncComboBox;
