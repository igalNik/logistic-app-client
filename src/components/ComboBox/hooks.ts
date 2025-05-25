import {
  useState,
  useReducer,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  ChangeEventHandler,
} from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { NavigationMode } from '../../types/comboBox.types';
import { dropdownReducer } from './reducer';
import {
  ComboBoxAction,
  ComboBoxActionType,
  ComboBoxProps,
  ComboBoxState,
} from './types';

export function useComboBox({ options = [], value, onChange }: ComboBoxProps) {
  const [clientRect, setClientRect] = useState<DOMRect | null>(null);

  const reducer = useCallback(
    (state: ComboBoxState, action: ComboBoxAction): ComboBoxState =>
      dropdownReducer(state, action, options),
    [options]
  );

  const initialState: ComboBoxState = useMemo<ComboBoxState>(() => {
    const defaultIndex = options.findIndex(
      (opt) => opt.id === value || opt.label === value
    );

    return {
      showOptions: false,
      selected: options[defaultIndex],
      inputValue: options[defaultIndex]?.label,
      highlightedIndex: defaultIndex,
      navMode: NavigationMode.MOUSE,
      filteredOptions: options,
    };
  }, [[JSON.stringify(options)], value]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const comboBoxRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useClickOutside(comboBoxRef, () =>
    dispatch({ type: ComboBoxActionType.CLOSE_COMBO_BOX })
  );

  const handleItemSelection: (value: string) => void = useCallback(
    (value) => {
      inputRef.current?.focus();
      dispatch({ type: ComboBoxActionType.CHOOSE_OPTION, value });

      onChange?.(value);
    },
    [onChange]
  );

  useEffect(() => {
    setClientRect(inputRef.current!.getBoundingClientRect());
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!comboBoxRef.current?.contains(document.activeElement)) {
        return;
      }

      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        dispatch({ type: ComboBoxActionType.NAVIGATE_DOWN });
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        dispatch({ type: ComboBoxActionType.NAVIGATE_UP });
      }

      if (e.key === 'Enter') {
        const { showOptions, highlightedIndex } = state;

        if (showOptions && highlightedIndex !== null)
          handleItemSelection(state.filteredOptions[highlightedIndex].id);
        else dispatch({ type: ComboBoxActionType.TOGGLE_COMBO_BOX });
      }
      dispatch({
        type: ComboBoxActionType.SET_NAV_MODE,
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
    dispatch({
      type: ComboBoxActionType.SYNC_COMBO_BOX,
      selected:
        options.find((opt) => opt.id === value || opt.label === value) || null,
    });
  }, [options, value]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: ComboBoxActionType.SEARCH_OPTIONS,
      query: event.target.value,
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevents form submission if in a form
    }
  };

  const handleHighlightOnMouseEnter = (index: number) => {
    if (state.navMode === NavigationMode.MOUSE) {
      dispatch({
        type: ComboBoxActionType.SELECT_HIGHLIGHTED,
        index,
      });
    }
  };

  const setMouseMode = () => {
    dispatch({
      type: ComboBoxActionType.SET_NAV_MODE,
      mode: NavigationMode.MOUSE,
    });
  };

  const setKeyboardMode = () =>
    dispatch({
      type: ComboBoxActionType.SET_NAV_MODE,
      mode: NavigationMode.KEYBOARD,
    });

  return {
    state,
    dispatch,
    clientRect,
    comboBoxRef,
    inputRef,
    itemRefs,

    setMouseMode,
    setKeyboardMode,
    handleItemSelection,
    handleInputChange,
    handleInputKeyDown,
    handleHighlightOnMouseEnter,
  };
}
