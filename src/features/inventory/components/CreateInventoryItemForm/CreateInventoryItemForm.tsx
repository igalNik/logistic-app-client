import { useCallback, useContext, useRef } from 'react';

import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import AsyncComboBox from '../../../../components/AsyncComboBox';
import { FormSection } from '../../../../components/Form';

import { ModalContext } from '../../../../components/Modal/ModalContext';

import { useForm } from '../../../../components/Form/useForm';

import {
  initialInventoryItemInfo,
  InventoryItemFormStrings,
} from '../CreateInventoryItemForm/constants';

import { objectToOption } from '../../../../utils/dropdown.util';

import { validationSchema } from '../InventoryTable/constants';
import { useTableContext } from '../../../../components/Table/context/TableContext';
import { getAllEquipmentTypes } from '../../../../api/equipmentType';
import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';
import { Option } from '../../../../types/comboBox.types';
import { InventoryItem } from '../../../../types/inventory/InventoryItem.type';
import { createInventoryItem } from '../../../../api/inventory';
import StringArrayInput from '../../../../components/StringArrayInput/StringArrayInput';

function CreateInventoryItemForm() {
  const { onClose } = useContext(ModalContext);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const { setRowData } = useTableContext<InventoryItem>();

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

  const onSubmit = useCallback(
    async (item: InventoryItem) => {
      const res: any = await createInventoryItem(item);
      if (res?.status === 'success') {
        setRowData((prev: InventoryItem[]) => [...prev, item as InventoryItem]);
      }
      return res;
    },

    [setRowData]
  );

  const { handleSubmit, handleCancel, registry } = useForm<InventoryItem>({
    formInitialization: {
      schema: validationSchema
        .filter(
          (field) =>
            (field.fieldName as keyof InventoryItem) in initialInventoryItemInfo
        )
        .map((field) => {
          const rawValue =
            initialInventoryItemInfo[field.fieldName as keyof InventoryItem];
          return {
            ...field,
            fieldName: field.fieldName as keyof InventoryItem,
            defaultValue:
              rawValue !== undefined && rawValue !== null
                ? String(rawValue)
                : undefined,
          };
        }),
    },
    onSubmit,
    onCancel: onClose,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Card
        headerTitle={InventoryItemFormStrings.FORM_HEADER_TITLE}
        headerSubTitle={InventoryItemFormStrings.FORM_HEADER_SUBTITLE}
        className="p-3"
      >
        <FormSection title={'הגדרת הפריט'}>
          <div className="gap-x-5 gap-y-3 md:grid-cols-2 grid-cols grid">
            <AsyncComboBox
              {...registry['equipmentTypeId']}
              label={InventoryItemFormStrings.ITEM_LABEL}
              id="equipment-type"
              tabIndex={1}
              placeholder={InventoryItemFormStrings.ITEM_PLACEHOLDER}
              fetchOptions={getEquipmentTypeOptions}
              className="w-full"
            />
            <Input
              type="number"
              {...registry['quantity']}
              label={InventoryItemFormStrings.QUANTITY_LABEL}
              id="quantity"
              tabIndex={2}
              ref={firstNameRef}
              iconName="Numeric"
            />

            <StringArrayInput
              {...registry['serialNumbers']}
              id="serial-numbers"
              label={'מק"טים'}
              tabIndex={3}
            />
          </div>
        </FormSection>

        <div className="gap-5 mt-10 grid grid-cols-2">
          <div className="gap-5 col-start-2 grid grid-cols-2">
            <Button type="button" tabIndex={8} onClick={handleCancel}>
              {InventoryItemFormStrings.CANCEL_BUTTON_TEXT}
            </Button>
            <Button type="submit" tabIndex={9}>
              {InventoryItemFormStrings.SUBMIT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  );
}

export default CreateInventoryItemForm;
