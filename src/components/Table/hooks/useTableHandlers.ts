import { useCallback, ChangeEventHandler } from 'react';
import type { CellEditingStoppedEvent, ColDef } from 'ag-grid-community';
import { TableStrings } from '../constants';
import type { FieldValidationSchema } from '../types';

export function useTableHandlers<T>(
  gridRef: React.RefObject<any>,
  validationSchema: FieldValidationSchema<T>[] | undefined,
  invalidCells: Set<string>,
  updates: Map<string, Partial<T>>,
  setToast: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string[] | string;
      type: 'success' | 'error' | 'info';
      onClose: () => void;
    } | null>
  >,
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>,
  setTableStatus: React.Dispatch<
    React.SetStateAction<'read' | 'edit' | 'write'>
  >,
  setColDefs: React.Dispatch<React.SetStateAction<ColDef<T>[]>>,
  tableConfig: ColDef<T>[],
  tableConfigOnEdit: ColDef<T>[],
  rowDataBackup: T[],
  setRowData: React.Dispatch<React.SetStateAction<T[]>>
) {
  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, [gridRef]);

  const handleAdd = useCallback(() => {
    gridRef.current?.api.applyTransaction({
      add: [{} as T],
    });
    setShowAddModal(true);
  }, [gridRef, setShowAddModal]);

  const handleEditClick = useCallback(() => {
    setTableStatus('edit');
    setColDefs(tableConfigOnEdit);
  }, [setTableStatus, setColDefs, tableConfigOnEdit]);

  const handleCancelEditingClick = useCallback(() => {
    invalidCells.clear();
    updates.clear();
    setRowData(rowDataBackup);
    setTableStatus('read');
    setColDefs(tableConfig);
  }, [
    invalidCells,
    updates,
    setRowData,
    rowDataBackup,
    setTableStatus,
    setColDefs,
    tableConfig,
  ]);

  const handleStopEditAndSaveClick = useCallback(() => {
    // Implement save logic here
  }, []);

  const handleFilterTextBoxChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const val = event.target.value;
        gridRef.current!.api.setGridOption('quickFilterText', val);
      },
      [gridRef]
    );

  const handleFilterTextBoxClear = useCallback(() => {
    gridRef.current!.api.setGridOption('quickFilterText', '');
  }, [gridRef]);

  // Stub event handlers, can be expanded:
  const onRowEditingStarted = useCallback(() => {}, []);
  const onRowEditingStopped = useCallback(() => {}, []);
  const onCellEditingStarted = useCallback(() => {}, []);

  const refreshGridCells = useCallback(() => {
    gridRef.current?.api.refreshCells({ force: true });
  }, [gridRef]);

  const onCellEditingStopped = useCallback(
    (event: CellEditingStoppedEvent) => {
      if (!event.valueChanged) return;

      const id = event.data._id as string;
      const field = event.column.getColId() as keyof T;
      const newValue = event.newValue as T[keyof T];

      const cellKey = `${id}-${field as string}`;
      const updatesKey = id;

      const fieldValidationSchema = validationSchema?.find(
        (f: FieldValidationSchema<T>) => f.fieldName === field
      );

      const validationResult = fieldValidationSchema
        ?.validation(String(newValue))
        .result();

      if (validationResult && !validationResult?.isValid) {
        invalidCells.add(cellKey);
        refreshGridCells();

        setToast({
          title: TableStrings.INVALID_VALUE,
          message: validationResult!.errors as string[],
          type: 'error',
          onClose: () => setToast(null),
        });
      } else {
        invalidCells.delete(cellKey);
        if (updates.has(updatesKey)) {
          const updateObj = updates.get(updatesKey)!;
          updateObj[field as keyof T] = newValue as T[keyof T];
        } else {
          updates.set(updatesKey, {
            id,
            [field]: event.data[field],
          } as Partial<T> & { id: string });
        }
      }
      refreshGridCells();
    },
    [invalidCells, updates, refreshGridCells, setToast, validationSchema]
  );

  const handleRowDataUpdated = useCallback(() => {}, []);

  return {
    onBtnExport,
    handleAdd,
    handleEditClick,
    handleCancelEditingClick,
    handleStopEditAndSaveClick,
    handleFilterTextBoxChanged,
    handleFilterTextBoxClear,
    onRowEditingStarted,
    onRowEditingStopped,
    onCellEditingStarted,
    onCellEditingStopped,
    handleRowDataUpdated,
  };
}
