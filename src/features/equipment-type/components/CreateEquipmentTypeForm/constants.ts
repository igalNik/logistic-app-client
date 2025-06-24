import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';

export const initialEquipmentTypeInfo: EquipmentType = {
  id: '',
  name: '',
  description: '',
  provider: 'אחר',
};

export enum EquipmentTypeFormStrings {
  FORM_HEADER_TITLE = 'הוספת ציוד חדש',
  FORM_HEADER_SUBTITLE = 'מלא את הפרטים להוספת ציוד חדש למערכת',
  SECTION_LABEL = 'פרטי הציוד',
  NAME_LABEL = 'שם הציוד',
  DESCRIPTION_LABEL = 'תיאור הציוד',
  PROVIDER_LABEL = 'ספק הציוד',
  PROVIDER_PLACEHOLDER = 'בחירת ספק',
  HAS_SERIAL_NUMBER = 'קיים מספר סידורי',

  SUBMIT_BUTTON_TEXT = 'שמירה',
  CANCEL_BUTTON_TEXT = 'ביטול',
}
