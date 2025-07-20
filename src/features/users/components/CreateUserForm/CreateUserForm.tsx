import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form';
import ComboBox from '../../../../components/ComboBox/ComboBox';
import { FormSection } from '../../../../components/Form';

import { ModalContext } from '../../../../components/Modal/ModalContext';

import { useForm } from '../../../../components/Form/useForm';

import { UserFormStrings } from './constants';

import { validationSchema } from '../UsersTable/constants';
import { User } from '../../../../types/User';
import { useTableContext } from '../../../../components/Table/context/TableContext';
import { ROLES_OPTIONS } from '../../../../constants/dropdownOptions';
import DepartmentsComboBox from '../../../departments/components/DepartmentsComboBox';
import { useSearchParams } from 'react-router-dom';
import { CreateUserRequest } from '../../../../api/types/request.type';
import { useCreateUser } from '../../../../api/queries/users';

const initialUserInfo: User = {
  _id: '',
  id: '',
  personalNumber: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  role: '',
  department: { name: '', id: '' },
  fullName: '',
  departmentId: '',
};

function CreateUserForm() {
  const { onClose } = useContext(ModalContext);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const {
    state: { rowData },
    // setRowData,
  } = useTableContext<User>();
  const [searchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState<CreateUserRequest>(initialUserInfo);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const data = rowData.find((solder) => solder._id === id) as User;

      setUserInfo(data);
    }
  }, [rowData, searchParams]);

  const createUser = useCreateUser();

  const onSubmit = useCallback(
    (item: CreateUserRequest) => {
      createUser.mutate(item);
    },
    [createUser]
    // [setRowData]
  );
  const schema = useMemo(
    () =>
      validationSchema
        .filter(
          (field) => (field.fieldName as keyof CreateUserRequest) in userInfo
        )
        .map((field) => {
          const data = {
            ...field,
            fieldName: field.fieldName as keyof CreateUserRequest,
            defaultValue: userInfo[field.fieldName as keyof CreateUserRequest],
          };

          return data;
        }),
    [userInfo]
  );
  // console.log('schema: ', schema);

  const { handleSubmit, handleCancel, registry } = useForm<CreateUserRequest>({
    formInitialization: {
      schema,
    },
    onSubmit,
    onCancel: onClose,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Card
        headerTitle={UserFormStrings.FORM_HEADER_TITLE}
        headerSubTitle={UserFormStrings.FORM_HEADER_SUBTITLE}
        className="p-3"
      >
        <FormSection title={'פרטים אישיים'}>
          <div className="gap-x-5 gap-y-3 md:grid-cols-2 grid grid-cols-1">
            <Input
              {...registry['firstName']}
              label={UserFormStrings.FIRST_NAME_LABEL}
              id="first-name"
              tabIndex={1}
              ref={firstNameRef}
              iconName="Abc"
            />
            <Input
              {...registry['lastName']}
              label={UserFormStrings.LAST_NAME_LABEL}
              id="last-name"
              tabIndex={2}
            />
            <Input
              {...registry['personalNumber']}
              label={UserFormStrings.PERSONAL_NUMBER_LABEL}
              id="personal-number"
              tabIndex={3}
              iconName="Numbers"
            />
            <Input
              {...registry['phoneNumber']}
              label={UserFormStrings.PHONE_NUMBER_LABEL}
              id="phone-number"
              iconName="Mobile"
              tabIndex={4}
            />
            <Input
              {...registry['email']}
              label={UserFormStrings.EMAIL_LABEL}
              id="email"
              tabIndex={5}
              iconName="Email"
            />
          </div>
        </FormSection>
        <FormSection title="תפקיד ומחלקה">
          <div className="gap-x-5 gap-y-3 grid grid-cols-2">
            <DepartmentsComboBox
              {...registry['departmentId']}
              label={UserFormStrings.DEPARTMENT_LABEL}
              id="departments"
              tabIndex={6}
              placeholder={UserFormStrings.DEPARTMENT_PLACEHOLDER}
              className="w-full"
            />
            <ComboBox
              {...registry['role']}
              id="role"
              label={UserFormStrings.ROLE_LABEL}
              tabIndex={7}
              placeholder={UserFormStrings.ROLE_PLACEHOLDER}
              options={ROLES_OPTIONS}
              className={`w-full`}
            />
          </div>
        </FormSection>
        <div className="gap-5 mt-10 grid grid-cols-2">
          <div className="gap-5 col-start-2 grid grid-cols-2">
            <Button type="button" tabIndex={8} onClick={handleCancel}>
              {UserFormStrings.CANCEL_BUTTON_TEXT}
            </Button>
            <Button type="submit" tabIndex={9}>
              {UserFormStrings.SUBMIT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  );
}

export default CreateUserForm;
