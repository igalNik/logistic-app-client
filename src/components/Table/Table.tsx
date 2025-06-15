import { useEffect } from 'react';
import { useTableContext } from './context/TableContext';
import TableToolbar from './TableToolBar';
import TableGrid from './TableGrid';
import Modal from '../../components/Modal/Modal';
import { Toast } from '../Toast';
import ColumnVisibilityManager from './ColumnVisibilityManager';
import { TableProps } from './types';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

function Table<T>({ children }: TableProps<T>) {
  const {
    gridRef,
    showAddModal,
    setShowAddModal,
    toast,
    setToast,
    showColumnVisibilityManager,
    setShowColumnVisibilityManager,
    tableStatus,
    setColDefs,
    tableConfig,
    tableConfigOnEdit,
  } = useTableContext<T>();

  useEffect(() => {
    setColDefs(tableStatus === 'read' ? tableConfig : tableConfigOnEdit);
  }, [tableStatus, setColDefs, tableConfig, tableConfigOnEdit]);

  return (
    <div dir="rtl" className="gap-4 flex h-full w-full flex-row">
      {showColumnVisibilityManager && (
        <ColumnVisibilityManager
          onClose={() => setShowColumnVisibilityManager(false)}
          gridRef={gridRef}
          tableConfig={tableStatus === 'read' ? tableConfig : tableConfigOnEdit}
        />
      )}
      <div className="flex flex-1 flex-col">
        <TableToolbar />
        <div className="flex-grow">
          <TableGrid />
        </div>
      </div>

      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} className="z-50">
          {children}
        </Modal>
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Table;
