import { useCallback, useContext, useMemo, useRef } from 'react';

import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import { FormSection } from '../../../../components/Form';

import { ModalContext } from '../../../../components/Modal/ModalContext';

import { useForm } from '../../../../components/Form/useForm';

import { validationSchema } from '../DepartmentsTable/constants';
import { DepartmentFormStrings } from '../CreateDepartmentForm/constants';
import { createDepartment } from '../../../../api/departments';
import { useTableContext } from '../../../../components/Table/context/TableContext';
import { initialDepartmentInfo } from './constants';
import { Department } from '../../../../types/Department';
import UsersComboBox from '../../../users/components/UsersComboBox';

function CreateDepartmentForm() {
  const { onClose } = useContext(ModalContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const { setRowData } = useTableContext<Department>();

  const onsubmit = useCallback(
    async (item: Department) => {
      const res: any = await createDepartment(item);
      if (res?.status === 'success') {
        setRowData((prev: Department[]) => [...prev, item]);
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
            initialDepartmentInfo[field.fieldName as keyof Department],
        };
      }),
    []
  );

  const { handleSubmit, handleCancel, registry } = useForm<Department>({
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
        headerTitle={DepartmentFormStrings.FORM_HEADER_TITLE}
        headerSubTitle={DepartmentFormStrings.FORM_HEADER_SUBTITLE}
        className="p-3"
      >
        <FormSection title={DepartmentFormStrings.SECTION_LABEL}>
          <div className="gap-x-5 gap-y-3 md:grid-cols-2 text-sm grid grid-cols-1">
            <Input
              {...registry['name']}
              label={DepartmentFormStrings.NAME_LABEL}
              id="name"
              ref={nameRef}
              iconName="Abc"
            />
            <div className="gap-x-5 gap-y-3 md:grid-cols-2 grid grid-cols-1">
              <UsersComboBox
                {...registry['officerId']}
                label={DepartmentFormStrings.OFFICER_LABEL}
                id="officer"
                ref={nameRef}
                iconName="Abc"
              />
              <UsersComboBox
                {...registry['sergeantId']}
                label={DepartmentFormStrings.NAME_LABEL}
                id="sergeant"
                ref={nameRef}
                iconName="Abc"
              />
            </div>
          </div>
        </FormSection>

        <div className="gap-5 mt-10 grid grid-cols-2">
          <div className="gap-5 col-start-2 grid grid-cols-2">
            <Button type="button" onClick={handleCancel}>
              {DepartmentFormStrings.CANCEL_BUTTON_TEXT}
            </Button>
            <Button type="submit">
              {DepartmentFormStrings.SUBMIT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  );
}

export default CreateDepartmentForm;
