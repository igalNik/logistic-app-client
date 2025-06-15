import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from './context/TableContext';

const TableGrid = () => {
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
  } = useTableContext();

  return (
    <div className="min-h-50 h-full w-full">
      <AgGridReact
        ref={gridRef}
        enableRtl
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        suppressCellFocus={false}
        suppressRowHoverHighlight
        rowClass="hover:bg-[var(--color-bg-sidebar-alt)]! hover:text-white!"
        onRowEditingStarted={onRowEditingStarted}
        onRowEditingStopped={onRowEditingStopped}
        onCellEditingStarted={onCellEditingStarted}
        onCellEditingStopped={onCellEditingStopped}
        onRowDataUpdated={handleRowDataUpdated}
        stopEditingWhenCellsLoseFocus
        tooltipShowMode="whenTruncated"
        tooltipShowDelay={500}
      />
    </div>
  );
};

export default TableGrid;
