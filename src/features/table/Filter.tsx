import { useMemo } from 'react';
import DebouncedInput from '../../components/DebouncedInput';

export default function Filter({ column }: any) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant]
  );
  return filterVariant === 'range' ? (
    <div>
      <div className="w-36 gap-2 font-normal flex justify-start">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={columnFilterValue?.[0] ?? ''}
          onChange={(value: string) =>
            column.setFilterValue((old: any) => [value, old?.[1]])
          }
          placeholder={`Min`}
          // className=""
          icon={''}
        />
        <DebouncedInput
          type="number"
          value={columnFilterValue?.[1] ?? ''}
          onChange={(value: string) =>
            column.setFilterValue((old: any) => [old?.[0], value])
          }
          placeholder={`Max`}
          // className="w-14 rounded shadow border"
          icon={''}
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      className="w-36 rounded px-2 font-normal shadow border focus-within:ring-2 focus-within:outline-none"
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      <option value="">הכל</option>
      {sortedUniqueValues.map((value) => (
        //dynamically generated select options from faceted values feature
        <option value={value as string} key={value as any}>
          {value as string}
        </option>
      ))}
    </select>
  ) : (
    <DebouncedInput
      className="w-36"
      // className="w-36 rounded border px-2 font-normal shadow focus-within:outline-none focus-within:ring-2"
      onChange={(value: string) => column.setFilterValue(value)}
      placeholder={`חיפוש...`}
      type="text"
      value={columnFilterValue ?? ''}
      icon={''}
    />
    // See faceted column filters example for datalist search suggestions
  );
}
