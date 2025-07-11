import { useEffect } from 'react';
import { useTableContext } from './context/TableContext';
import TableToolbar from './TableToolBar';
import TableGrid from './TableGrid';
import Modal from '../../components/Modal/Modal';
import { Toast } from '../Toast';
import ColumnVisibilityManager from './ColumnVisibilityManager';
import { TableProps } from './types';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../Spinner';
import Error from '../Error';
import TableTitle from './TableTitle';
ModuleRegistry.registerModules([AllCommunityModule]);

function Table<T>({ title, description, children }: TableProps<T>) {
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
    isLoading,
    error,
  } = useTableContext<T>();

  useEffect(() => {
    setColDefs(tableStatus === 'read' ? tableConfig : tableConfigOnEdit);
  }, [tableStatus, setColDefs, tableConfig, tableConfigOnEdit]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseForm = () => {
    setSearchParams({});
    setShowAddModal(false);
  };
  useEffect(() => {
    if (searchParams.get('id')) setShowAddModal(true);
  }, [searchParams, setShowAddModal]);

  if (isLoading) {
    console.log('Table component - showing spinner');
    return <Spinner type={'page'} />;
  }

  if (error) {
    console.log('Table component - showing error');
    return <Error error={error} />;
  }

  console.log('Table component - rendering table');
  return (
    <div className="flex h-full w-full flex-col">
      {(title || description) && (
        <TableTitle title={title} description={description} />
      )}
      <div dir="rtl" className="gap-4 flex h-full w-full flex-row">
        {showColumnVisibilityManager && (
          <ColumnVisibilityManager
            onClose={() => setShowColumnVisibilityManager(false)}
            gridRef={gridRef}
            tableConfig={
              tableStatus === 'read' ? tableConfig : tableConfigOnEdit
            }
          />
        )}
        <div className="flex flex-1 flex-col">
          <TableToolbar />
          <div className="flex-grow">
            <TableGrid tabIndex={-1} />
            {showAddModal && (
              <Modal onClose={handleCloseForm} className="z-50">
                {children}
              </Modal>
            )}
          </div>
        </div>

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  );
}

export default Table;
