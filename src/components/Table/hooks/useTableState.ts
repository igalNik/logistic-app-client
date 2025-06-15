import { useState, useRef, useEffect } from 'react';
import type { ColDef } from 'ag-grid-community';
import { useRevalidator } from 'react-router-dom';

export function useTableState<T>(
  initialData: T[],
  tableConfig: ColDef<T>[]
  //   tableConfigOnEdit: ColDef<T>[]
) {
  const gridRef = useRef<any>(null);

  const invalidCells = useRef(new Set<string>()).current;
  const updates = useRef(new Map<string, Partial<T>>()).current;

  const { revalidate } = useRevalidator();

  const [rowData, setRowData] = useState<T[]>(initialData);
  const [rowDataBackup, setRowDataBackup] = useState<T[]>([...initialData]);
  const [colDefs, setColDefs] = useState<ColDef<T>[]>(tableConfig);
  const [tableStatus, setTableStatus] = useState<'read' | 'edit' | 'write'>(
    'read'
  );
  const [showColumnVisibilityManager, setShowColumnVisibilityManager] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<null | any>(null); // keep type broad here or pass type in args

  useEffect((): any => {
    return () => revalidate();
  }, []);

  useEffect(() => {
    setRowData(initialData);
  }, [initialData]);

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
  };
}
