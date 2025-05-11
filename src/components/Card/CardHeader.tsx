// src/components/FormHeader.tsx
import { HTMLAttributes } from 'react';
import { mergeClasses } from '../../utils/tailwind.util';

interface FormHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  className?: string;
}

function FormHeader({ title, subtitle, ...props }: FormHeaderProps) {
  return (
    <div
      {...props}
      className={mergeClasses(
        `mb-6 bg-sidebar-gradient shadow-md pb-3 flex flex-col items-start border-b`,
        props.className
      )}
      dir="rtl"
    >
      <h2 className="text-2xl font-semibold text-text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-base text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}

export default FormHeader;
