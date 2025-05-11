import { DropdownOption, NavigationMode } from '../../types/dropdown.types';
import { DropdownAction, DropdownActionType, DropdownState } from './types';

export const dropdownReducer = function (
  state: DropdownState,
  action: DropdownAction,
  options: DropdownOption[]
): DropdownState {
  switch (action.type) {
    case DropdownActionType.OPEN_DROPDOWN:
      return { ...state, showOptions: true };

    case DropdownActionType.CLOSE_DROPDOWN:
      return { ...state, showOptions: false };

    case DropdownActionType.TOGGLE_DROPDOWN:
      return { ...state, showOptions: !state.showOptions };

    case DropdownActionType.CHOOSE_OPTION:
      return {
        ...state,
        showOptions: false,
        selected: action.option,
        inputValue: action.option.label,
      };

    case DropdownActionType.SEARCH_OPTIONS:
      return {
        ...state,
        showOptions: true,
        selected: null,
        inputValue: action.query,
        highlightedIndex: null,
        filteredOptions: options.filter(
          (option) =>
            option.label.toLowerCase().includes(action.query.toLowerCase()) ||
            option.label
              .replace('"', '')
              .toLowerCase()
              .includes(action.query.toLowerCase())
        ),
      };

    case DropdownActionType.NAVIGATE_DOWN:
      return {
        ...state,
        showOptions: true,
        navMode: NavigationMode.KEYBOARD,
        highlightedIndex:
          state.highlightedIndex === null
            ? 0
            : state.highlightedIndex === state.filteredOptions.length - 1
              ? state.highlightedIndex
              : state.highlightedIndex + 1,
      };

    case DropdownActionType.NAVIGATE_UP:
      return {
        ...state,
        showOptions: true,
        navMode: NavigationMode.KEYBOARD,
        highlightedIndex:
          state.highlightedIndex === null
            ? 0
            : state.highlightedIndex === 0
              ? 0
              : state.highlightedIndex - 1,
      };

    case DropdownActionType.SELECT_HIGHLIGHTED:
      if (!state.filteredOptions[action.index]) return state;
      return { ...state, highlightedIndex: action.index };

    case DropdownActionType.RESET_DROPDOWN:
      return {
        showOptions: false,
        selected: null,
        inputValue: '',
        highlightedIndex: null,
        navMode: NavigationMode.MOUSE,
        filteredOptions: options,
      };
    case DropdownActionType.SET_NAV_MODE:
      return { ...state, navMode: action.mode };
    default:
      return state;
  }
};
