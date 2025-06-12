import {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import type {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  RowDataUpdatedEvent,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from 'ag-grid-community';
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  CsvExportModule,
  ModuleRegistry,
  NumberEditorModule,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  TextEditorModule,
  ValidationModule,
} from 'ag-grid-community';
import Button from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input';
import { useRevalidator } from 'react-router-dom';
import { defaultColDef, TableStrings } from './constants';
import ColumnVisibilityManager from './ColumnVisibilityManager';

import { FieldValidationSchema, TableProps } from './types';
import { useTableContext } from './context/TableContext';
import HideOnMobile from '../HideOnMobile';
import { Toast, ToastProps } from '../Toast';
import { UpdateSoldier } from '../../types/solder/UpdateSoldier';
import { current } from '@reduxjs/toolkit';
import { updateSolders } from '../../api/solders';
import { Title } from '@mui/icons-material';

ModuleRegistry.registerModules([]);
ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  CsvExportModule,
  NumberEditorModule,
  TextEditorModule,
  ValidationModule,
]);

/**
 *
 * @param param
 * @returns
 */

function Table<T>({
  data = [],
  tableConfig,
  tableConfigOnEdit,
  children,
}: TableProps<T>) {
  const { revalidate } = useRevalidator();

  const {
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
  } = useTableContext();

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: 'fitGridWidth',
    };
  }, []);

  useEffect(() => {
    return () => {
      revalidate();
    };
  }, []);
  useEffect(() => {
    setRowData(data);
  }, [data, setRowData]);

  useEffect(() => {}, [tableStatus]);

  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv();
  }, []);

  const onFilterTextBoxChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setSearchText(() => event.target.value);
      gridRef.current!.api.setGridOption('quickFilterText', event.target.value);
    }, []);

  const onFilterTextBoxClear = useCallback(() => {
    setSearchText(() => '');
    gridRef.current!.api.setGridOption('quickFilterText', '');
  }, []);

  const onRowEditingStarted = useCallback((event: RowEditingStartedEvent) => {
    // console.log(event);
  }, []);

  const onRowEditingStopped = useCallback((event: RowEditingStoppedEvent) => {
    // console.log(event);
  }, []);

  const onCellEditingStarted = useCallback((event: CellEditingStartedEvent) => {
    console.log(updates, invalidCells);
  }, []);

  const invalidCells = useMemo(() => new Set<string>(), []);
  // const updates = useMemo(() => new Map<string, Record<string, string>>(), []);
  const updates = useMemo(() => new Map<string, UpdateSoldier>(), []);

  const onCellEditingStopped = useCallback(
    (event: CellEditingStoppedEvent) => {
      if (!event.valueChanged) return;

      const cellChanges: { id: string; field: string; value: string } = {
        id: event.data._id,
        field: event.column.getColId(),
        value: event.newValue,
      };

      const invalidCellsKey = `${cellChanges.id}-${cellChanges.field}`;
      const updatesKey = cellChanges.id;
      const fieldSchema = validationSchema?.find(
        (field: FieldValidationSchema<T>) =>
          field.fieldName === cellChanges.field
      );

      const validationResult = fieldSchema
        ?.validation(cellChanges.value)
        .result();

      if (validationResult && !validationResult?.isValid) {
        invalidCells.add(invalidCellsKey);

        setToast({
          title: 'ערך לא חוקי',
          message: validationResult!.errors as string[],
          type: 'error',
          onClose: () => setToast(null),
          // onClose: () => {},
        });
      } else {
        invalidCells.delete(invalidCellsKey);

        if (updates.has(updatesKey)) {
          const updateObj = updates.get(updatesKey)!;
          updateObj[cellChanges.field] = cellChanges.value;
        } else {
          updates.set(updatesKey, {
            id: cellChanges.id,
            [cellChanges.field]: event.data[cellChanges.field],
          });
        }
      }
      setColDefs((prev) => {
        return prev.map((cell) => {
          if (cell.field === cellChanges.field) {
            return {
              ...cell,
              cellClassRules: {
                'bg-red-500/20 ': (param) => {
                  return invalidCells.has(
                    `${param.data!._id}-${param.column.getColId()}`
                  );
                },
                'bg-yellow-500/20 ': (param) => {
                  return (
                    !invalidCells.has(
                      `${param.data._id}-${param.column.getColId()}`
                    ) &&
                    updates.get(param.data._id) &&
                    param.column.getColId() in updates.get(param.data._id)!
                  );
                },
              },
            };
          }
          return cell;
        });
      });
    },
    [invalidCells, setColDefs, updates, validationSchema]
  );

  const handleAdd = () => {
    gridRef.current?.api.applyTransaction({
      add: [{ id: '', name: '', email: '' }],
    });
    setShowAddModal(() => true);
  };

  const handleCancelEditingClick = useCallback(() => {
    updates.clear();
    setTableStatus(() => 'read');
    setColDefs(() => tableConfig);

    revalidate();
  }, [revalidate, setColDefs, setTableStatus, tableConfig, updates]);

  const handleEditClick = useCallback(() => {
    setTableStatus(() => 'edit');
    setColDefs(() => tableConfigOnEdit);

    gridRef.current?.api.applyTransaction({
      add: [{}],
    });
  }, [gridRef, setColDefs, setTableStatus, tableConfigOnEdit]);

  const handleStopEditAndSaveClick = useCallback(async () => {
    const res = await updateSolders([...updates.values()]);
    console.log(res);

    if (res.status === 'success') {
      setToast({
        title: 'עדכון בוצעה',
        message: 'שינויים נשמרו בהצלחה!',
        type: 'success',
        onClose: () => setToast(null),
      });
      updates.clear();
      setTableStatus(() => 'read');
      setColDefs(() => tableConfig);
      revalidate();
    }
  }, [revalidate, setColDefs, setTableStatus, tableConfig, updates]);

  const handleRowDataUpdated = useCallback((event: RowDataUpdatedEvent) => {
    // console.log(event);
  }, []);

  return (
    <div dir="rtl" className="gap-4 flex h-full max-h-full w-full flex-1">
      {showColumnVisibilityManager && (
        <ColumnVisibilityManager
          gridRef={gridRef}
          tableConfig={tableStatus === 'read' ? tableConfig : tableConfigOnEdit}
          onClose={() => setShowColumnVisibilityManager(() => false)}
          className=""
        />
      )}
      <div className="px-1 h-full max-h-full flex-1 overflow-hidden">
        <div className="gap-2 mb-2 p-1 flex justify-end">
          <Button onClick={onBtnExport} className="grow-0">
            <img
              src={`public/Excel.svg`}
              alt="Export to Excel"
              className="h-7 w-7"
            />
            <HideOnMobile>{TableStrings.EXPORT_TO_EXCEL}</HideOnMobile>
          </Button>
        </div>
        <div className="gap-2 mb-2 pb-2 flex justify-between">
          {!showColumnVisibilityManager && (
            <Button
              type="button"
              onClick={() => setShowColumnVisibilityManager((prev) => !prev)}
              className="flex-none"
              iconName="Columns"
            >
              <HideOnMobile>
                <HideOnMobile>
                  {TableStrings.COLUMN_VISIBILITY_TITLE}
                </HideOnMobile>
              </HideOnMobile>
            </Button>
          )}
          <Input
            type="text"
            id="filter-text-box"
            placeholder={TableStrings.QUICK_SEARCH}
            onChange={onFilterTextBoxChanged}
            value={searchText}
            iconName="Search"
            clearButton={true}
            className="grow"
            onClear={onFilterTextBoxClear}
          />
          {tableStatus === 'edit' && (
            <Button
              type="button"
              onClick={handleCancelEditingClick}
              iconName="Close"
              className="flex-none"
            >
              <HideOnMobile>{TableStrings.CANCEL_EDITING}</HideOnMobile>
            </Button>
          )}
          {tableStatus === 'edit' && (
            <Button
              type="button"
              onClick={handleStopEditAndSaveClick}
              iconName={'Save'}
              className="flex-none"
            >
              <HideOnMobile>{TableStrings.STOP_AND_SAVE}</HideOnMobile>
            </Button>
          )}
          {tableStatus === 'read' && (
            <Button
              type="button"
              onClick={handleEditClick}
              iconName={'Edit'}
              className="flex-none"
            >
              <HideOnMobile>{TableStrings.EDIT_TABLE}</HideOnMobile>
            </Button>
          )}

          {tableStatus === 'read' && (
            <>
              <Button
                type="button"
                onClick={handleAdd}
                iconName="Add"
                className="flex-none"
              >
                <HideOnMobile>{TableStrings.ADD}</HideOnMobile>
              </Button>
            </>
          )}
        </div>
        {/* <div className="grid-wrapper"> */}
        <div className="min-h-50 h-full max-h-5/6 w-full">
          <AgGridReact
            ref={gridRef}
            enableRtl={true}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef(tableStatus)}
            // domLayout="normal"
            // autoSizeStrategy={autoSizeStrategy}
            suppressCellFocus={false}
            suppressRowHoverHighlight={true}
            rowClass={
              'hover:bg-[var(--color-bg-sidebar-alt)]! hover:text-white!'
            }
            onRowEditingStarted={onRowEditingStarted}
            onRowEditingStopped={onRowEditingStopped}
            onCellEditingStarted={onCellEditingStarted}
            onCellEditingStopped={onCellEditingStopped}
            onRowDataUpdated={handleRowDataUpdated}
            stopEditingWhenCellsLoseFocus={true}
            // editType="fullRow"
            tooltipShowMode="whenTruncated"
            tooltipShowDelay={500}
          />
        </div>
        {/* </div> */}
      </div>
      {showAddModal && (
        <Modal
          onClose={() => {
            setShowAddModal(false);
            revalidate(); // runs route loader on close
          }}
          className="z-50"
        >
          {children}
        </Modal>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type as 'success' | 'error' | 'info'}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Table;
