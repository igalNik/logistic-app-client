import { ColDef } from 'ag-grid-community';
import { validator } from '@igalni/logistic-validation';
import { FieldValidationSchema } from '../../../../components/Table/types';
import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';

export const tableConfig: ColDef[] = [
  {
    field: 'name',
    headerName: 'שם',
    headerTooltip: 'שם',
  },
  {
    field: 'description',
    headerName: 'תיאור',
    headerTooltip: 'תיאור',
  },
  {
    field: 'provider',
    headerName: 'שייך ל-',
    headerTooltip: 'שייך ל-',
  },
  {
    field: 'hasSerialNumber',
    headerName: 'קיים מספר סידורי',
    headerTooltip: 'קיים מספר סידורי',
  },
];

export const tableConfigOnEdit: ColDef[] = [...tableConfig];

export const validationSchema: FieldValidationSchema<EquipmentType>[] = [
  {
    fieldName: 'name',
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'description',
    validation: (value) => validator(value).max(256),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'provider',
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'hasSerialNumber',
    validation: (value) => validator(value),
    eventTypes: ['onChange'],
  },
];
