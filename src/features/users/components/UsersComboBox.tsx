import { forwardRef, useCallback } from 'react';
import AsyncComboBox from '../../../components/AsyncComboBox';
import { ComboBoxProps } from '../../../components/ComboBox';
import { Option } from '../../../types/comboBox.types';
import { objectToOption } from '../../../utils/dropdown.util';
import { getAllUsers } from '../../../api/users';
import { User } from '../../../types/User';

const UsersComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(function (
  { ...props }: ComboBoxProps,
  ref
) {
  const getUsersOptions = useCallback<() => Promise<Option[]>>(async () => {
    const res = await getAllUsers();
    const users = res?.data;

    if (!users) return [];

    const options = users.map((user) => {
      const option: Option = objectToOption<User>(user, '_id', 'fullName');
      return option;
    });

    return options;
  }, []);
  return (
    <AsyncComboBox
      ref={ref}
      id="users"
      fetchOptions={getUsersOptions}
      className="w-full"
      {...props}
    />
  );
});
export default UsersComboBox;
