import { mergeClasses } from '../../utils/tailwind.util';
import { FormSectionProps } from './types';

export function FormSection({ title, ...props }: FormSectionProps) {
  return (
    <fieldset
      className={mergeClasses(
        props.className,
        'border-gray-300 rounded-lg p-4 text-gray-700 border-2'
      )}
    >
      <legend className="font-semibold text-xl px-2">{title}</legend>
      {props.children}
    </fieldset>
  );
}
