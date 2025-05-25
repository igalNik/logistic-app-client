import { FormEvent, HTMLAttributes } from 'react';
import {
  validator,
  type ValidationPipe,
  type ValidationResult,
} from '@igalni/logistic-validation';

export interface FormSectionProps extends HTMLAttributes<HTMLFieldSetElement> {
  title: string;
}

export interface UseFormValidationProps<T> {
  schema: FormValidationSchema<T>;
}

export type FormValidationSchema<T> =
  | FieldValidationSchema<T>[]
  | undefined
  | null;

export type FieldRegistry = Partial<
  Record<ValidationEventType, () => void> & Record<'errorMessages', string[]>
>;

export type FormRegistry<T> = {
  [key in keyof T]?: FieldRegistry;
};

export type ValidationErrors<T> = {
  [key in keyof T]?: string[];
};
type ValidationEventType = 'onChange' | 'onBlur' | string;

export interface FieldValidationSchema<T> {
  fieldName: keyof T;
  validation: ValidationPipe;
  eventTypes: string[];
}

export interface FieldSchema<T> extends FieldValidationSchema<T> {
  defaultValue?: string | number | undefined;
}

export type FormSchema<T> = FieldSchema<T>[];

export type FormModelOrSchema<T> =
  | {
      schema: FieldSchema<T>[];
      model?: never;
    }
  | {
      schema?: never;
      model: T;
    };

export type UseFormProps<T> = {
  formInitialization: FormModelOrSchema<T>;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  onError?: (errors: ValidationErrors<T>) => void;
};
export type FormPropsType = 'model' | 'schema';
