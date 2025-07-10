import { forwardRef, useCallback } from 'react';
import AsyncComboBox from '../../../components/AsyncComboBox';
import { ComboBoxProps } from '../../../components/ComboBox';
import { Option } from '../../../types/comboBox.types';
import { objectToOption } from '../../../utils/dropdown.util';
import { getAllSolders } from '../../../api/solders';
import { User } from '../../../types/User';

const SoldersComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(function (
  { ...props }: ComboBoxProps,
  ref
) {
  const getSoldersOptions = useCallback<() => Promise<Option[]>>(async () => {
    const res = await getAllSolders();
    const solders = res?.data;

    if (!solders) return [];

    const options = solders.map((solder) => {
      const option: Option = objectToOption<User>(solder, '_id', 'fullName');
      return option;
    });

    return options;
  }, []);
  return (
    <AsyncComboBox
      ref={ref}
      id="solders"
      fetchOptions={getSoldersOptions}
      className="w-full"
      {...props}
    />
  );
});
export default SoldersComboBox;
