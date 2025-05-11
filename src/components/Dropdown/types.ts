import { InputHTMLAttributes } from 'react';
import { DropdownOption, NavigationMode } from '../../types/dropdown.types';

export interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number | undefined;
  label: string;
  options?: DropdownOption[];
  onOptionSelect?: (option: DropdownOption) => void;
}

export enum DropdownActionType {
  OPEN_DROPDOWN = 'OPEN_DROPDOWN',
  CLOSE_DROPDOWN = 'CLOSE_DROPDOWN',
  TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN',
  CHOOSE_OPTION = 'CHOOSE_OPTION',
  SEARCH_OPTIONS = 'SEARCH_OPTIONS',
  NAVIGATE_DOWN = 'NAVIGATE_DOWN',
  NAVIGATE_UP = 'NAVIGATE_UP',
  SELECT_HIGHLIGHTED = 'SELECT_HIGHLIGHTED',
  RESET_DROPDOWN = 'RESET_DROPDOWN',
  SET_NAV_MODE = 'SET_NAV_MODE',
}

export type DropdownAction =
  | { type: DropdownActionType.OPEN_DROPDOWN }
  | { type: DropdownActionType.CLOSE_DROPDOWN }
  | { type: DropdownActionType.TOGGLE_DROPDOWN }
  | { type: DropdownActionType.CHOOSE_OPTION; option: DropdownOption }
  | { type: DropdownActionType.SEARCH_OPTIONS; query: string }
  | { type: DropdownActionType.NAVIGATE_DOWN }
  | { type: DropdownActionType.NAVIGATE_UP }
  | { type: DropdownActionType.SELECT_HIGHLIGHTED; index: number }
  | { type: DropdownActionType.RESET_DROPDOWN }
  | { type: DropdownActionType.SET_NAV_MODE; mode: NavigationMode };

export interface DropdownState {
  showOptions: boolean;
  selected: DropdownOption | null;
  inputValue: string;
  highlightedIndex: number | null;
  navMode: NavigationMode;
  filteredOptions: DropdownOption[];
}
