import { useState } from 'react';
import { Signature } from '../../../../types/Signature';
import { useCreateSignature } from '../../../../api/queries/signatures';
import { validationSchema } from '../SignaturesTable/constants';

const initialSignature: Signature = {
  id: '',
  userId: '',
  document: '',
  signedAt: '',
};

function CreateSignatureForm() {
  const [signature, setSignature] = useState<Signature>(initialSignature);
  const createSignature = useCreateSignature();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignature({ ...signature, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSignature.mutate(signature);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" value={signature.id} onChange={handleChange} placeholder="ID" />
      <input name="userId" value={signature.userId} onChange={handleChange} placeholder="User ID" />
      <input name="document" value={signature.document} onChange={handleChange} placeholder="Document" />
      <input name="signedAt" value={signature.signedAt} onChange={handleChange} placeholder="Signed At" />
      <button type="submit">Create Signature</button>
    </form>
  );
}

export default CreateSignatureForm; 