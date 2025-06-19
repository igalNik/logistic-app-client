import { AgGridReact } from 'ag-grid-react';
import { useTableContext } from './context/TableContext';
import { useMemo } from 'react';
import { RowSelectionOptions } from 'ag-grid-community';
import './style.css';

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

  const rowSelection = useMemo<
    RowSelectionOptions | 'single' | 'multiple'
  >(() => {
    return {
      mode: 'multiRow',
      enableClickSelection: true,
    };
  }, []);

  console.log(gridRef.current?.api.getSelectedRows());

  return (
    <div className="min-h-50 h-full w-full">
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
      />
    </div>
  );
};

export default TableGrid;
