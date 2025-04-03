import { useState } from 'react';
import Icons from '../../utils/Icons';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedUniqueValues,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';

import Filter from './Filter';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import DebouncedInputWithIcon from './DebouncedInputWithIcon';
import Icon from '../../components/Icon';

const { Sort } = Icons;

// ✅ Step 1: Define the row data type
interface Soldier {
  number: number;
  firstName: string;
  lastName: string;
  id: string;
  department: string;
  roll: string;
}

// ✅ Step 2: Provide types for state + table config
const defaultData: Soldier[] = [
  {
    number: 1,
    firstName: 'יגאל',
    lastName: 'ניקולאיב',
    id: '7710717',
    department: 'מפל"ג',
    roll: '',
  },
  {
    number: 2,
    firstName: 'אלכס',
    lastName: 'פסוצקי',
    id: '1234567',
    department: 'מפל"ג',
    roll: 'סרס"פ',
  },
  {
    number: 3,
    firstName: 'אורי',
    lastName: 'אריאלי',
    id: '1122334',
    department: 'מפל"ג',
    roll: 'רס"פ',
  },
  {
    number: 4,
    firstName: 'לאון',
    lastName: 'שסק',
    id: '9988776',
    department: 'צלפים',
    roll: 'צלף',
  },
];

const columnHelper = createColumnHelper<Soldier>();

const columns = [
  columnHelper.accessor('number', {
    header: 'מספר',
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  }),
  columnHelper.accessor('department', {
    header: 'מחלקה',
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'select',
    },
  }),
  columnHelper.accessor('firstName', {
    header: 'שם פרטי',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('lastName', {
    header: () => 'שם משפחה',
    cell: (info) => <i className="test">{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('id', {
    header: () => 'מספר אישי',
  }),
  columnHelper.accessor('roll', {
    header: () => 'תפקיד',
  }),
];

function SoldersTable() {
  const [data] = useState<Soldier[]>([...defaultData]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'firstName',
      desc: true,
    },
  ]);

  const table = useReactTable({
    data, // table data
    columns, // columns definition
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      globalFilter,
      sorting,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-4 text-xs w-full">
      <div className="py-2 flex justify-between">
        <DebouncedInputWithIcon
          onTextChange={(value: string) => setGlobalFilter(value)}
          debounce={200}
          iconName={'Search'}
          placeholder="חיפוש..."
          tabIndex={0}
          className="w-2"
          value={globalFilter}
        />
        <ButtonWithIcon text="הוסף" iconName="Add" />
      </div>

      <table className="p-4 mx-auto">
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-header-border-color border-b-[1px]"
            >
              {headerGroup.headers.map((header) => (
                <th className="px-4 py-2 font-medium" key={header.id}>
                  <div
                    className={
                      header.column.getCanSort()
                        ? 'flex cursor-pointer justify-between select-none'
                        : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Sort ascending'
                          : header.column.getNextSortingOrder() === 'desc'
                            ? 'Sort descending'
                            : 'Clear sort'
                        : undefined
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: (
                        <Icon
                          name="Sort"
                          options={{ fontSize: '18px', color: 'inherit' }}
                        />
                      ),
                      desc: (
                        <Sort
                          className="rotate-180"
                          style={{ fontSize: '18px', color: 'inherit' }}
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                  {header.column.getCanFilter() ? (
                    <div className="my-1">
                      <Filter column={header.column} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-header-border-color border-b-[1px]"
            >
              {row.getVisibleCells().map((cell) => (
                <td className="px-4 py-4 text-center" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SoldersTable;
