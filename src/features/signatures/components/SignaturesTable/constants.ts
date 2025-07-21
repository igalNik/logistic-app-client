import { FieldValidationSchema } from '../../../../components/Table/types';
import { Signature, SignatureRow } from '../../../../types/Signature';

// Simple required validator
const required = (value: string) => {
  return value && value.trim() !== ''
    ? { valid: true }
    : { valid: false, message: 'Required' };
};

export enum SignaturesStrings {
  TITLE = 'Signatures',
  DESCRIPTION = 'List of signatures',
}

export const validationSchema: FieldValidationSchema<SignatureRow>[] = [];
