import { ReactNode, useEffect, useRef } from 'react';
import type { ColDef } from 'ag-grid-community';
import { TableContext } from './TableContext';
import { FieldValidationSchema } from '../types';
import { useDefaultColDef } from './../hooks/useTableConstants';
import { useTableHandlers } from './../hooks/useTableHandlers';
import { TableState } from '../reducer/tableReducer';
import useTableReducer from '../reducer/useTableReducer';

interface TableProviderProps<T> {
  children: ReactNode;
  data: T[];
  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];
  validationSchema?: FieldValidationSchema<T>[];
  isLoading?: boolean;
  error?: string | string[] | null;
  onUpdateMany?: ((data: any) => Promise<any>) | undefined;
  onDeleteMany?: ((data: any) => Promise<any>) | undefined;
}

export function TableProvider<T>({
  children,
  data,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
  isLoading = false,
  error,
  onUpdateMany,
  onDeleteMany,
}: TableProviderProps<T>) {
  // prettier-ignore
  const initialState: TableState<T> = {
  tableStatus: 'read',
  dataStatus: isLoading? 'loading':'idle',
  error: null,

  colDefs: tableConfig,
  rowData: data,
  filteredRowData: null,
  rowDataBackup: data,

  updates: new Map(),
  invalidCells: new Set(),

  selectedRows: [],
  searchText: '',
  showChildren: false,
  showColumnVisibilityManager: false,
};

  const gridRef = useRef<any>(null);
  const invalidCells = useRef(new Set<string>()).current;
  const updates = useRef(new Map<string, Partial<T>>()).current;

  const {
    state,
    initializeTableData,
    showChildren,
    hideChildren,
    setTableStatus,
    toggleTableVisibility,
    setRowData,
    setSearchText,
    setSelectedRows,
  } = useTableReducer<T>({ initialState, tableConfig, tableConfigOnEdit });

  useEffect(() => {
    initializeTableData();
  }, [isLoading, data, initializeTableData]);

  const defaultColDef = useDefaultColDef(
    state.tableStatus,
    invalidCells,
    updates
  );

  const handlers = useTableHandlers<T>({
    state,
    initializeTableData,
    showChildren,
    hideChildren,
    setTableStatus,
    setSearchText,
    setSelectedRows,
    gridRef,
    invalidCells,
    updates,
    tableConfig,
    tableConfigOnEdit,

    setRowData,
    onUpdateMany,
    onDeleteMany,
    toggleTableVisibility,
  });

  return (
    <TableContext.Provider
      value={{
        gridRef,
        state,
        initializeTableData,
        showChildren,
        hideChildren,
        setTableStatus,
        toggleTableVisibility,
        setRowData,

        ...handlers,
        tableConfig,
        tableConfigOnEdit,
        defaultColDef,
        validationSchema,

        onUpdateMany,
        onDeleteMany,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
