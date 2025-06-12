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
    <div className="gap-2 mb-2 pb-2 flex justify-between">
      {!showColumnVisibilityManager && (
        <Button
          type="button"
          onClick={() => setShowColumnVisibilityManager((prev) => !prev)}
          iconName="Columns"
          className="flex-none"
        >
          <HideOnMobile>{TableStrings.COLUMN_VISIBILITY_TITLE}</HideOnMobile>
        </Button>
      )}

      <Input
        type="text"
        id="filter-text-box"
        placeholder={TableStrings.QUICK_SEARCH}
        onChange={handleFilterTextBoxChanged}
        value={searchText}
        iconName="Search"
        clearButton
        onClear={handleFilterTextBoxClear}
        className="grow"
      />

      {tableStatus === 'edit' ? (
        <>
          <Button
            type="button"
            onClick={handleCancelEditingClick}
            iconName="Close"
            className="flex-none"
          >
            <HideOnMobile>{TableStrings.CANCEL_EDITING}</HideOnMobile>
          </Button>
          <Button
            type="button"
            onClick={handleStopEditAndSaveClick}
            iconName="Save"
            className="flex-none"
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
            className="flex-none"
          >
            <HideOnMobile>{TableStrings.EDIT_TABLE}</HideOnMobile>
          </Button>
          <Button
            type="button"
            onClick={handleAdd}
            iconName="Add"
            className="flex-none"
          >
            <HideOnMobile>{TableStrings.ADD}</HideOnMobile>
          </Button>
          <Button type="button" onClick={onBtnExport} className="grow-0">
            <img
              src={`public/Excel.svg`}
              alt="Export to Excel"
              className="h-7 w-7"
            />
            <HideOnMobile>{TableStrings.EXPORT_TO_EXCEL}</HideOnMobile>
          </Button>
        </>
      )}
    </div>
  );
};

export default TableToolbar;
