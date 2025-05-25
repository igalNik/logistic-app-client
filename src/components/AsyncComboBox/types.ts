import { Option } from '../../types/comboBox.types';
import { ComboBoxProps } from '../ComboBox';

export interface AsyncComboBoxProps extends ComboBoxProps {
  fetchOptions: () => Promise<Option[]>;
}
