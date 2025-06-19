import { useCallback, useContext, useRef } from 'react';

import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import AsyncComboBox from '../../../../components/AsyncComboBox';
import ComboBox from '../../../../components/ComboBox/ComboBox';
import { FormSection } from '../../../../components/Form';

import { ModalContext } from '../../../../components/Modal/ModalContext';

import { useForm } from '../../../../components/Form/useForm';

import { initialSolderInfo } from './constants';
import { SolderFormStrings } from './constants';
import { CreateSolder } from '../../../../types/solder/CreateSolder.type';
import { getAllDepartments } from '../../../../api/departments';
import { objectToOption } from '../../../../utils/dropdown.util';
import { Department } from '../../../../types/Department';
import { createSolder } from '../../../../api/solders';
import { validationSchema } from '../SoldersTable/constants';
import { User } from '../../../../types/User';
import { useTableContext } from '../../../../components/Table/context/TableContext';

function CreateSolderForm() {
  const { onClose } = useContext(ModalContext);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const { setRowData } = useTableContext<User>();

  const getDepartmentOptions = useCallback(async function () {
    const res = await getAllDepartments();
    const departments = res?.data;

    if (!departments) return [];

    const options = departments.map((department) =>
      objectToOption<Department>(department, '_id', 'name')
    );

    return options;
  }, []);

  const onSubmit = useCallback(
    async (item: CreateSolder) => {
      const res: any = await createSolder(item);
      if (res?.status === 'success') {
        setRowData((prev: User[]) => [...prev, item as User]);
      }
      return res;
    },

    [setRowData]
  );
  const { handleSubmit, handleCancel, registry } = useForm<CreateSolder>({
    formInitialization: {
      schema: validationSchema
        .filter(
          (field) =>
            (field.fieldName as keyof CreateSolder) in initialSolderInfo
        )
        .map((field) => {
          return {
            ...field,
            fieldName: field.fieldName as keyof CreateSolder,
            defaultValue:
              initialSolderInfo[field.fieldName as keyof CreateSolder],
          };
        }),
    },
    onSubmit,
    onCancel: onClose,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Card
        headerTitle={SolderFormStrings.FORM_HEADER_TITLE}
        headerSubTitle={SolderFormStrings.FORM_HEADER_SUBTITLE}
        className="p-3"
      >
        <FormSection title={'פרטים אישיים'}>
          <div className="gap-x-5 gap-y-3 md:grid-cols-2 grid grid-cols-1">
            <Input
              {...registry['firstName']}
              label={SolderFormStrings.FIRST_NAME_LABEL}
              id="first-name"
              tabIndex={1}
              ref={firstNameRef}
              iconName="Abc"
            />
            <Input
              {...registry['lastName']}
              label={SolderFormStrings.LAST_NAME_LABEL}
              id="last-name"
              tabIndex={2}
            />
            <Input
              {...registry['personalNumber']}
              label={SolderFormStrings.PERSONAL_NUMBER_LABEL}
              id="personal-number"
              tabIndex={3}
              iconName="Numbers"
            />
            <Input
              {...registry['phoneNumber']}
              label={SolderFormStrings.PHONE_NUMBER_LABEL}
              id="phone-number"
              iconName="Mobile"
              tabIndex={4}
            />
            <Input
              {...registry['email']}
              label={SolderFormStrings.EMAIL_LABEL}
              id="email"
              tabIndex={5}
              iconName="Email"
            />
          </div>
        </FormSection>
        <FormSection title="תפקיד ומחלקה">
          <div className="gap-x-5 gap-y-3 grid grid-cols-2">
            <AsyncComboBox
              {...registry['departmentId']}
              label={SolderFormStrings.DEPARTMENT_LABEL}
              id="department"
              tabIndex={6}
              placeholder={SolderFormStrings.DEPARTMENT_PLACEHOLDER}
              fetchOptions={getDepartmentOptions}
              className="w-full"
            />
            <ComboBox
              {...registry['role']}
              id="role"
              label={SolderFormStrings.ROLE_LABEL}
              tabIndex={7}
              placeholder={SolderFormStrings.ROLE_PLACEHOLDER}
              options={[
                { id: 'צלף', label: 'צלף' },
                { id: 'קלע', label: 'קלע' },
              ]}
              className={`w-full`}
            />
          </div>
        </FormSection>
        <div className="gap-5 mt-10 grid grid-cols-2">
          <div className="gap-5 col-start-2 grid grid-cols-2">
            <Button type="button" tabIndex={8} onClick={handleCancel}>
              {SolderFormStrings.CANCEL_BUTTON_TEXT}
            </Button>
            <Button type="submit" tabIndex={9}>
              {SolderFormStrings.SUBMIT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  );
}

export default CreateSolderForm;
