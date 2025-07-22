import type { ColDef } from 'ag-grid-community';
import { FieldValidationSchema } from '../types';

export type TableStatus = 'read' | 'edit';

export type DataStatus = 'idle' | 'loading' | 'error';
export interface TableState<T> {
  tableStatus: TableStatus;
  dataStatus: DataStatus;
  error: string | null;

  colDefs: ColDef<T, any>[];
  rowData: T[];
  filteredRowData?: T[] | null;
  rowDataBackup: T[] | null;

  updates: Map<string, Partial<T>>;
  invalidCells: Set<string>;

  selectedRows: T[];
  searchText: string;
  showChildren: boolean;
  showColumnVisibilityManager: boolean;
}

export type DataActions<T> =
  | { type: 'data/initializeTableData'; payload: T[] }
  | { type: 'data/restoreFromBackup' }
  | { type: 'data/backupRowData' }
  | { type: 'data/setRowData'; payload: T[] }
  | { type: 'data/setLoading' }
  | { type: 'data/setError'; payload: string };

export type UIAction<T> =
  | { type: 'ui/defineColumns'; payload: ColDef<T>[] }
  | { type: 'ui/defineValidation'; payload: FieldValidationSchema<T>[] }
  | { type: 'ui/search'; payload: string }
  | { type: 'ui/setSelectedRows'; payload: T[] }
  | { type: 'ui/addButtonClicked'; payload: T }
  | { type: 'ui/showChildren' }
  | { type: 'ui/hideChildren' }
  | { type: 'ui/toggleTableVisibility' }
  | {
      type: 'ui/setTableStatus';
      payload: {
        tableStatus: TableStatus;
        colDefs: ColDef<T, any>[];
      };
    };

type TableAction<T> = DataActions<T> | UIAction<T>;

export function tableReducer<T>(
  state: TableState<T>,
  action: TableAction<T>
): TableState<T> {
  switch (action.type) {
    case 'data/initializeTableData':
      return {
        ...state,
        showChildren: false,
        selectedRows: [],
        rowData: action.payload,
        dataStatus: 'idle',
      };
    case 'data/setRowData':
      return { ...state, rowData: action.payload, dataStatus: 'idle' };

    case 'data/restoreFromBackup':
      return {
        ...state,
        rowData: [...state.rowDataBackup!],
      };
    case 'data/backupRowData':
      return {
        ...state,
        rowDataBackup: JSON.parse(JSON.stringify(state.rowData)),
      };
    case 'data/setLoading':
      return { ...state, dataStatus: 'loading', error: null };
    case 'data/setError':
      return { ...state, dataStatus: 'error', error: action.payload };
    case 'ui/hideChildren':
      return { ...state, showChildren: false };
    case 'ui/showChildren':
      return { ...state, showChildren: true };
    case 'ui/toggleTableVisibility':
      return {
        ...state,
        showColumnVisibilityManager: !state.showColumnVisibilityManager,
      };
    case 'ui/setTableStatus': {
      return {
        ...state,
        tableStatus: action.payload.tableStatus,
        colDefs: action.payload.colDefs,
        selectedRows: [],
      };
    }
    case 'ui/search': {
      return { ...state, searchText: action.payload };
    }
    case 'ui/setSelectedRows': {
      return { ...state, selectedRows: action.payload };
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
