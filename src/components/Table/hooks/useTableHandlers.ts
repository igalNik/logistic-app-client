import type { CellEditingStoppedEvent } from 'ag-grid-community';
import type { FieldValidationSchema, UseTableHandlersParams } from '../types';
import { ChangeEventHandler, useCallback } from 'react';

export function useTableHandlers<T>({
  state,
  // initializeTableData,
  // showChildren,
  // hideChildren,
  setTableStatus,
  setRowData,

  gridRef,
  validationSchema,
  invalidCells,
  updates,
  // setToast,
  onUpdateMany,
  onDeleteMany,
  setSearchText,
  setSelectedRows,
}: UseTableHandlersParams<T>) {
  const onBtnExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, [gridRef]);

  const handleEditClick = useCallback(() => {
    setTableStatus('edit');
  }, [setTableStatus]);

  const handleCancelEditingClick = useCallback(() => {
    invalidCells.clear();
    updates.clear();
    setTableStatus('read');
  }, [invalidCells, updates, setTableStatus]);

  const handleRowSelection = useCallback(() => {
    setSelectedRows(gridRef.current.api.getSelectedRows());
  }, [gridRef, setSelectedRows]);

  const handleStopEditAndSaveClick = useCallback(async () => {
    const res = await onUpdateMany?.([...updates.values()]);

    if (res.status === 'fail') return Promise.resolve(res);

    setTableStatus('read');

    invalidCells.clear();
    updates.clear();
  }, [invalidCells, onUpdateMany, setTableStatus, updates]);

  const handleFilterTextBoxChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        setSearchText(event.target.value);
      },
      [setSearchText]
    );

  const handleFilterTextBoxClear = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  // Stub event handlers, can be expande
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

        // setToast({
        //   title: TableStrings.INVALID_VALUE,
        //   message: validationResult!.errors as string[],
        //   type: 'error',
        //   onClose: () => setToast(null),
        // });
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
    [invalidCells, updates, refreshGridCells, validationSchema]
  );

  const handleRowDataUpdated = useCallback(() => {}, []);

  const handleDeleteSelectedItems = useCallback(async () => {
    const ids = state.selectedRows.map((row: T) => (row as any)._id);
    await onDeleteMany?.(ids);
    setRowData(
      (state.rowData as T[]).filter(
        (row) =>
          !ids.includes((row as any).id) && !ids.includes((row as any)._id)
      )
    );
  }, [onDeleteMany, state.selectedRows, setRowData, state.rowData]);

  return {
    onBtnExport,
    handleEditClick,
    handleCancelEditingClick,
    handleStopEditAndSaveClick,
    handleFilterTextBoxChanged,
    handleFilterTextBoxClear,

    onCellEditingStopped,
    handleRowDataUpdated,
    handleRowSelection,
    handleDeleteSelectedItems,
  };
}
