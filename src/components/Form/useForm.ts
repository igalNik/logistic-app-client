import { FormEvent, MouseEventHandler, useRef, useState } from 'react';
import { useFormValidation } from './useFormValidation';
import {
  FieldSchema,
  FormModelOrSchema,
  FormPropsType,
  UseFormProps,
  FormRegistry,
  FormValidationSchema,
} from './types';

const getFormMode = (
  formInitialization: FormModelOrSchema<T>
): FormPropsType => ('schema' in formInitialization ? 'schema' : 'model');

export function useForm<T>({
  formInitialization,
  onSubmit,
  onClose,
}: UseFormProps<T>) {
  const formMode = useRef<FormPropsType>(
    getFormMode(formInitialization)
  ).current;

  const { schema, model } = formInitialization;

  const [formData, setFormData] = useState<Partial<T>>(() => {
    if (formMode === 'schema') {
      // create form model based on the schema
      return schema!.reduce<Partial<T>>(
        (acc: Partial<T>, field: FieldSchema<T>) => {
          acc[field.fieldName] = field.defaultValue as T[keyof T];
          return acc;
        },
        {} as Partial<T>
      );
    } else {
      return model ?? ({} as Partial<T>);
    }
  });

  const validationRegistry: FormRegistry<T> = useFormValidation({
    schema: formInitialization.schema as FormValidationSchema<T>,
  });

  const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // onSubmit?.(formData as T);
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
    onClose?.();
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleCancel,
    registry: validationRegistry,
  };
}
