import { ValidationPipe } from '@igalni/logistic-validation';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { ReactNode } from 'react';
import { ToastProps } from '../Toast';

export type TableStatus = 'read' | 'write' | 'edit';
export interface FieldValidationSchema<T> {
  fieldName: keyof T;
  validation: (value: string) => ValidationPipe;
  eventTypes: string[];
}

export interface TableProps<T> {
  tableConfig: ColDef<Partial<T>>[];
  tableConfigOnEdit: ColDef<Partial<T>>[];
  validationSchema?: FieldValidationSchema<T>[];
  data: T[] | undefined;
  children: ReactNode;
}

export interface TableContextType<T> {
  gridRef: React.RefObject<AgGridReact<T> | null>;
  rowData: T[];
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;
  tableStatus: TableStatus;
  setTableStatus: React.Dispatch<React.SetStateAction<TableStatus>>;
  colDefs: ColDef<Partial<T>>[];
  setColDefs: React.Dispatch<React.SetStateAction<ColDef<Partial<T>>[]>>;
  showColumnVisibilityManager: boolean;
  setShowColumnVisibilityManager: React.Dispatch<React.SetStateAction<boolean>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastProps | null;
  setToast: React.Dispatch<React.SetStateAction<ToastProps | null>>;

  validationSchema?: FieldValidationSchema<T>[];
}

export interface TableProviderProps<T> {
  // gridRef: React.RefObject<AgGridReact<T> | null>;
  children: ReactNode;
  tableConfig: ColDef<Partial<T>, any>[];
  tableConfigOnEdit?: ColDef<Partial<T>, any>[];
  validationSchema?: FieldValidationSchema<T>[];
  data: T[] | undefined;
}
