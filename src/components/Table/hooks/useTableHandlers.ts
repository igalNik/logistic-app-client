import type { CellEditingStoppedEvent, ColDef } from 'ag-grid-community';
import type { FieldValidationSchema } from '../types';
import { ChangeEventHandler, useCallback } from 'react';
import { TableStrings } from '../constants';
import { useRevalidator } from 'react-router-dom';

type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  title: string;
  message: string | string[];
  type: ToastType;
  onClose: () => void;
}
export interface UseTableHandlersParams<T> {
  gridRef: React.RefObject<any>;
  validationSchema?: FieldValidationSchema<T>[];
  invalidCells: Set<string>;
  updates: Map<string, Partial<T>>;

  setToast: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string | string[];
      type: 'success' | 'error' | 'info';
      onClose: () => void;
    } | null>
  >;

  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;

  setTableStatus: React.Dispatch<
    React.SetStateAction<'read' | 'edit' | 'write'>
  >;

  setColDefs: React.Dispatch<React.SetStateAction<ColDef<T>[]>>;

  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];

  rowDataBackup: T[];

  setRowData: React.Dispatch<React.SetStateAction<T[]>>;

  onUpdateMany?: (data: any) => Promise<any>;
}

export function useTableHandlers<T>({
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
  setRowData,
  onUpdateMany,
}: UseTableHandlersParams<T>) {
  const { revalidate } = useRevalidator();
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

  const handleStopEditAndSaveClick = useCallback(async () => {
    const res = await onUpdateMany?.([...updates.values()]);

    if (res.status === 'fail') return Promise.resolve(res);

    setColDefs(() => tableConfigOnEdit);
    setTableStatus(() => 'read');
    revalidate();
  }, [onUpdateMany, setColDefs, setTableStatus, tableConfigOnEdit, updates]);

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
