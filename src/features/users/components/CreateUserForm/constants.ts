import { CreateUserRequest } from 'api/types/request.type';

// Data Constants
export const initialUserInfo: CreateUserRequest = {
  personalNumber: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  role: '',
  departmentId: '',
};

// Form UI Strings
export enum UserFormStrings {
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
