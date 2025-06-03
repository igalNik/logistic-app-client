export enum errorMessages {
  required = 'שדה חובה',
  min = 'יש להזין לפחות 2 תווים',
  max = 'לא ניתן להזין יותר מ-20 תווים',
  isAlphaHebrewOrEnglish = 'ניתן להזין אותיות בעברית או באנגלית — אך לא לשלב ביניהן',
  isAlphaNumericHebrewOrEnglish = 'ניתן להזין רק אותיות בעברית או באנגלית או מספרים',
  isAlphaNumeric = 'ניתן להזין רק אותיות באנגלית או מספרים',
  isNumeric = 'ניתן להזין רק מספרים',
  isAlpha = 'ניתן להזין רק אותיות',
  isValidEmail = 'כתובת מייל לא תקינה',
  isValidIsraeliMobileNumber = 'מחלקה לא תקינה',
}

export interface FormErrors {
  [key: string]: string[];
}
