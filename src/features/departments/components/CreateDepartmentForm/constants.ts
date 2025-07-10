import { Department } from '../../../../types/Department';

export const initialDepartmentInfo: Department = {
  _id: '',
  name: '',
  officerId: '',
  sergeantId: '',
};

export enum DepartmentFormStrings {
  FORM_HEADER_TITLE = 'הוספת מחלקה חדשה',
  FORM_HEADER_SUBTITLE = 'מלא את הפרטים להוספת מחלקה חדשה למערכת',
  SECTION_LABEL = 'פרטי המחלקה',
  NAME_LABEL = 'שם המחלקה',
  OFFICER_LABEL = 'מפקד מחלקה',
  OFFICER_PLACEHOLDER = 'בחירת מפקד מחלקה',
  SERGEANT_LABEL = 'סמל',
  SERGEANT_PLACEHOLDER = 'בחירת סמל',

  SUBMIT_BUTTON_TEXT = 'שמירה',
  CANCEL_BUTTON_TEXT = 'ביטול',
}
// sergeantId
