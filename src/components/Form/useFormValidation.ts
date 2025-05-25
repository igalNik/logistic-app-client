import { useState } from 'react';
import {
  FieldRegistry,
  FormRegistry,
  UseFormValidationProps,
  ValidationErrors,
} from './types';
import { errorMessages } from './constants';
export type ErrorType = keyof typeof errorMessages;

export function useFormValidation<T>({
  schema,
}: UseFormValidationProps<T>): FormRegistry<T> {
  const [formErrors, setFormErrors] = useState<ValidationErrors<T>>({});

  if (!schema || schema.length === 0) {
    return {} as FormRegistry<T>;
  }
  const registry: FormRegistry<T> = schema.reduce<FormRegistry<T>>(
    // prettier-ignore
    (acc, fieldSchema) => {

      const fieldRegistry: FieldRegistry = fieldSchema.eventTypes.reduce<FieldRegistry>((acc,eventType) => {
        acc[eventType] = () => setFormErrors(
          (prev) => ({...prev, [fieldSchema.fieldName]: fieldSchema.validation.result().errors.map(
            (error : any) => errorMessages[error as keyof typeof errorMessages]
          )})
        );
        acc["errorMessages"] = formErrors[fieldSchema.fieldName]
        return acc;
      },{});
      
      acc[fieldSchema.fieldName] = fieldRegistry;
      
      return acc
    },
    {}
  );

  return registry;
}
