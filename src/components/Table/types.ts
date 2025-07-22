import { ValidationPipe } from '@igalni/logistic-validation';
import { ColDef } from 'ag-grid-community';
import { ChangeEventHandler, ReactNode, RefObject } from 'react';
import { TableState } from './reducer/tableReducer';

export type TableStatus = 'read' | 'edit';
export interface FieldValidationSchema<T> {
  fieldName: keyof T;
  validation: (value: string) => ValidationPipe;
  eventTypes: string[];
}

export interface TableProps<T> {
  title?: string;
  description?: string;
  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];
  // defaultColDef: ColDef<T>[];
  validationSchema?: FieldValidationSchema<T>[];
  data: T[];
  isLoading: boolean;
  error?: string | string[] | null;

  onUpdateMany?: ((data: Partial<T>[]) => void) | undefined;
  onDeleteMany?: ((data: string[]) => void) | undefined;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
  onNotification?: (message: string) => void;

  children: ReactNode;
}

export interface TableContextType<T> {
  gridRef: RefObject<any>;
  state: TableState<T>;

  initializeTableData: () => void;
  hideChildren: () => void;
  showChildren: () => void;
  setTableStatus: (status: TableStatus) => void;
  toggleTableVisibility: () => void;
  setRowData: (rowData: T[]) => void;

  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];
  defaultColDef: ColDef<T>;
  validationSchema?: any[];

  onBtnExport: () => void;
  handleEditClick: () => void;
  handleCancelEditingClick: () => void;
  handleStopEditAndSaveClick: () => void;
  handleFilterTextBoxChanged: ChangeEventHandler<HTMLInputElement>;
  handleFilterTextBoxClear: () => void;

  onRowEditingStarted?: (event: any) => void;
  onRowEditingStopped?: (event: any) => void;
  onCellEditingStarted?: (event: any) => void;
  onCellEditingStopped: (event: any) => void;
  handleRowSelection: (event: any) => void;
  handleDeleteSelectedItems: (event: any) => void;

  onUpdateMany?: ((data: any) => void) | undefined;
  onDeleteMany?: ((data: any) => void) | undefined;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
  onNotification?: (message: string) => void;
}

export interface TableProviderProps<T> {
  // gridRef: React.RefObject<AgGridReact<T> | null>;
  children: ReactNode;
  tableConfig: ColDef<Partial<T>, any>[];
  tableConfigOnEdit?: ColDef<Partial<T>, any>[];
  validationSchema?: FieldValidationSchema<T>[];
  data: T[] | undefined;
}

export interface UseTableHandlersParams<T> {
  state: TableState<T>;
  initializeTableData: () => void;
  hideChildren: () => void;
  showChildren: () => void;
  setTableStatus: (status: TableStatus) => void;
  toggleTableVisibility: () => void;
  setRowData: (rowData: T[]) => void;
  setSearchText: (searchText: string) => void;
  setSelectedRows: (selectedRows: T[]) => void;
  restoreDataFromBackup: () => void;
  backupRowData: () => void;

  gridRef: React.RefObject<any>;
  validationSchema?: FieldValidationSchema<T>[];
  invalidCells: Set<string>;
  updates: Map<string, Partial<T>>;

  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];

  onUpdateMany?: (data: any) => void | void;
  onDeleteMany?: (data: any) => void;
  onError?: (message: string) => void;
  onSuccess?: (message: string) => void;
  onNotification?: (message: string) => void;
}
