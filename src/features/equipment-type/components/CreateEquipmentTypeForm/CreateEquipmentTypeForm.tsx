import { useCallback, useContext, useMemo, useRef } from 'react';

import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import ComboBox from '../../../../components/ComboBox/ComboBox';
import { FormSection } from '../../../../components/Form';

import { ModalContext } from '../../../../components/Modal/ModalContext';

import { useForm } from '../../../../components/Form/useForm';

import { initialEquipmentTypeInfo } from '../CreateEquipmentTypeForm/constants';
// import { EquipmentTypeFormStrings } from './constants';

import { validationSchema } from '../EquipmentTypesTable/constants';
import { EquipmentTypeFormStrings } from '../CreateEquipmentTypeForm/constants';
import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';
import { createEquipmentType } from '../../../../api/equipmentType';
import { PROVIDER_OPTIONS } from '../../../../constants/dropdownOptions';
import { useTableContext } from '../../../../components/Table/context/TableContext';
import Checkbox from '../../../../components/Checkbox';

function CreateEquipmentTypeForm() {
  const { onClose } = useContext(ModalContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const { setRowData } = useTableContext<EquipmentType>();

  const onsubmit = useCallback(
    async (item: EquipmentType) => {
      const res: any = await createEquipmentType(item);
      if (res?.status === 'success') {
        setRowData((prev: EquipmentType[]) => [...prev, item]);
      }
      return res;
    },
    [setRowData]
  );

  const schema = useMemo(
    () =>
      validationSchema.map((field: any) => {
        return {
          ...field,
          defaultValue:
            initialEquipmentTypeInfo[field.fieldName as keyof EquipmentType],
        };
      }),
    []
  );

  const { handleSubmit, handleCancel, registry } = useForm<EquipmentType>({
    formInitialization: {
      schema,
    },
    onSubmit: onsubmit,
    onCancel: onClose,
  });
  console.log(registry);

  return (
    <Form onSubmit={handleSubmit}>
      <Card
        headerTitle={EquipmentTypeFormStrings.FORM_HEADER_TITLE}
        headerSubTitle={EquipmentTypeFormStrings.FORM_HEADER_SUBTITLE}
        className="p-3"
      >
        <FormSection title={EquipmentTypeFormStrings.SECTION_LABEL}>
          <div className="gap-x-5 gap-y-3 md:grid-cols-2 grid grid-cols-1">
            <Input
              {...registry['name']}
              label={EquipmentTypeFormStrings.NAME_LABEL}
              id="name"
              tabIndex={1}
              ref={nameRef}
              iconName="Abc"
            />
            <Input
              {...registry['description']}
              label={EquipmentTypeFormStrings.DESCRIPTION_LABEL}
              id="last-name"
              tabIndex={2}
            />
            <ComboBox
              {...registry['provider']}
              id="role"
              label={EquipmentTypeFormStrings.PROVIDER_LABEL}
              tabIndex={7}
              placeholder={EquipmentTypeFormStrings.PROVIDER_PLACEHOLDER}
              options={PROVIDER_OPTIONS}
              className={`w-full`}
            />
            <div className="py-2 flex h-full w-fit items-end justify-end">
              <Checkbox
                {...registry['hasSerialNumber']}
                id="has-serial-number"
                label={EquipmentTypeFormStrings.HAS_SERIAL_NUMBER}
                className="w-fit justify-end hover:opacity-100"
              />
            </div>
          </div>
        </FormSection>

        <div className="gap-5 mt-10 grid grid-cols-2">
          <div className="gap-5 col-start-2 grid grid-cols-2">
            <Button type="button" tabIndex={8} onClick={handleCancel}>
              {EquipmentTypeFormStrings.CANCEL_BUTTON_TEXT}
            </Button>
            <Button type="submit" tabIndex={9}>
              {EquipmentTypeFormStrings.SUBMIT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  );
}

export default CreateEquipmentTypeForm;
