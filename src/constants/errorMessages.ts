export enum ValidationError {
  REQUIRED = 'שדה זה הינו שדה חובה',
  EMAIL = 'כתובת דוא"ל לא תקינה',
  PHONE = 'מספר טלפון נייד לא תקין',
  ALPHA_HEBREW_OR_ENGLISH = 'חייב להכיל אותיות בעברית או באנגלית בלבד',
  NUMERIC = 'חייב להכיל ספרות בלבד',
  INVALID_DEPARTMENT_ID = 'מזהה מחלקה לא תקין', // Optional, for isObjectId
  INVALID_ROLE_ID = 'מזהה תפקיד לא תקין', // Optional, for isObjectId
}
