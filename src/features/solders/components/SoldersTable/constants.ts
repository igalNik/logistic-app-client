import { ColDef } from 'ag-grid-community';
import { SoldersRow } from './types';

export const tableConfig: ColDef<SoldersRow>[] = [
  {
    field: 'personalNumber',
    headerName: 'מספר אישי',
  },
  {
    field: 'fullName',
    headerName: 'שם',
  },
  {
    field: 'department',
    headerName: 'מחלקה',
    valueFormatter: (p) => {
      return p.value?.name?.replace(/\+972/, '0');
    },
  },
  {
    field: 'phoneNumber',
    headerName: 'נייד',
    valueFormatter: (p) =>
      p.value &&
      p.value
        .replace(/^\+972/, '0')
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{7})/, '$1-$2'),
    valueGetter: (params) => {
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
];

export const tableConfigOnEdit: ColDef<SoldersRow>[] = [
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
  },
  {
    field: 'phoneNumber',
    headerName: 'נייד',
    valueFormatter: (p) =>
      p.value &&
      p.value
        .replace(/^\+972/, '0')
        .replace(/-/g, '')
        .replace(/(\d{3})(\d{7})/, '$1-$2'),
    valueGetter: (params) => {
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
];
