import { ReactNode } from 'react';
import Checkbox from '../Checkbox';
import { AgGridReact } from 'ag-grid-react';
import { TableStrings } from './constants';
import { ColDef } from 'ag-grid-community';
import IconButton from '../IconButton';

interface ColumnVisibilityManagerProps {
  children?: ReactNode;
  gridRef: React.RefObject<AgGridReact<any> | null>;
  tableConfig: ColDef<any>[];
  className: string;
  onClose: () => void;
}

function ColumnVisibilityManager({
  gridRef,
  tableConfig,
  onClose,
}: ColumnVisibilityManagerProps) {
  return (
    <div className="rounded-lg border-gray-300 text-md border-1">
      <div className="h-11 font-semibold bg-gray-100 px-2 border-b-gray-300 gap-2 flex items-center overflow-hidden border-b-1">
        <span className="whitespace-nowrap">
          {TableStrings.COLUMN_VISIBILITY_TITLE}
        </span>
        <IconButton iconName={'Close'} onClick={() => onClose()} />
      </div>
      <div className="px-1 pt-3">
        {tableConfig.map((col) => (
          <Checkbox
            label={col.headerName}
            id={col.field}
            checked={true}
            onChange={(value) =>
              gridRef.current?.api?.setColumnsVisible(
                col.field ? [col.field] : [],
                value
              )
            }
            key={col.field}
          />
        ))}
      </div>
    </div>
  );
}

export default ColumnVisibilityManager;
