import { ColDef } from 'ag-grid-community';
import { TableStatus } from './types';

export enum TableStrings {
  EDIT_TABLE = 'עריכת הטבלה',
  STOP_AND_SAVE = 'סיים ושמור',
  CANCEL_EDITING = 'ביטול',
  ADD = 'הוספה',
  QUICK_SEARCH = 'חיפוש מהיר...',
  COLUMN_VISIBILITY_TITLE = 'ניהול תצוגת עמודות',
  EXPORT_TO_EXCEL = 'יצוא ל - Excel',
}

export const defaultColDef = (mode: TableStatus): ColDef => ({
  flex: 1,
  cellClass:
    'select-all selection:bg-blue-200 selection:border-0 selection:text-gray-900 ',
  editable: mode === 'edit',
  // resizable: false,
  minWidth: 100,
  filter: true,
});
