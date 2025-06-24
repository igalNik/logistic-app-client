import { ColDef } from 'ag-grid-community';
// import { validator } from '@igalni/logistic-validation';
// import { EquipmentType } from '../../../../types/equipment-type/EquipmentType';
import { FieldValidationSchema } from '../../../../components/Table';
import { validator } from '@igalni/logistic-validation';
import CellListView from '../../../../components/Table/CellListView';
import { InventoryItem } from '../../../../types/inventory/InventoryItem.type';

export const tableConfig: ColDef[] = [
  {
    field: 'equipmentTypeId.name',
    headerName: 'שם הפריט',
    headerTooltip: 'שם הפריט',
  },
  {
    field: 'quantity',
    headerName: 'כמות',
    headerTooltip: 'כמות',
  },
  {
    field: 'serialNumbers',
    headerName: 'מק"טים',
    headerTooltip: 'מק"טים',
    autoHeight: true,

    cellRenderer: CellListView,
  },
  {
    field: 'updatedAt',
    headerName: 'עודכן בתאריך',
    headerTooltip: 'עודכן בתאריך',
    valueFormatter: (params) => {
      if (!params.value) return '';

      const date = new Date(params.value);

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      return new Intl.DateTimeFormat('en-IL', options).format(date);
    },
  },
  {
    field: 'updatedBy.fullName',
    headerName: 'עודכן על ידי',
    headerTooltip: 'עודכן על ידי',
  },
];

export const tableConfigOnEdit: ColDef[] = [...tableConfig];

export const validationSchema: FieldValidationSchema<InventoryItem>[] = [
  {
    fieldName: 'equipmentTypeId' as any,
    validation: (value) => validator(value),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'quantity',
    validation: (value) => validator(value),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'serialNumbers',
    validation: (value) => validator(value),
    eventTypes: ['onChange'],
  },
];
