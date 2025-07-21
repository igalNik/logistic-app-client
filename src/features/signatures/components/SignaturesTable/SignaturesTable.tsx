import { SignaturesStrings, validationSchema } from './constants';
import { SignatureRow } from '@/types/Signature';
import Table from '../../../../components/Table';
import useSignaturesColDef from './useSignaturesColDef';
import { useSignatures } from '../../../../api/queries/signatures';
import CreateSignatureForm from '../CreateSignatureForm/CreateSignatureForm';

function SignaturesTable() {
  const { data: signatures = [], isLoading, error } = useSignatures();
  const { tableConfig, tableConfigOnEdit } = useSignaturesColDef();

  return (
    <Table<SignatureRow>
      title={SignaturesStrings.TITLE}
      description={SignaturesStrings.DESCRIPTION}
      data={signatures}
      tableConfig={tableConfig}
      tableConfigOnEdit={tableConfigOnEdit}
      validationSchema={validationSchema}
      isLoading={isLoading}
      error={error?.message}
    >
      <CreateSignatureForm />
    </Table>
  );
}

export default SignaturesTable;
