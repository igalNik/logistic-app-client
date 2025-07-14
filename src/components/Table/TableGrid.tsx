import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from './context/TableContext';
import { useMemo } from 'react';
import { GridOptions, RowSelectionOptions } from 'ag-grid-community';
import './style.css';

const TableGrid = ({ ...props }: GridOptions<any>) => {
  const {
    state,
    gridRef,
    tableConfig,
    defaultColDef,
    onRowEditingStarted,
    onRowEditingStopped,
    onCellEditingStarted,
    onCellEditingStopped,
    handleRowDataUpdated,
    handleRowSelection,
  } = useTableContext();

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

  return (
    <div className="min-h-50 pr-1 h-full w-full">
      <AgGridReact
        {...props}
        ref={gridRef}
        enableRtl
        rowData={state.rowData}
        columnDefs={tableConfig}
        defaultColDef={defaultColDef}
        suppressCellFocus={false}
        onRowEditingStarted={onRowEditingStarted}
        onRowEditingStopped={onRowEditingStopped}
        onCellEditingStarted={onCellEditingStarted}
        onCellEditingStopped={onCellEditingStopped}
        onRowDataUpdated={handleRowDataUpdated}
        stopEditingWhenCellsLoseFocus
        tooltipShowMode="whenTruncated"
        tooltipShowDelay={500}
        rowSelection={rowSelection}
        onRowSelected={handleRowSelection}
        quickFilterText={state.searchText}
      />
    </div>
  );
};

export default TableGrid;
