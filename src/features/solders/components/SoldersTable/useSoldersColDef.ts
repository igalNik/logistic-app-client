import { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
import AddSearchParamsButton from '../../../../components/Table/features/AddSearchParamsButton';

function useSoldersColDef() {
  const tableConfig: ColDef[] = useMemo(
    () =>
      [
        {
          field: 'actions',
          headerName: 'פעולות',
          headerTooltip: 'פעולות',
          cellRenderer: AddSearchParamsButton,
          suppressNavigable: true, // Prevents tabbing into the cell
        },
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
      })),
    []
  );

  const tableConfigOnEdit: ColDef[] = useMemo(
    () => [
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
          const newDepartment = departments.find(
            (d) => d.name === params.newValue
          );

          if (!newDepartment) return false;

          params.data.department = newDepartment;

          return true;
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
    ],
    []
  );
  return { tableConfig, tableConfigOnEdit };
}

export default useSoldersColDef;
