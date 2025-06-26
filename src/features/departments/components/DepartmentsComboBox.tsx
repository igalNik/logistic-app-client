import { forwardRef, useCallback } from 'react';
import AsyncComboBox from '../../../components/AsyncComboBox';
import { ComboBoxProps } from '../../../components/ComboBox';
import { objectToOption } from '../../../utils/dropdown.util';
import { getAllDepartments } from '../../../api/departments';
import { Department } from '../../../types/Department';

const DepartmentsComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  function ({ ...props }: ComboBoxProps, ref) {
    const getDepartmentOptions = useCallback(async function () {
      const res = await getAllDepartments();
      const departments = res?.data;

      if (!departments) return [];

      const options = departments.map((department) =>
        objectToOption<Department>(department, '_id', 'name')
      );

      return options;
    }, []);
    return (
      <AsyncComboBox
        ref={ref}
        id="departments"
        fetchOptions={getDepartmentOptions}
        className="w-full"
        {...props}
      />
    );
  }
);
export default DepartmentsComboBox;
