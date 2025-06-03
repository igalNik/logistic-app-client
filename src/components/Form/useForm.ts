import {
  FormEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormValidation } from './useFormValidation';
import {
  FieldSchema,
  FormModelOrSchema,
  FormPropsType,
  UseFormProps,
  FormRegistry,
  FormValidationSchema,
  UseFormValidationResult,
} from './types';

export function useForm<T>({
  formInitialization,
  onSubmit,
  onCancel,
}: UseFormProps<T>) {
  const getFormMode = useCallback(
    (formInitialization: FormModelOrSchema<T>): FormPropsType =>
      'schema' in formInitialization ? 'schema' : 'model',
    []
  );

  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
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
      return { ...model } as Partial<T>;
    }
  });

  const {
    registry: validationRegistry,
    validateOnSubmit,
  }: UseFormValidationResult<T> = useFormValidation({
    schema: formInitialization.schema as FormValidationSchema<T>,
  });

  const formRegistry: Partial<FormRegistry<T>> = useMemo(
    () =>
      // create form registry based on the validation registry and form data
      // this will ensure that the form registry is always up to date with the form data
      // and the validation registry

      Object.keys(validationRegistry).reduce<Partial<FormRegistry<T>>>(
        (acc, fieldName: string) => {
          const fieldRegistry = {
            ...validationRegistry[fieldName as keyof T],
            name: fieldName,
            value: String(formData[fieldName as keyof T]),
            onChange: (value: any) => {
              const str =
                typeof value === 'string' ? value : String(value.target.value);
              setFormData((prev) => ({
                ...prev,
                [fieldName]: str as T[keyof T],
              }));
              if (hasAttemptedSubmit)
                validationRegistry[fieldName as keyof T]?.['onChange']?.(str);
            },
            onClear: () => {
              setFormData((prev) => ({
                ...prev,
                [fieldName]: '',
              }));
              validationRegistry[fieldName as keyof T]?.['onChange']?.('');
            },
          };
          acc[fieldName as keyof T] = fieldRegistry;
          return acc;
        },
        {}
      ),
    [formData, hasAttemptedSubmit, validationRegistry]
  );

  const handleSubmit = async function (
    event: FormEvent<HTMLFormElement>
  ): Promise<any> {
    event.preventDefault();
    setHasAttemptedSubmit(() => true);

    const submitErrors = validateOnSubmit(formData as Partial<T>);

    const isValid = !Object.values(submitErrors).some(
      (fieldErrors) => Array.isArray(fieldErrors) && fieldErrors?.length > 0
    );

    if (!isValid) return;
    const res = await onSubmit?.(formData as T);
    return res;
  };

  const handleCancel: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
    onCancel?.(event);
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleCancel,
    registry: formRegistry,
  };
}
