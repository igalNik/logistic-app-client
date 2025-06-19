import { ColDef, ValueFormatterParams } from 'ag-grid-community';
// import { validator } from '@igalni/logistic-validation';
import { EquipmentType } from './../../../types/equipment-type/EquipmentType';
import { FieldValidationSchema } from '../../../components/Table';
import { validator } from '@igalni/logistic-validation';
import Spinner from '../../../components/Spinner';
import CellListView from '../../../components/Table/CellListView';
// export interface InventoryItem {
//   id: string;
//   InventoryItemId: string | InventoryItem;
//   quantity: number;
//   serialNumbers?: string[];
//   updatedAt?: Date;
//   updatedBy?: string | User;
// }
const carMappings = {
  tyt: 'Toyota',
  frd: 'Ford',
  prs: 'Porsche',
  nss: 'Nissan',
};
function lookupValue(mappings: Record<string, string>, key: string) {
  return mappings[key];
}
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
  // {
  //   field: 'make',
  //   minWidth: 100,
  //   cellEditor: 'agSelectCellEditor',
  //   cellEditorParams: {
  //     values: Object.keys(carMappings),
  //   },
  //   filterParams: {
  //     valueFormatter: (params: ValueFormatterParams) => {
  //       return lookupValue(carMappings, params.value);
  //     },
  //   },
  //   valueFormatter: (params) => {
  //     return lookupValue(carMappings, params.value);
  //   },
  // },
  {
    field: 'updatedAt',
    headerName: 'עודכן בתאריך',
    headerTooltip: 'עודכן בתאריך',
    // valueFormatter: (params) => {
    //   return params.value ? new Date(params.value).toLocaleDateString() : '';
    // },
  },
  //   {
  //     field: 'updatedBy.name',
  //     headerName: 'עודכן על ידי',
  //     headerTooltip: 'עודכן על ידי',
  //   },
];

export const tableConfigOnEdit: ColDef[] = [...tableConfig];

export const validationSchema: FieldValidationSchema<EquipmentType>[] = [
  {
    fieldName: 'equipmentTypeId.name' as any,
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'quantity',
    validation: (value) => validator(value),
    eventTypes: ['onChange'],
  },
  {
    fieldName: 'serialNumbers',
    validation: (value) =>
      validator(value).required().min(2).max(20).isAlphaHebrewOrEnglish(),
    eventTypes: ['onChange'],
  },
];
