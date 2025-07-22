import { useCallback, useReducer } from 'react';
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
  restoreDataFromBackup: () => void;
  backupRowData: () => void;
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

  // Actions
  const initializeTableData = useCallback(() => {
    console.log('init');

    dispatch({
      type: 'data/initializeTableData',
      payload: initialState.rowData,
    });
  }, [initialState.rowData]);

  const setRowData = useCallback((rowData: T[]) => {
    dispatch({
      type: 'data/setRowData',
      payload: rowData,
    });
  }, []);

  const restoreDataFromBackup = useCallback(() => {
    dispatch({
      type: 'data/restoreFromBackup',
    });
  }, []);
  const backupRowData = useCallback(() => {
    dispatch({
      type: 'data/backupRowData',
    });
  }, []);

  const hideChildren = useCallback(() => {
    dispatch({ type: 'ui/hideChildren' });
  }, []);

  const showChildren = useCallback(() => {
    dispatch({ type: 'ui/showChildren' });
  }, []);

  const setTableStatus = useCallback(
    (status: TableStatus) => {
      let payload: UIAction<T>;
      if (status === 'read') {
        payload = {
          type: 'ui/setTableStatus',
          payload: {
            tableStatus: 'read',
            colDefs: tableConfig,
          },
        };
      } else {
        payload = {
          type: 'ui/setTableStatus',
          payload: {
            tableStatus: 'edit',
            colDefs: tableConfigOnEdit,
          },
        };
      }
      dispatch(payload);
    },
    [tableConfig, tableConfigOnEdit]
  );

  const toggleTableVisibility = useCallback(() => {
    dispatch({ type: 'ui/toggleTableVisibility' });
  }, []);

  const setSearchText = useCallback((searchText: string) => {
    dispatch({ type: 'ui/search', payload: searchText });
  }, []);

  const setSelectedRows = useCallback((selectedRows: T[]) => {
    dispatch({ type: 'ui/setSelectedRows', payload: selectedRows });
  }, []);

  return {
    state,
    initializeTableData,
    setRowData,
    restoreDataFromBackup,
    backupRowData,
    hideChildren,
    showChildren,
    toggleTableVisibility,
    setTableStatus,
    setSearchText,
    setSelectedRows,
  };
}

export default useTableReducer;
