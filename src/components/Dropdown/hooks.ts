import { useState, useReducer, useRef, useCallback, useEffect } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { DropdownOption, NavigationMode } from '../../types/dropdown.types';
import { dropdownReducer } from './reducer';
import {
  DropdownAction,
  DropdownActionType,
  DropdownProps,
  DropdownState,
} from './types';

export const useDropdown = ({
  options = [],
  onOptionSelect,
  value,
}: DropdownProps) => {
  // reducer
  const [state, dispatch] = useReducer(
    (state: DropdownState, action: DropdownAction): DropdownState =>
      dropdownReducer(state, action, options),
    {
      showOptions: false,
      selected: value
        ? options.find((opt) => opt.id === value || opt.label === value) || null
        : null,
      inputValue: String(value) || '',
      highlightedIndex: null,
      navMode: NavigationMode.MOUSE,
      filteredOptions: options,
    }
  );

  const [clientRect, setClientRect] = useState<DOMRect | null>(null);

  const dropdownRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useClickOutside(dropdownRef, () =>
    dispatch({ type: DropdownActionType.CLOSE_DROPDOWN })
  );

  const handleItemSelection = useCallback(
    function (option: DropdownOption) {
      inputRef.current?.focus();

      dispatch({ type: DropdownActionType.CHOOSE_OPTION, option });

      if (onOptionSelect === undefined) return;

      onOptionSelect(option);
    },
    [onOptionSelect]
  );

  useEffect(() => {
    setClientRect(inputRef.current!.getBoundingClientRect());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('key');

      if (!dropdownRef.current?.contains(document.activeElement)) {
        return;
      }

      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch({ type: DropdownActionType.NAVIGATE_DOWN });
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch({ type: DropdownActionType.NAVIGATE_UP });
      }

      if (e.key === 'Enter') {
        const { showOptions, highlightedIndex } = state;

        if (showOptions && highlightedIndex !== null)
          handleItemSelection(state.filteredOptions[highlightedIndex]);
        else dispatch({ type: DropdownActionType.TOGGLE_DROPDOWN });
      }
      dispatch({
        type: DropdownActionType.SET_NAV_MODE,
        mode: NavigationMode.KEYBOARD,
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    state.highlightedIndex,
    state.filteredOptions,
    state.showOptions,
    handleItemSelection,
    state,
  ]);

  useEffect(() => {
    if (
      state.highlightedIndex !== null &&
      state.navMode === NavigationMode.KEYBOARD
    ) {
      itemRefs.current[state.highlightedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [state.highlightedIndex, state.navMode]);

  useEffect(() => {
    dispatch({ type: DropdownActionType.RESET_DROPDOWN });
  }, [options]);

  function handleInputChange(value: string) {
    dispatch({ type: DropdownActionType.SEARCH_OPTIONS, query: value });
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevents form submission if in a form
    }
  };

  const handleHighlightOnMouseEnter = (index: number) => {
    if (state.navMode === NavigationMode.MOUSE) {
      dispatch({
        type: DropdownActionType.SELECT_HIGHLIGHTED,
        index,
      });
    }
  };

  const setMouseMode = () => {
    dispatch({
      type: DropdownActionType.SET_NAV_MODE,
      mode: NavigationMode.MOUSE,
    });
  };

  const setKeyboardMode = () =>
    dispatch({
      type: DropdownActionType.SET_NAV_MODE,
      mode: NavigationMode.KEYBOARD,
    });

  return {
    state,
    dispatch,
    clientRect,
    dropdownRef,
    inputRef,
    itemRefs,

    setMouseMode,
    setKeyboardMode,
    handleItemSelection,
    handleInputChange,
    handleInputKeyDown,
    handleHighlightOnMouseEnter,
  };
};
