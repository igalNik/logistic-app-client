import { InventoryItem } from '../../../../types/inventory/InventoryItem.type';

// Data Constants
export const initialInventoryItemInfo: InventoryItem = {
  id: '',
  quantity: NaN,
  serialNumbers: undefined,
  equipmentTypeId: '',
};

// Form UI Strings
export enum InventoryItemFormStrings {
  FORM_HEADER_TITLE = 'הוספת פריט למלאי',
  FORM_HEADER_SUBTITLE = 'מלא את הפרטים להוספת פריט חדש למלאי',

  ITEM_LABEL = 'פריט',
  ITEM_PLACEHOLDER = 'בחירת פריט',
  QUANTITY_LABEL = 'כמות',
  SUBMIT_BUTTON_TEXT = 'שמירה',
  CANCEL_BUTTON_TEXT = 'ביטול',
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
