export interface Option {
  id: string;
  label: string;
}

export interface ComboBoxOption extends Option {
  icon?: string | undefined;
}

export enum NavigationMode {
  KEYBOARD = 'keyboard',
  MOUSE = 'mouse',
}
