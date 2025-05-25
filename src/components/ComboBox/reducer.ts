import { ComboBoxOption, NavigationMode } from '../../types/comboBox.types';
import { ComboBoxAction, ComboBoxActionType, ComboBoxState } from './types';

export const dropdownReducer = function (
  state: ComboBoxState,
  action: ComboBoxAction,
  options: ComboBoxOption[]
): ComboBoxState {
  switch (action.type) {
    case ComboBoxActionType.OPEN_COMBO_BOX:
      return { ...state, showOptions: true };

    case ComboBoxActionType.CLOSE_COMBO_BOX:
      return { ...state, showOptions: false };

    case ComboBoxActionType.TOGGLE_COMBO_BOX:
      return { ...state, showOptions: !state.showOptions };

    case ComboBoxActionType.CHOOSE_OPTION: {
      const selectedOption = options.find(
        (option) => option.id === action.value
      )!;
      return {
        ...state,
        showOptions: false,
        selected: selectedOption,
        inputValue: selectedOption.label || state.inputValue,
      };
    }

    case ComboBoxActionType.SEARCH_OPTIONS:
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

    case ComboBoxActionType.NAVIGATE_DOWN:
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

    case ComboBoxActionType.NAVIGATE_UP:
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

    case ComboBoxActionType.SELECT_HIGHLIGHTED:
      if (!state.filteredOptions[action.index]) return state;
      return { ...state, highlightedIndex: action.index };

    case ComboBoxActionType.RESET_COMBO_BOX:
      return {
        showOptions: false,
        selected: null,
        inputValue: '',
        highlightedIndex: null,
        navMode: NavigationMode.MOUSE,
        filteredOptions: options,
      };
    case ComboBoxActionType.SET_NAV_MODE:
      return { ...state, navMode: action.mode };

    case ComboBoxActionType.SYNC_COMBO_BOX:
      return {
        ...state,
        inputValue: action.selected?.label || '',
        filteredOptions: options,
        selected: action.selected,
        highlightedIndex: options.findIndex(
          (opt) => opt.id === action.selected?.id
        ),
      };

    default:
      return state;
  }
};
