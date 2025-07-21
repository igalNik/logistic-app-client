import { ColDef } from 'ag-grid-community';
import { useMemo } from 'react';
import { SignatureRow } from '../../../../types/Signature';

function useSignaturesColDef() {
  const tableConfig: ColDef<SignatureRow>[] = useMemo(
    () => [
      {
        headerName: 'מזהה',
        field: '_id',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Action Date',
        field: 'actionDate',
        sortable: true,
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => {
          if (!params.value) return '';
          const date = new Date(params.value);
          return date.toLocaleString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        },
      },
      {
        headerName: 'User ID',
        field: 'userId',
        sortable: true,
        filter: true,
        hide: true,
      },
      {
        headerName: 'Personal Number',
        field: 'userPersonalNumber',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'First Name',
        field: 'userFirstName',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Last Name',
        field: 'userLastName',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Equipment',
        field: 'equipmentName',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Has Serial?',
        field: 'equipmentHasSerial',
        cellRenderer: (params: { value: boolean }) =>
          params.value ? '✅ Yes' : '❌ No',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Action Type',
        field: 'actionType',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        sortable: true,
        filter: 'agNumberColumnFilter',
      },
    ],
    []
  );

  const tableConfigOnEdit: ColDef<SignatureRow>[] = useMemo(
    () => [...tableConfig],
    [tableConfig]
  );
  return { tableConfig, tableConfigOnEdit };
}

export default useSignaturesColDef;
