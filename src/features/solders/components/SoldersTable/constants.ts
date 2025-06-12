import { ColDef } from 'ag-grid-community';
import { validator } from '@igalni/logistic-validation';
import { FieldValidationSchema } from '../../../../components/Table/types';
import { User } from '../../../../types/User';

const departments = [
  {
    id: '67ac6a2c14fea674ff4940d5',
    name: 'מפל"ג',
  },
  {
    id: '67b1bbc0b5bee4b6a5205544',
    name: 'צלפים',
  },
  {
    id: '67d17ebdf25484edec1b3605',
    name: 'רתק',
  },
  {
    id: '67d17ecff25484edec1b3608',
    name: 'פינוי',
  },
  {
    id: '67d185af240afdbe8ad0200e',
    name: 'מרגמות',
  },
];
export const tableConfig: ColDef[] = [
  {
    field: 'personalNumber',
    headerName: 'מספר אישי',
    headerTooltip: 'מספר אישי',
  },
  {
    field: 'fullName',
    headerName: 'שם',
  },
  {
    field: 'department',
    headerName: 'מחלקה',
    valueGetter: (params: any) => {
      return params.data?.department?.name;
    },
  },
  {
    field: 'phoneNumber',
    headerName: 'נייד',
    valueFormatter: (p: any) =>
      p.value &&
      p.value
        .replace(/^\+972/, '0')
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{7})/, '$1-$2'),
    valueGetter: (params: any) => {
      if (!params.data?.phoneNumber) return '';
      return params.data?.phoneNumber
        .replace(/^\+972/, '0')
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{7})/, '$1-$2');
    },
  },
  {
    field: 'email',
    headerName: 'דוא"ל',
  },
  {
    field: 'role',
    headerName: 'תפקיד',
  },
].map((field) => ({
  ...field,
  headerTooltip: field.headerName,
  tooltipShowMode: 'whenTruncated',
}));

export const tableConfigOnEdit: ColDef[] = [
  {
    field: 'personalNumber',
    headerName: 'מספר אישי',
  },
  {
    field: 'firstName',
    headerName: 'שם פרטי',
  },
  {
    field: 'lastName',
    headerName: 'שם משפחה',
  },
  {
    field: 'department',
    headerName: 'מחלקה',
    valueGetter: (params) => {
      return params.data?.department?.name;
    },

    valueSetter: (params) => {
      const newDepartment = departments.find((d) => d.name === params.newValue);

      if (!newDepartment) return false;

      params.data.department = newDepartment;

      return true;
    },
  },
  {
    field: 'email',
    headerName: 'דוא"ל',
  },
  {
    field: 'role',
    headerName: 'תפקיד',
  },
];

export const validationSchema: FieldValidationSchema<User>[] = [
  {
    fieldName: 'firstName',
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'lastName',
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'personalNumber',
    validation: (value) =>
      validator(value).required().min(7).max(7).isNumeric(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'phoneNumber',
    validation: (value) =>
      validator(value).required().isValidIsraeliMobileNumber(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'email',
    validation: (value) => validator(value).required().isValidEmail(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'role',
    validation: (value) => validator(value).required(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'departmentId',
    validation: (value) => validator(value).required(),
    eventTypes: ['onChange'],
  },
];
