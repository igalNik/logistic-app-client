import { useTableContext } from './context/TableContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import HideOnMobile from '../HideOnMobile';
import { TableStrings } from './constants';

const TableToolbar = () => {
  const {
    searchText,
    showColumnVisibilityManager,
    setShowColumnVisibilityManager,
    tableStatus,
    handleAdd,
    handleEditClick,
    handleCancelEditingClick,
    handleStopEditAndSaveClick,
    handleFilterTextBoxChanged,
    handleFilterTextBoxClear,
    onBtnExport,
  } = useTableContext();

  return (
    <>
      <div className="md:flex-row gap-2 mb-2 flex flex-col">
        <div className="gap-2 mb-2 md:order-2 order-1 flex flex-row justify-between">
          {!showColumnVisibilityManager && (
            <Button
              type="button"
              onClick={() => setShowColumnVisibilityManager((prev) => !prev)}
              iconName="Columns"
              className="max-h-11 flex-1"
            >
              <HideOnMobile>
                {TableStrings.COLUMN_VISIBILITY_TITLE}
              </HideOnMobile>
            </Button>
          )}

          {tableStatus === 'edit' ? (
            <>
              <Button
                type="button"
                onClick={handleCancelEditingClick}
                iconName="Close"
                className="max-h-11 flex-1"
              >
                <HideOnMobile>{TableStrings.CANCEL_EDITING}</HideOnMobile>
              </Button>
              <Button
                type="button"
                onClick={handleStopEditAndSaveClick}
                iconName="Save"
                className="max-h-11 flex-1"
              >
                <HideOnMobile>{TableStrings.STOP_AND_SAVE}</HideOnMobile>
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={handleEditClick}
                iconName="Edit"
                className="max-h-11 flex-1"
              >
                <HideOnMobile>{TableStrings.EDIT_TABLE}</HideOnMobile>
              </Button>
              <Button
                type="button"
                onClick={handleAdd}
                iconName="Add"
                className="max-h-11 flex-1"
              >
                <HideOnMobile>{TableStrings.ADD}</HideOnMobile>
              </Button>
              <Button
                type="button"
                onClick={onBtnExport}
                className="max-h-11 flex-1"
              >
                <img
                  src={`public/Excel.svg`}
                  alt="Export to Excel"
                  className="h-6 w-6"
                />
                <HideOnMobile>{TableStrings.EXPORT_TO_EXCEL}</HideOnMobile>
              </Button>
            </>
          )}
        </div>
        <Input
          type="text"
          id="filter-text-box"
          placeholder={TableStrings.QUICK_SEARCH}
          onChange={handleFilterTextBoxChanged}
          value={searchText}
          iconName="Search"
          clearButton
          onClear={handleFilterTextBoxClear}
          className="max-h-11 md:order-1 order-2 min-w-[200px] flex-none"
        />
      </div>
    </>
  );
};

export default TableToolbar;
