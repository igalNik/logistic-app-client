import { HTMLAttributes } from "react";
import { DropdownOption, NavigationMode } from "../../types/dropdown.types";

interface OptionProps extends HTMLAttributes<HTMLLIElement> {
    option: DropdownOption;
}

function Option({...props}: OptionProps){
    return (
        <li
        onMouseEnter={() => {
          if (state.navMode === NavigationMode.MOUSE) {
            dispatch({
              type: DropdownActionType.SELECT_HIGHLIGHTED,
              index,
            });
          }
        }}
        onMouseMove={() =>
          dispatch({
            type: DropdownActionType.SET_NAV_MODE,
            mode: NavigationMode.MOUSE,
          })
        }
        ref={(el) => {
          itemRefs.current[index] = el;
        }}
        onClick={() => handleItemSelection(option)}
        key={option.id}
        aria-selected={state.selected?.label == option.label}
        className={mergeClasses(
          `${state.selected?.id === option.id ? 'bg-blue-100 border-blue-200 border-2' : ''}`,
          props.className,
          'py-2 px-4 rounded-lg gap-x-1 flex items-center hover:cursor-pointer',
          `px-4 py-2 ${
            index === state.highlightedIndex
              ? 'bg-blue-500 border-gray-300 text-white'
              : ''
          }`
        )}
      >
        {option.icon && (
          <Icon name={option.icon} className="text-gray-200" />
        )}
        <span className="">{`${option.label}`}</span>
      </li>
    );
};

export default option;
