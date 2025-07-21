import { useCallback, useEffect, useMemo } from 'react';
import { useTableContext } from './context/TableContext';
import TableToolbar from './TableToolBar';
// import TableGrid from './TableGrid';
import Modal from '../../components/Modal/Modal';
import ColumnVisibilityManager from './ColumnVisibilityManager';
import { TableProps } from './types';
import {
  AllCommunityModule,
  ColDef,
  ModuleRegistry,
  RowSelectionOptions,
} from 'ag-grid-community';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../Spinner';
import TableTitle from './TableTitle';
import { AgGridReact } from 'ag-grid-react';
ModuleRegistry.registerModules([AllCommunityModule]);

function Table<T>({ title, description, children }: TableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  // prettier-ignore
  const { gridRef, state, hideChildren, showChildren, toggleTableVisibility, tableConfig,
    defaultColDef,
    onCellEditingStopped,
    handleRowDataUpdated,
    handleRowSelection, } = useTableContext<T>();

  const handleCloseForm = useCallback(() => {
    setSearchParams({});
    hideChildren();
  }, [hideChildren, setSearchParams]);

  useEffect(() => {
    if (searchParams.get('id')) showChildren();
    else hideChildren();
  }, [searchParams, showChildren, hideChildren]);

  const rowSelection = useMemo<
    RowSelectionOptions | 'single' | 'multiple'
  >(() => {
    return {
      mode: 'multiRow',
      checkboxes: true,
      headerCheckbox: true,
      // enableClickSelection: true,
      // enableSelectionWithoutKeys: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
    };
  }, []);

  switch (state.dataStatus) {
    case 'loading':
      return <Spinner type="page" />;
    case 'error':
      return <p>{state.error}</p>;
    default:
      break;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {(title || description) && (
        <TableTitle title={title} description={description} />
      )}
      <div dir="rtl" className="gap-4 flex h-full w-full flex-row">
        {state.showColumnVisibilityManager && (
          <ColumnVisibilityManager
            onClose={toggleTableVisibility}
            gridRef={gridRef}
            tableConfig={state.colDefs}
          />
        )}
        <div className="flex flex-1 flex-col">
          <TableToolbar />
          <div className="flex-grow">
            {/* <TableGrid<T> tabIndex={-1} /> */}
            <AgGridReact<T>
              // {...props}
              ref={gridRef}
              enableRtl
              rowData={state.rowData}
              columnDefs={tableConfig}
              defaultColDef={defaultColDef}
              suppressCellFocus={false}
              onCellEditingStopped={onCellEditingStopped}
              onRowDataUpdated={handleRowDataUpdated}
              stopEditingWhenCellsLoseFocus
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={500}
              rowSelection={rowSelection}
              onRowSelected={handleRowSelection}
              quickFilterText={state.searchText}
              autoGroupColumnDef={autoGroupColumnDef}
              enableCellSpan={true}
              groupDisplayType="groupRows"
              animateRows={true}
            />
            {state.showChildren && (
              <Modal onClose={handleCloseForm} className="z-50">
                {children}
              </Modal>
            )}
          </div>
        </div>

        {/* {toast && <Toast {...toast} onClose={() => setToast(null)} />} */}
      </div>
    </div>
  );
}

export default Table;
