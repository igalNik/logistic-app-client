import { ReactNode, useMemo, useRef } from 'react';
import type { ColDef } from 'ag-grid-community';
import { TableContext } from './TableContext';
import { FieldValidationSchema } from '../types';
import { useDefaultColDef } from './../hooks/useTableConstants';
import { useTableHandlers } from './../hooks/useTableHandlers';
import { TableState } from '../reducer/tableReducer';
import useTableReducer from '../reducer/useTableReducer';

interface TableProviderProps<T> {
  children: ReactNode;
  initialData: T[];
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
  initialData,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
  isLoading = false,
  onUpdateMany,
  onDeleteMany,
}: TableProviderProps<T>) {
  //
  const initialState: TableState<T> = useMemo(
    () => ({
      colDefs: tableConfig,
      rowData: initialData,
      filteredRowData: null,
      rowDataBackup: initialData, // Added missing property
      showChildren: false,
      showColumnVisibilityManager: false,
      tableStatus: 'read',
      selectedRows: [],
      isLoading: isLoading,
      updates: new Map(),
      invalidCells: new Set(),
      searchText: '',
      error: null,
    }),
    [initialData, isLoading, tableConfig]
  );

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
