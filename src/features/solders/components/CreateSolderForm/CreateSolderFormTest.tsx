import {
  FormEvent,
  MouseEventHandler,
  useCallback,
  useContext,
  useState,
} from 'react';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import AsyncDropdown from '../../../../components/AsyncComboBox';
import Dropdown from '../../../../components/ComboBox/ComboBox';
import Button from '../../../../components/Button';
import { createSolder } from '../../../../api/solders';
import { SolderFormStrings } from './constants';
import { useCreateSolderForm } from './hooks';
import { ModalContext } from '../../../../components/Modal/ModalContext';
import Form from '../../../../components/Form';
import { FormSection } from '../../../../components/Form';
import { validator } from '@igalni/logistic-validation';
import {
  FieldSchema,
  FormSchema,
  useFormValidation,
  UseFormValidationProps,
} from '../../../../components/Form/useFormValidation';
import { CreateSolder } from '../../../../types/solder/CreateSolder.type';
import { useForm } from '../../../../components/Form/useForm';

function CreateSolderFormTest() {
  const { onClose } = useContext(ModalContext);

  const validationSchema: FieldSchema<CreateSolder>[] = [
    {
      fieldName: 'firstName',
      validation: validator(solderInfo.firstName).required().min(2).max(20),
      eventTypes: ['onBlur'],
    },
    {
      fieldName: 'lastName',
      validation: validator(solderInfo.firstName).required().min(2).max(20),
      eventTypes: ['onBlur'],
    },
    {
      fieldName: 'personalNumber',
      validation: validator(solderInfo.personalNumber)
        .required()
        .isValidIsraeliMobileNumber(),
      eventTypes: ['onBlur'],
    },
    {
      fieldName: 'phoneNumber',
      validation: validator(solderInfo.personalNumber)
        .required()
        .isValidIsraeliMobileNumber(),
      eventTypes: ['onBlur'],
    },
    {
      fieldName: 'email',
      validation: validator(solderInfo.personalNumber)
        .required()
        .isValidEmail(),
      eventTypes: ['onBlur'],
    },
    {
      fieldName: 'role',
      validation: validator(solderInfo.role).required(),
      eventTypes: ['onBlur'],
    },
    {
      fieldName: 'departmentId',
      validation: validator(solderInfo.role).required(),
      eventTypes: ['onBlur'],
    },
  ];
  const onSubmit = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  };

  const onCancel: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
    onClose();
  };

  const { formData, handleSubmit, handleCancel, registry } =
    useForm<CreateSolder>({
      formInitialization: {
        schema: validationSchema,
      },
      onSubmit: onSubmit,
      onCancel: onCancel,
    });
  console.log(Card.name);

  return (
    <Card
      headerTitle={SolderFormStrings.FORM_HEADER_TITLE}
      headerSubTitle={SolderFormStrings.FORM_HEADER_SUBTITLE}
      className="text-white p-3"
    >
      <Form onSubmit={handleSubmit}>
        <FormSection title={'פרטים אישיים'}>
          <div className="gap-x-5 gap-y-3 md:grid-cols-2 grid grid-cols-1">
            <Input
              {...registry['firstName']}
              label={SolderFormStrings.FIRST_NAME_LABEL}
              id="first-name"
              tabIndex={1}
              ref={firstNameRef}
              value={solderInfo.firstName}
              iconName="Abc"
              onInputChange={inputChangeHandlers.firstName}
            />
            <Input
              {...registry['lastName']}
              label={SolderFormStrings.LAST_NAME_LABEL}
              id="last-name"
              tabIndex={2}
              onInputChange={inputChangeHandlers.lastName}
            />
            <Input
              {...registry['personalNumber']}
              label={SolderFormStrings.PERSONAL_NUMBER_LABEL}
              id="personal-number"
              tabIndex={3}
              iconName="Numbers"
              onInputChange={inputChangeHandlers.personalNumber}
            />
            <Input
              {...registry['phoneNumber']}
              label={SolderFormStrings.PHONE_NUMBER_LABEL}
              id="phone-number"
              iconName="Mobile"
              tabIndex={4}
              onInputChange={inputChangeHandlers.phoneNumber}
            />
            <Input
              {...registry['email']}
              label={SolderFormStrings.EMAIL_LABEL}
              id="email"
              tabIndex={5}
              iconName="Email"
              onInputChange={inputChangeHandlers.email}
            />
          </div>
        </FormSection>
        <FormSection title="תפקיד ומחלקה">
          <div className="gap-x-5 gap-y-3 grid grid-cols-2">
            <AsyncDropdown
              {...registry['departmentId']}
              label={SolderFormStrings.DEPARTMENT_LABEL}
              id="department"
              tabIndex={6}
              placeholder={SolderFormStrings.DEPARTMENT_PLACEHOLDER}
              fetchOptions={getDepartmentOptions}
              onOptionSelect={handleODepartmentSelect}
              className="w-full"
            />
            <Dropdown
              {...registry['role']}
              id="role"
              label={SolderFormStrings.ROLE_LABEL}
              tabIndex={7}
              placeholder={SolderFormStrings.ROLE_PLACEHOLDER}
              options={[
                { id: '1', label: 'צלף' },
                { id: '2', label: 'קלע' },
              ]}
              onOptionSelect={handleRoleSelect}
              className={`w-full`}
              {...registry['role']}
            />
          </div>
        </FormSection>
        <div className="gap-5 mt-10 grid grid-cols-2">
          <div className="gap-5 col-start-2 grid grid-cols-2">
            <Button type="button" tabIndex={8} onClick={handleCancel}>
              {SolderFormStrings.CANCEL_BUTTON_TEXT}
            </Button>
            <Button type="submit" tabIndex={8} className="">
              {SolderFormStrings.SUBMIT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default CreateSolderFormTest;
