import { CreateSolder } from '../../../../types/solder/CreateSolder.type';
import { Option } from '../../../../types/comboBox.types';

// Data Constants
export const initialSolderInfo: CreateSolder = {
  personalNumber: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  role: '',
  departmentId: '',
};

// Form UI Strings
export enum SolderFormStrings {
  FORM_HEADER_TITLE = 'הוספת חייל',
  FORM_HEADER_SUBTITLE = 'מלא את הפרטים להוספת חייל חדש למערכת',
  FIRST_NAME_LABEL = 'שם פרטי',
  LAST_NAME_LABEL = 'שם משפחה',
  PERSONAL_NUMBER_LABEL = "מס' אישי",
  PHONE_NUMBER_LABEL = 'נייד',
  EMAIL_LABEL = 'דוא"ל',
  DEPARTMENT_LABEL = 'מחלקה',
  DEPARTMENT_PLACEHOLDER = 'בחירת מחלקה',
  ROLE_LABEL = 'תפקיד',
  ROLE_PLACEHOLDER = 'בחירת תפקיד',
  SUBMIT_BUTTON_TEXT = 'שמירה',
  CANCEL_BUTTON_TEXT = 'ביטול',
  SNIPER_LABEL = 'צלף',
  MARKSMAN_LABEL = 'קלע',
}

export enum ValidationError {
  REQUIRED = 'שדה זה הינו שדה חובה',
  EMAIL = 'כתובת דוא"ל לא תקינה',
  PHONE = 'מספר טלפון נייד לא תקין',
  ALPHA_HEBREW_OR_ENGLISH = 'חייב להכיל אותיות בעברית או באנגלית בלבד',
  NUMERIC = 'חייב להכיל ספרות בלבד',
  INVALID_DEPARTMENT_ID = 'מזהה מחלקה לא תקין', // Optional, for isObjectId
  INVALID_ROLE_ID = 'מזהה תפקיד לא תקין', // Optional, for isObjectId
}

export const roles: Option[] = [
  { id: '1', label: 'צלף' },
  { id: '2', label: 'קלע' },
];
