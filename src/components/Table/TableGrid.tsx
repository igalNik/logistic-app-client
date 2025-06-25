import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from './context/TableContext';
import { useMemo } from 'react';
import { GridOptions, RowSelectionOptions } from 'ag-grid-community';
import './style.css';

const TableGrid = ({ ...props }: GridOptions<any>) => {
  const {
    gridRef,
    rowData,
    defaultColDef,
    colDefs,
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
  console.log(props);

  return (
    <div className="min-h-50 ove mx-1 h-full w-full">
      <AgGridReact
        ref={gridRef}
        enableRtl
        rowData={rowData}
        columnDefs={colDefs}
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
        {...props}
      />
    </div>
  );
};

export default TableGrid;
