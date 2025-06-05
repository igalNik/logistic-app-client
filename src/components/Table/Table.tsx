import {
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import Button from '../../components/Button';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input';
import { useRevalidator } from 'react-router-dom';
import { defaultColDef, TableStrings } from './constants';
import { SoldersRow } from '../../features/solders/components/SoldersTable/types';
import ColumnVisibilityManager from './ColumnVisibilityManager';

ModuleRegistry.registerModules([AllCommunityModule]);

type TableStatus = 'read' | 'write' | 'edit';

export interface TableProps<T> {
  tableConfig: ColDef<SoldersRow>[];
  tableConfigOnEdit: ColDef<SoldersRow>[];
  data: T[] | undefined;
  children: ReactNode;
}

/**
 *
 * @param param
 * @returns
 */

function Table({
  data = [],
  tableConfig,
  tableConfigOnEdit,
  children,
}: TableProps<T>) {
  const [rowData, setRowData] = useState<T[]>(data);

  const [showColumnVisibilityManager, setShowColumnVisibilityManager] =
    useState<boolean>(true);

  const [searchText, setSearchText] = useState<string>('');

  const [tableStatus, setTableStatus] = useState<TableStatus>('read');

  const [colDefs, setColDefs] = useState<ColDef<SoldersRow>[]>(tableConfig);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const { revalidate } = useRevalidator();

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
    return () => {
      revalidate();
    };
  }, []);
  useEffect(() => {
    setRowData(data);
  }, [data]);

  useEffect(() => {}, [tableStatus]);

  const onFilterTextBoxChanged: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setSearchText(() => event.target.value);
      gridRef.current!.api.setGridOption('quickFilterText', event.target.value);
    }, []);

  const onFilterTextBoxClear = useCallback(() => {
    setSearchText(() => '');
    gridRef.current!.api.setGridOption('quickFilterText', '');
  }, []);

  const onSoldersRowEditingStarted = useCallback(
    (event: RowEditingStartedEvent) => {
      console.log(event);
    },
    []
  );

  const onSoldersRowEditingStopped = useCallback(
    (event: RowEditingStoppedEvent) => {
      console.log(event);
    },
    []
  );

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

  const handleCancelEditingClick = useCallback(() => {
    setTableStatus(() => 'read');
    setColDefs(() => tableConfig);
    revalidate();
  }, [revalidate, tableConfig]);

  const handleEditClick = useCallback(() => {
    switch (tableStatus) {
      case 'read': {
        setTableStatus(() => 'edit');
        setColDefs(() => tableConfigOnEdit);

        gridRef.current?.api.applyTransaction({
          add: [{}],
        });
        break;
      }
      case 'edit':
        {
          setTableStatus(() => 'read');
          setColDefs(() => tableConfig);
        }
        break;
      default: {
        setTableStatus(() => 'read');
        setColDefs(() => tableConfig);
      }
    }
  }, [tableConfig, tableConfigOnEdit, tableStatus]);

  const handleSoldersRowDataUpdated = useCallback(
    (event: RowDataUpdatedEvent) => {
      console.log(event);
    },
    []
  );

  return (
    <div dir="rtl" className="gap-4 flex w-full">
      {showColumnVisibilityManager && (
        <ColumnVisibilityManager
          gridRef={gridRef}
          tableConfig={tableStatus === 'read' ? tableConfig : tableConfigOnEdit}
          onClose={() => setShowColumnVisibilityManager(() => false)}
          className=""
        />
      )}
      <div className="flex-1">
        <div className="gap-2 mb-2 p-y flex justify-between">
          <div className="gap-2 flex">
            {!showColumnVisibilityManager && (
              <Button
                type="button"
                onClick={() => setShowColumnVisibilityManager((prev) => !prev)}
                className="w-10"
                iconName="Columns"
              >
                {TableStrings.COLUMN_VISIBILITY_TITLE}
              </Button>
            )}

            <Input
              type="text"
              id="filter-text-box"
              placeholder={TableStrings.QUICK_SEARCH}
              onChange={onFilterTextBoxChanged}
              className="rounded-md border-gray-300 focus:ring-blue-400 md:min-w-xs focus:ring-1 focus:outline-none"
              value={searchText}
              iconName="Search"
              clearButton={true}
              containerClassName="flex-1"
              onClear={onFilterTextBoxClear}
            />
          </div>
          <div className="gap-2 flex w-2/5 items-center justify-items-start overflow-visible">
            {tableStatus === 'edit' && (
              <Button
                type="button"
                onClick={handleCancelEditingClick}
                iconName="Close"
                iconOptions={{ fontSize: '18px' }}
                className="flex-1/2"
              >
                {TableStrings.CANCEL_EDITING}
              </Button>
            )}
            <Button
              type="button"
              onClick={handleEditClick}
              iconName={tableStatus === 'edit' ? 'Save' : 'Edit'}
              iconOptions={{ fontSize: '18px' }}
              className="flex-1/2"
            >
              {tableStatus === 'edit'
                ? TableStrings.STOP_AND_SAVE
                : TableStrings.EDIT_TABLE}
            </Button>
            {tableStatus === 'read' && (
              <Button
                type="button"
                onClick={handleAdd}
                iconName="Add"
                className="flex-1/2"
              >
                {TableStrings.ADD}
              </Button>
            )}
          </div>
        </div>
        <AgGridReact
          ref={gridRef}
          enableRtl={true}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef(tableStatus)}
          domLayout="autoHeight"
          autoSizeStrategy={autoSizeStrategy}
          suppressCellFocus={false}
          suppressRowHoverHighlight={true}
          rowClass={'hover:bg-[var(--color-bg-sidebar-alt)]! hover:text-white!'}
          onRowEditingStarted={onSoldersRowEditingStarted}
          onRowEditingStopped={onSoldersRowEditingStopped}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
          onRowDataUpdated={handleSoldersRowDataUpdated}
          stopEditingWhenCellsLoseFocus={true}
          editType="fullRow"
          onCellClicked={(params) => {
            if (params.colDef.field === 'name') {
              alert(`Clicked on name: ${params.value}`);
            }
          }}
        />
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
    </div>
  );
}

export default Table;
