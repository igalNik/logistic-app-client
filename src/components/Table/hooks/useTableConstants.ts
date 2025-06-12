import { useMemo } from 'react';
import type { ColDef } from 'ag-grid-community';

export function useDefaultColDef<T>(
  tableStatus: 'read' | 'edit' | 'write',
  invalidCells: Set<string>,
  updates: Map<string, Partial<T>>
) {
  return useMemo<ColDef>(
    () => ({
      flex: 1,
      cellClass:
        'select-all selection:bg-blue-200 selection:border-0 selection:text-gray-900 ',
      editable: tableStatus === 'edit',
      minWidth: 100,
      filter: true,
      cellClassRules: {
        'bg-red-500/20 ': (params: any) => {
          return invalidCells.has(
            `${params.data!._id}-${params.column.getColId()}`
          );
        },
        'bg-yellow-500/20': (params: any) => {
          return (
            !invalidCells.has(
              `${params.data._id}-${params.column.getColId()}`
            ) &&
            updates.has(params.data._id) &&
            params.column.getColId() in updates.get(params.data._id)!
          );
        },
      },
    }),
    [tableStatus, invalidCells, updates]
  );
}
