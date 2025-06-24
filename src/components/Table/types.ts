import { ValidationPipe } from '@igalni/logistic-validation';
import { ColDef } from 'ag-grid-community';
import { ChangeEventHandler, ReactNode, RefObject } from 'react';

export type TableStatus = 'read' | 'write' | 'edit';
export interface FieldValidationSchema<T> {
  fieldName: keyof T;
  validation: (value: string) => ValidationPipe;
  eventTypes: string[];
}

export interface TableProps<T> {
  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];
  validationSchema?: FieldValidationSchema<T>[];
  data: T[];
  onUpdateMany?: ((data: any) => Promise<any>) | undefined;
  onDeleteMany?: ((data: any) => Promise<any>) | undefined;

  children: ReactNode;
}

export interface TableContextType<T> {
  gridRef: RefObject<any>;
  rowData: T[];
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;
  colDefs: ColDef<T>[];
  setColDefs: React.Dispatch<React.SetStateAction<ColDef<T>[]>>;
  tableStatus: 'read' | 'edit' | 'write';
  setTableStatus: React.Dispatch<
    React.SetStateAction<'read' | 'edit' | 'write'>
  >;
  showColumnVisibilityManager: boolean;
  setShowColumnVisibilityManager: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  validationSchema?: any[];
  defaultColDef: ColDef;
  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];
  invalidCells: Set<string>;
  updates: Map<string, Partial<T>>;
  toast: null | {
    title: string;
    message: string[] | string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
  };
  setToast: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string[] | string;
      type: 'success' | 'error' | 'info';
      onClose: () => void;
    } | null>
  >;
  selectedRows: T[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;

  onBtnExport: () => void;
  handleAdd: () => void;
  handleEditClick: () => void;
  handleCancelEditingClick: () => void;
  handleStopEditAndSaveClick: () => void;
  handleFilterTextBoxChanged: ChangeEventHandler<HTMLInputElement>;
  handleFilterTextBoxClear: () => void;

  onRowEditingStarted: (event: any) => void;
  onRowEditingStopped: (event: any) => void;
  onCellEditingStarted: (event: any) => void;
  onCellEditingStopped: (event: any) => void;
  handleRowDataUpdated: (event: any) => void;
  handleRowSelection: (event: any) => void;
  handleDeleteSelectedItems: (event: any) => void;

  onUpdateMany?: ((data: any) => Promise<any>) | undefined;
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
  gridRef: React.RefObject<any>;
  validationSchema?: FieldValidationSchema<T>[];
  invalidCells: Set<string>;
  updates: Map<string, Partial<T>>;

  setToast: React.Dispatch<
    React.SetStateAction<{
      title: string;
      message: string | string[];
      type: 'success' | 'error' | 'info';
      onClose: () => void;
    } | null>
  >;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;

  setTableStatus: React.Dispatch<
    React.SetStateAction<'read' | 'edit' | 'write'>
  >;

  setColDefs: React.Dispatch<React.SetStateAction<ColDef<T>[]>>;

  tableConfig: ColDef<T>[];
  tableConfigOnEdit: ColDef<T>[];

  rowDataBackup: T[] | null;
  setRowDataBackup: React.Dispatch<React.SetStateAction<T[] | null>>;

  rowData: T[];
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;

  selectedRows: T[];
  setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;

  onUpdateMany?: (data: any) => Promise<any>;
  onDeleteMany?: (data: any) => Promise<any>;
}
