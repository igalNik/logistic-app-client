import { FormEvent } from 'react';
import Card from '../../../../components/Card/Card';
import Input from '../../../../components/Input';
import AsyncDropdown from '../../../../components/AsyncDropdown';
import Dropdown from '../../../../components/Dropdown/Dropdown';
import Button from '../../../../components/Button';
import { createSolder } from '../../../../api/solders';

import { useCreateSolderForm } from './hooks';

function CreateSolderForm() {
  const {
    solderInfo,
    firstNameRef,
    inputChangeHandlers,
    handleODepartmentSelect,
    getDepartmentOptions,
    handleRoleSelect,
  } = useCreateSolderForm();

  const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createSolder(solderInfo);
  };

  return (
    <Card
      headerTitle="הוספת חייל"
      headerSubTitle="מלא את הפרטים להוספת חייל חדש למערכת"
      className="text-white p-3"
    >
      <form
        onSubmit={handleSubmit}
        // className="gap-x-5 gap-y-3 mb-6 flex flex-wrap"
        className="gap-x-5 gap-y-3 grid grid-cols-2 grid-rows-4"
      >
        <Input
          label="שם פרטי"
          id="first-name"
          tabIndex={1}
          ref={firstNameRef}
          iconName="Search"
          value={solderInfo.firstName}
          onInputChange={inputChangeHandlers.firstName}
        />
        <Input
          label="שם משפחה"
          id="last-name"
          tabIndex={2}
          onInputChange={inputChangeHandlers.lastName}
        />
        <Input
          label="מס' אישי"
          id="personal-number"
          tabIndex={3}
          onInputChange={inputChangeHandlers.personalNumber}
        />
        <Input
          label="נייד"
          id="phone-number"
          tabIndex={4}
          onInputChange={inputChangeHandlers.phoneNumber}
        />
        <Input
          label='דוא"ל'
          id="email"
          tabIndex={5}
          onInputChange={inputChangeHandlers.email}
        />

        <AsyncDropdown
          label="מחלקה"
          id="department"
          tabIndex={6}
          placeholder="בחירת מחלקה"
          fetchOptions={getDepartmentOptions}
          onOptionSelect={handleODepartmentSelect}
          className="w-full"
        />
        <Dropdown
          id="role"
          label="תפקיד"
          tabIndex={7}
          placeholder="בחירת תפקיד"
          options={[
            { id: '1', label: 'צלף' },
            { id: '2', label: 'קלע' },
          ]}
          onOptionSelect={handleRoleSelect}
          className={`w-full`}
        />

        <Button type="submit">
          <span>שמירה</span>
        </Button>
      </form>
    </Card>
  );
}

export default CreateSolderForm;
