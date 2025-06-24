import {
  ChangeEvent,
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

  // define default values in form data
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
        // create field registry object for each fieldName

        (acc, fieldName: string) => {
          const fieldRegistry = {
            // spread validation handlers and properties for this field
            ...validationRegistry[fieldName as keyof T],
            // assign the field name to the registry
            name: fieldName,
            // set the current value from formData as string
            value: formData[fieldName as keyof T],
            // handle change event for this field
            onChange: (value: ChangeEvent<HTMLInputElement>) => {
              // convert event or string value to string

              const inputValue = value.target ? value.target.value : value;
              // update formData state with new value for this field
              setFormData((prev) => ({
                ...prev,
                [fieldName]: inputValue as T[keyof T],
              }));
              // if user already tried to submit, trigger validation on change
              if (hasAttemptedSubmit)
                validationRegistry[fieldName as keyof T]?.['onChange']?.(
                  inputValue
                );
            },
            // clear the value of this field
            onClear: () => {
              setFormData((prev) => ({
                ...prev,
                [fieldName]: '',
              }));
              // trigger validation on clear event

              validationRegistry[fieldName as keyof T]?.['onChange']?.('');
            },
          };
          // add this field registry to accumulator with fieldName as key
          acc[fieldName as keyof T] = fieldRegistry;
          return acc;
        },
        {}
      ),
    // dependencies for useMemo: recalculate if formData, submission state, or validationRegistry changes
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
