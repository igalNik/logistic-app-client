import { ReactNode } from 'react';
import type { ColDef } from 'ag-grid-community';
import { TableContext } from './TableContext';
import { FieldValidationSchema } from '../types';
import { useTableState } from './../hooks/useTableState';
import { useDefaultColDef } from './../hooks/useTableConstants';
import { useTableHandlers } from './../hooks/useTableHandlers';

interface TableProviderProps<T> {
  children: ReactNode;
  initialData: T[];
  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];
  validationSchema?: FieldValidationSchema<T>[];
  onUpdateMany?: ((data: any) => Promise<any>) | undefined;
}

export function TableProvider<T>({
  children,
  initialData,
  tableConfig,
  tableConfigOnEdit,
  validationSchema,
  onUpdateMany,
}: TableProviderProps<T>) {
  const {
    gridRef,
    invalidCells,
    updates,
    rowData,
    setRowData,
    rowDataBackup,
    setRowDataBackup,
    colDefs,
    setColDefs,
    tableStatus,
    setTableStatus,
    showColumnVisibilityManager,
    setShowColumnVisibilityManager,
    searchText,
    setSearchText,
    showAddModal,
    setShowAddModal,
    toast,
    setToast,
  } = useTableState<T>(initialData, tableConfig);

  const defaultColDef = useDefaultColDef(tableStatus, invalidCells, updates);

  const handlers = useTableHandlers({
    gridRef,
    validationSchema,
    invalidCells,
    updates,
    setToast,
    setShowAddModal,
    setTableStatus,
    setColDefs,
    tableConfig,
    tableConfigOnEdit,
    rowDataBackup,
    setRowDataBackup,
    rowData,
    setRowData,
    onUpdateMany,
    searchText,
    setSearchText,
  });

  return (
    <TableContext.Provider
      value={{
        defaultColDef,
        tableConfig,
        tableConfigOnEdit,
        gridRef,
        rowData,
        setRowData,
        colDefs,
        setColDefs,
        tableStatus,
        setTableStatus,
        showColumnVisibilityManager,
        setShowColumnVisibilityManager,
        searchText,
        setSearchText,
        showAddModal,
        setShowAddModal,
        validationSchema,
        toast,
        setToast,
        invalidCells,
        updates,
        ...handlers,
        onUpdateMany,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
