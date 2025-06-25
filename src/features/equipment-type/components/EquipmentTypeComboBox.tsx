import { forwardRef, useCallback } from 'react';
import AsyncComboBox from '../../../components/AsyncComboBox';
import { ComboBoxProps } from '../../../components/ComboBox';
import { Option } from '../../../types/comboBox.types';
import { getAllEquipmentTypes } from '../../../api/equipmentType';
import { objectToOption } from '../../../utils/dropdown.util';
import { EquipmentType } from '../../../types/equipment-type/EquipmentType';

const EquipmentTypeComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  function ({ ...props }: ComboBoxProps, ref) {
    const getEquipmentTypeOptions = useCallback<
      () => Promise<Option[]>
    >(async () => {
      const res = await getAllEquipmentTypes();
      const equipmentTypes = res?.data;

      if (!equipmentTypes) return [];

      const options = equipmentTypes.map((equipmentType) => {
        const option: Option = objectToOption<EquipmentType>(
          equipmentType,
          '_id',
          'name'
        );
        return option;
      });

      return options;
    }, []);
    return (
      <AsyncComboBox
        ref={ref}
        id="equipment-type"
        fetchOptions={getEquipmentTypeOptions}
        className="w-full"
        {...props}
      />
    );
  }
);
export default EquipmentTypeComboBox;
