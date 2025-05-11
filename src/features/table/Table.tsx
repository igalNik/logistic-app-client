import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Or your preferred theme
ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
interface TableRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState<TableRow[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<TableRow>[]>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
  ]);

  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef: ColDef = {
    flex: 1,
  };
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }, []);
  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      dir="rtl" // Tailwind-compatible RTL direction
      className="bg-gray-100 p-4 h-[400px] w-full"
      style={{ direction: 'rtl' }} // Explicit RTL for AG Grid
    >
      <div className="ag-theme-alpine h-full w-full"></div>
      <div className="example-header">
        <span>Quick Filter:</span>
        <input
          type="text"
          id="filter-text-box"
          placeholder="Filter..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <AgGridReact
        ref={gridRef}
        // enableRtl={true}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        suppressMovableColumns={true} // Optional: Prevent manual reordering
      />
    </div>
  );
};

export default GridExample;
