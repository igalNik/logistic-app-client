import Input from '../Input';
import MenuItem from './MenuItem';
import { ComboBoxProps, ComboBoxActionType } from './types';
import { useComboBox } from './hooks';
import { mergeClasses } from '../../utils/tailwind.util';
import { useMemo } from 'react';

function ComboBox({ options = [], onChange, ...props }: ComboBoxProps) {
  const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

  const {
    state,
    dispatch,
    clientRect,
    comboBoxRef,
    inputRef,
    itemRefs,
    setMouseMode,
    handleHighlightOnMouseEnter,
    handleItemSelection,
    handleClear,
    handleInputChange,
    handleInputKeyDown,
  } = useComboBox({
    ...props,
    options: stableOptions,
    onChange,
    value: props.value || '',
    onClear: props.onClear,
  });

  return (
    <div className="inset-y-0 relative" ref={comboBoxRef}>
      <Input
        {...props}
        value={state.inputValue}
        onFocus={() => dispatch({ type: ComboBoxActionType.OPEN_COMBO_BOX })}
        onClick={() => dispatch({ type: ComboBoxActionType.OPEN_COMBO_BOX })}
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        clearButton={true}
        onClear={handleClear}
      />

      <div
        style={{
          width: `calc(${clientRect?.width}px)`,
          maxWidth: '100%',
          // top: `${clientRect && clientRect?.bottom + 2}px`,
        }}
        className={mergeClasses(
          'rounded-lg border-gray-200 bg-white shadow-lg y-10 my-0.5 fixed z-10 max-w-full overflow-hidden border-1 border-l-0',
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
              <MenuItem
                option={option}
                onMouseMove={setMouseMode}
                onMouseEnter={() => handleHighlightOnMouseEnter(index)}
                onClick={() => handleItemSelection(option.id)}
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

export default ComboBox;
