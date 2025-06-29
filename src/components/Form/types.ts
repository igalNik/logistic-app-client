import { FormEvent, HTMLAttributes } from 'react';
import {
  validator,
  type ValidationPipe,
  type ValidationResult,
} from '@igalni/logistic-validation';
import { errorMessages } from './constants';
import { FieldValidationSchema } from '../Table/types';

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
  Record<ValidationEventType, (value: any) => void> &
    Record<'errorMessages', string[]> &
    Record<'value', any>
>;

export type FormRegistry<T> = {
  [key in keyof T]?: FieldRegistry;
};

export type UseFormValidationResult<T> = {
  registry: FormRegistry<T>;
  validateOnSubmit: (formData: Partial<T>) => ValidationErrors<T>;
  errors: ValidationErrors<T>;
};

type ValidationEventType = 'onChange' | 'onBlur' | string;

export interface FieldSchema<T> extends FieldValidationSchema<T> {
  defaultValue?: string | undefined;
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
export type ErrorMessageText = `${errorMessages}`;
export interface FormProps
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<any>;
}

export type FormPropsType = 'model' | 'schema';

export type UseFormProps<T> = {
  formInitialization: FormModelOrSchema<T>;
  onSubmit?: (data: T) => void | Promise<any>;
  onCancel?: (event: FormEvent<HTMLButtonElement>) => void;
  onError?: (errors: ValidationErrors<T>) => void;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: ErrorMessageText[];
};

export type FormStatus =
  | 'idle'
  | 'submitting'
  | 'submitted'
  | 'validationError'
  | 'error';
