import { AgGridReact } from 'ag-grid-react';
import { TableContextType, TableProviderProps, TableStatus } from '../types';
import { ColDef } from 'ag-grid-community';
import { useMemo, useRef, useState } from 'react';
import { TableContext } from './TableContext';
import { ToastProps } from '../../Toast';

export const TableProvider = <T,>({
  children,
  tableConfig = [],
  validationSchema,
  data,
}: TableProviderProps<T>) => {
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<T[]>(data || []);

  const [showColumnVisibilityManager, setShowColumnVisibilityManager] =
    useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');

  const [tableStatus, setTableStatus] = useState<TableStatus>('read');

  const [colDefs, setColDefs] = useState<ColDef<Partial<T>>[]>(tableConfig);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const [toast, setToast] = useState<ToastProps | null>(null);

  const value = useMemo<TableContextType<T>>(
    () => ({
      gridRef,
      rowData,
      setRowData,
      tableStatus,
      setTableStatus,
      colDefs,
      setColDefs,
      showColumnVisibilityManager,
      setShowColumnVisibilityManager,
      searchText,
      setSearchText,
      showAddModal,
      setShowAddModal,
      validationSchema,
      toast,
      setToast,
    }),
    [
      colDefs,
      rowData,
      searchText,
      showAddModal,
      showColumnVisibilityManager,
      tableStatus,
      toast,
      validationSchema,
    ]
  );
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
