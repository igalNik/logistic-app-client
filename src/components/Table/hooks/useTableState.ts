import { useState, useRef } from 'react';
import type { ColDef } from 'ag-grid-community';

export function useTableState<T>(initialData: T[], tableConfig: ColDef<T>[]) {
  const gridRef = useRef<any>(null);

  const invalidCells = useRef(new Set<string>()).current;
  const updates = useRef(new Map<string, Partial<T>>()).current;

  const [rowData, setRowData] = useState<T[]>([...initialData]);
  const [rowDataBackup, setRowDataBackup] = useState<T[] | null>([
    ...initialData,
  ]);
  const [colDefs, setColDefs] = useState<ColDef<T>[]>(tableConfig);
  const [tableStatus, setTableStatus] = useState<'read' | 'edit' | 'write'>(
    'read'
  );
  const [showColumnVisibilityManager, setShowColumnVisibilityManager] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<null | any>(null); // keep type broad here or pass type in args
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  return {
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
    selectedRows,
    setSelectedRows,
  };
}
