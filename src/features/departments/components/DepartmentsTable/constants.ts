import { ColDef, ISelectCellEditorParams } from 'ag-grid-community';
import { validator } from '@igalni/logistic-validation';
import { FieldValidationSchema } from '../../../../components/Table/types';
import { Department } from '../../../../types/Department';
import { PROVIDER_OPTIONS } from '../../../../constants/dropdownOptions';

export const tableConfig: ColDef[] = [
  {
    field: 'name',
    headerName: 'שם',
    headerTooltip: 'שם',
  },
  {
    field: 'officerId.fullName',
    headerName: 'מ"מ',
    headerTooltip: 'מ"מ',
  },
  {
    field: 'sergeantId.fullName',
    headerName: 'סמל',
    headerTooltip: 'סמל',
  },
];

export const tableConfigOnEdit: ColDef[] = tableConfig.map((cell) => {
  if (cell.field === 'provider')
    return {
      ...cell,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: PROVIDER_OPTIONS.map((entry) => entry.label),
      } as ISelectCellEditorParams,
    };

  return cell;
});

export const validationSchema: FieldValidationSchema<Department>[] = [
  {
    fieldName: 'name',
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'officerId',
    validation: (value) => validator(value).max(256),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'sergeantId',
    validation: (value) => validator(value).min(2).max(20),
    eventTypes: ['onChange'],
  },
];

export enum DepartmentStrings {
  TITLE = 'מחלקות',
  DESCRIPTION = 'רשימת מחלקות בפלוגה',
}
