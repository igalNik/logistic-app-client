import { SignaturesStrings, validationSchema } from './constants';
import { SignatureRow } from '@/types/Signature';
import Table from '../../../../components/Table';
import useSignaturesColDef from './useSignaturesColDef';
import { useSignatures } from '../../../../api/queries/signatures';
import CreateSignatureForm from '../CreateSignatureForm/CreateSignatureForm';
import { toast } from 'react-toastify';

function SignaturesTable() {
  const { data: signatures = [], isLoading } = useSignatures();
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
      onError={(message: string) => toast.error(message)}
      onSuccess={(message: string) => toast.success(message)}
      onNotification={(message: string) => toast.info(message)}
    >
      <CreateSignatureForm />
    </Table>
  );
}

export default SignaturesTable;
