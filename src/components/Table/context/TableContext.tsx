import { createContext, useContext } from 'react';
import { TableContextType } from '../types';

export const TableContext = createContext<TableContextType<any> | null>(null);

export const useTableContext = <T,>() => {
  const context = useContext<TableContextType<T> | null>(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within TableProvider');
  } else {
    return context;
  }
};
