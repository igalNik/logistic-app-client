import { useReducer } from 'react';
import {
  tableReducer,
  TableState,
  TableStatus,
  UIAction,
} from './tableReducer';
import { ColDef } from 'ag-grid-community';

export interface TableActionCreators<T> {
  state: TableState<T>;
  initializeTableData: () => void;
  setRowData: (rowData: T[]) => void;
  hideChildren: () => void;
  showChildren: () => void;
  toggleTableVisibility: () => void;
  setTableStatus: (status: TableStatus) => void;
  setSearchText: (searchText: string) => void;
  setSelectedRows: (selectedRows: T[]) => void;
}

interface TableActionProps<T> {
  initialState: TableState<T>;
  tableConfig: ColDef<T, any>[];
  tableConfigOnEdit: ColDef<T, any>[];
}
function useTableReducer<T>({
  initialState,
  tableConfig,
  tableConfigOnEdit,
}: TableActionProps<T>): TableActionCreators<T> {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const initializeTableData = () => {
    dispatch({
      type: 'data/initializeTableData',
      payload: initialState.rowData,
    });
  };

  const setRowData = (rowData: T[]) => {
    dispatch({
      type: 'data/setRowData',
      payload: rowData,
    });
  };

  const hideChildren = () => {
    dispatch({ type: 'ui/hideChildren' });
  };

  const showChildren = () => {
    dispatch({ type: 'ui/showChildren' });
  };

  const setTableStatus = (status: TableStatus) => {
    let payload: UIAction<T>;
    if (status === 'read') {
      payload = {
        type: 'ui/setTableStatus',
        payload: {
          tableStatus: 'read',
          colDefs: tableConfig,
          rowDataBackup: null,
        },
      };
    } else {
      payload = {
        type: 'ui/setTableStatus',
        payload: {
          tableStatus: 'edit',
          colDefs: tableConfigOnEdit,
          rowDataBackup: state.rowData,
        },
      };
    }
    dispatch(payload);
  };

  const toggleTableVisibility = () => {
    dispatch({ type: 'ui/toggleTableVisibility' });
  };

  const setSearchText = (searchText: string) => {
    dispatch({ type: 'ui/search', payload: searchText });
  };

  const setSelectedRows = (selectedRows: T[]) => {
    dispatch({ type: 'ui/setSelectedRows', payload: selectedRows });
  };

  return {
    state,
    initializeTableData,
    setRowData,
    hideChildren,
    showChildren,
    toggleTableVisibility,
    setTableStatus,
    setSearchText,
    setSelectedRows,
  };
}

export default useTableReducer;
