import Input from '../Input';
import Option from '../Option';
import { DropdownProps, DropdownActionType } from './types';
import { useDropdown } from './hooks';
import { mergeClasses } from '../../utils/tailwind.util';

function Dropdown({ options = [], onOptionSelect, ...props }: DropdownProps) {
  const {
    state,
    dispatch,
    clientRect,
    dropdownRef,
    inputRef,
    itemRefs,
    setMouseMode,
    handleHighlightOnMouseEnter,
    handleItemSelection,
    handleInputChange,
    handleInputKeyDown,
  } = useDropdown({ options, onOptionSelect, ...props });

  return (
    <div className="inset-y-0 relative" ref={dropdownRef}>
      <Input
        {...props}
        value={state.inputValue}
        onFocus={() => dispatch({ type: DropdownActionType.OPEN_DROPDOWN })}
        onClick={() => dispatch({ type: DropdownActionType.OPEN_DROPDOWN })}
        ref={inputRef}
        onInputChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        clearButton={true}
        onClear={() => dispatch({ type: DropdownActionType.RESET_DROPDOWN })}
      />

      <div
        style={{
          width: `calc(${clientRect?.width}px)`,
          maxWidth: '100%',
          top: `${clientRect && clientRect?.bottom + 2}px`,
        }}
        className={mergeClasses(
          'rounded-lg border-gray-200 bg-white shadow-lg y-10 fixed z-10 max-w-full overflow-hidden border-1 border-l-0',
          `${state.showOptions ? '' : 'hidden'}`
        )}
      >
        {
          <ul
            className={mergeClasses(
              'max-h-40 gap-y-0.5 mr-2 ml-0.5 pl-1 my-1 scrollbar-thin box-border flex flex-col overflow-y-auto scroll-smooth'
            )}
          >
            {state.filteredOptions.map((option, index) => (
              <Option
                option={option}
                onMouseMove={setMouseMode}
                onMouseEnter={() => handleHighlightOnMouseEnter(index)}
                onClick={() => handleItemSelection(option)}
                key={option.id}
                setRef={(el) => (itemRefs.current[index] = el)}
                isSelected={state.selected?.id === option.id}
                isHighlighted={index === state.highlightedIndex}
              />
            ))}
          </ul>
        }
      </div>
    </div>
  );
}

export default Dropdown;
