import { Option } from './../../types/dropdown.types';
import { DropdownProps } from '../Dropdown';

export interface AsyncDropdownProps extends DropdownProps {
  fetchOptions: () => Promise<Option[]>;
}
