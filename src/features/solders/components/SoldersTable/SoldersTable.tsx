import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  ColDef,
  RowDataUpdatedEvent,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from 'ag-grid-community';
import {
  AllCommunityModule,
  ModuleRegistry,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from 'ag-grid-community';
import { User } from '../../../../types/User';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal/Modal';
import Input from '../../../../components/Input';
import CreateSolderForm from '../CreateSolderForm/CreateSolderForm';
import CreateSolderFormTest from '../CreateSolderForm/CreateSolderFormTest';

ModuleRegistry.registerModules([AllCommunityModule]);

const defaultColDef: ColDef = {
  flex: 1,
  cellClass:
    'select-all selection:bg-blue-200 selection:border-0 selection:text-gray-900 ',
  editable: true,

  filter: true,
};
interface Row {
  personalNumber: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  appRole: string;
  department: { id: string; name: string };
}

type TableStatus = 'read' | 'write' | 'edit';
export interface SoldersTableProps {
  solders: User[] | undefined;
}

/**
 *
 * @param param
 * @returns
 */

function SoldersTable({ solders = [] }: SoldersTableProps) {
  const [rowData, setRowData] = useState<User[]>([]);

  const [colDefs] = useState<ColDef<Row>[]>([
    {
      field: 'personalNumber',
      headerName: 'מספר אישי',
    },
    {
      field: 'fullName',
      headerName: 'שם',
    },
    {
      field: 'department',
      headerName: 'מחלקה',
      valueFormatter: (p) => {
        return p.value?.name?.replace(/\+972/, '0');
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'נייד',
      valueFormatter: (p) =>
        p.value &&
        p.value
          .replace(/^\+972/, '0')
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{7})/, '$1-$2'),
      valueGetter: (params) => {
        if (!params.data?.phoneNumber) return '';
        return params.data?.phoneNumber
          .replace(/^\+972/, '0')
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{7})/, '$1-$2');
      },
    },
    {
      field: 'email',
      headerName: 'דוא"ל',
    },
    {
      field: 'role',
      headerName: 'תפקיד',
    },
  ]);

  const [tableStatus, setTableStatus] = useState<TableStatus>('read');

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const gridRef = useRef<AgGridReact>(null);

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
    setRowData(solders);
  }, [solders]);

  useEffect(() => {}, [tableStatus]);
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }, []);

  const onRowEditingStarted = useCallback((event: RowEditingStartedEvent) => {
    console.log(event);
  }, []);

  const onRowEditingStopped = useCallback((event: RowEditingStoppedEvent) => {
    console.log(event);
  }, []);

  const onCellEditingStarted = useCallback((event: CellEditingStartedEvent) => {
    console.log(event);
  }, []);

  const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
    console.log(event);
  }, []);

  const handleAdd = () => {
    gridRef.current?.api.applyTransaction({
      add: [{ id: '', name: '', email: '' }],
    });
    setShowAddModal(() => true);
  };
  const handleEdit = () => {
    gridRef.current?.api.applyTransaction({
      add: [{ id: '', name: '', email: '' }],
    });
    setTableStatus(() => 'edit');
  };

  const handleRowDataUpdated = useCallback((event: RowDataUpdatedEvent) => {
    if (tableStatus !== 'edit') return;

    const rowIndex = event.api.getLastDisplayedRowIndex();

    gridRef.current!.api.setFocusedCell(rowIndex, 'personalNumber');
    gridRef.current!.api.startEditingCell({
      rowIndex: rowIndex,
      colKey: 'personalNumber',
    });
  }, []);

  return (
    <div
      dir="rtl" // Tailwind-compatible RTL direction
      //   className="w-full"
    >
      <div className="mb-3 flex justify-between">
        <Input
          type="text"
          id="filter-text-box"
          placeholder="חיפוש מהיר..."
          onInput={onFilterTextBoxChanged}
          className="rounded-md border-gray-300 px-4 py-2 focus:ring-blue-400 border-1 focus:ring-2 focus:outline-none"
        />
        <div className="gap-1 flex items-center justify-items-start">
          <Button onClick={handleEdit}>עריכת הטבלה</Button>
          <Button onClick={handleAdd}>הוספה</Button>
        </div>
      </div>
      <AgGridReact
        ref={gridRef}
        enableRtl={true}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        autoSizeStrategy={autoSizeStrategy}
        suppressCellFocus={false}
        suppressRowHoverHighlight={true}
        rowClass={'hover:bg-[var(--color-bg-sidebar-alt)]! hover:text-white!'}
        onRowEditingStarted={onRowEditingStarted}
        onRowEditingStopped={onRowEditingStopped}
        onCellEditingStarted={onCellEditingStarted}
        onCellEditingStopped={onCellEditingStopped}
        onRowDataUpdated={handleRowDataUpdated}
        stopEditingWhenCellsLoseFocus={true}
      />
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} className="z-50">
          <CreateSolderForm />
        </Modal>
      )}
    </div>
  );
}

export default SoldersTable;
