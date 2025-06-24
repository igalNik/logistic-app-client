import { Option } from '../types/comboBox.types';
export const objectToOption = function <T>(
  obj: T,
  idField: keyof T,
  labelField: keyof T
): Option {
  const option: Option = {
    id: String(obj[idField]),
    label: String(obj[labelField]),
  };
  if (!option.id || !option.label) throw new Error('invalid option');

  return option;
};
