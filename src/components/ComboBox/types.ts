import { ComboBoxOption, NavigationMode } from '../../types/comboBox.types';

// export interface ComboBoxProps extends InputHTMLAttributes<HTMLInputElement> {
export interface ComboBoxProps {
  id?: string;
  label?: string;
  options?: ComboBoxOption[];
  value?: string | number | undefined;
  defaultValue?: string;
  className?: string;
  tabIndex?: number;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onClear?: () => void;
  iconName?: string;
}

export enum ComboBoxActionType {
  OPEN_COMBO_BOX = 'OPEN_COMBO_BOX',
  CLOSE_COMBO_BOX = 'CLOSE_COMBO_BOX',
  TOGGLE_COMBO_BOX = 'TOGGLE_COMBO_BOX',
  CHOOSE_OPTION = 'CHOOSE_OPTION',
  SEARCH_OPTIONS = 'SEARCH_OPTIONS',
  NAVIGATE_DOWN = 'NAVIGATE_DOWN',
  NAVIGATE_UP = 'NAVIGATE_UP',
  SELECT_HIGHLIGHTED = 'SELECT_HIGHLIGHTED',
  SYNC_COMBO_BOX = 'SYNC_COMBO_BOX',
  RESET_COMBO_BOX = 'RESET_COMBO_BOX',
  SET_NAV_MODE = 'SET_NAV_MODE',
}

export type ComboBoxAction =
  | { type: ComboBoxActionType.OPEN_COMBO_BOX }
  | { type: ComboBoxActionType.CLOSE_COMBO_BOX }
  | { type: ComboBoxActionType.TOGGLE_COMBO_BOX }
  | { type: ComboBoxActionType.CHOOSE_OPTION; value: string }
  | { type: ComboBoxActionType.SEARCH_OPTIONS; query: string }
  | { type: ComboBoxActionType.NAVIGATE_DOWN }
  | { type: ComboBoxActionType.NAVIGATE_UP }
  | { type: ComboBoxActionType.SELECT_HIGHLIGHTED; index: number }
  | { type: ComboBoxActionType.SYNC_COMBO_BOX; selected: ComboBoxOption | null }
  | { type: ComboBoxActionType.RESET_COMBO_BOX }
  | { type: ComboBoxActionType.SET_NAV_MODE; mode: NavigationMode };

export interface ComboBoxState {
  showOptions: boolean;
  selected: ComboBoxOption | null;
  inputValue: string;
  highlightedIndex: number | null;
  navMode: NavigationMode;
  filteredOptions: ComboBoxOption[];
}
