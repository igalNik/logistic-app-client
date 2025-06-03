import { useState } from 'react';
import {
  FieldRegistry,
  FormRegistry,
  UseFormValidationProps,
  UseFormValidationResult,
  ValidationErrors,
} from './types';
import { errorMessages } from './constants';
export type ErrorType = keyof typeof errorMessages;

export function useFormValidation<T>({
  schema,
}: UseFormValidationProps<T>): UseFormValidationResult<T> {
  const [formErrors, setFormErrors] = useState<ValidationErrors<T>>({});

  if (!schema || schema.length === 0) {
    return {} as UseFormValidationResult<T>;
  }
  const registry: FormRegistry<T> = schema.reduce<FormRegistry<T>>(
    // prettier-ignore
    (acc, fieldSchema) => {

      const fieldRegistry: FieldRegistry = fieldSchema.eventTypes.reduce<FieldRegistry>((acc,eventType) => {
        acc[eventType] = (value:string) => 
          setFormErrors(
          (prev:ValidationErrors<T>) => ({...prev, [fieldSchema.fieldName]: fieldSchema.validation(value).result().errors.map(
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

  const validateOnSubmit = (formData: Partial<T>): ValidationErrors<T> => {
    const errorsOnSubmit: Partial<ValidationErrors<T>> = {};
    schema.forEach((fieldSchema) => {
      const value = formData[fieldSchema.fieldName];

      const validationResult = fieldSchema.validation(value as string).result();
      if (validationResult.errors.length > 0) {
        setFormErrors((prev: ValidationErrors<T>) => ({
          ...prev,
          [fieldSchema.fieldName]: validationResult.errors.map(
            (error: any) => errorMessages[error as keyof typeof errorMessages]
          ),
        }));
        errorsOnSubmit[fieldSchema.fieldName] = validationResult.errors.map(
          (error: any) => errorMessages[error as keyof typeof errorMessages]
        );
      } else {
        errorsOnSubmit[fieldSchema.fieldName] = [];

        setFormErrors((prev: ValidationErrors<T>) => ({
          ...prev,
          [fieldSchema.fieldName]: [],
        }));
      }
    });
    console.log(errorsOnSubmit);

    return errorsOnSubmit as ValidationErrors<T>;
  };

  return {
    registry,
    validateOnSubmit,
    errors: formErrors,
  };
}
