import * as React from 'react';
import { useEffect } from 'react';

export interface ToastProps {
  title?: string;
  message: string | string[];
  type?: 'success' | 'error' | 'info';
  duration?: number; // milliseconds
  onClose: () => void;
}

export function Toast({
  title,
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-green-500/30 text-white',
    error: 'bg-red-500/30 text-white',
    info: 'bg-blue-500/30 text-white',
  };

  return (
    <div
      className={`bottom-5 right-5 px-4 py-2 rounded shadow-lg animate-fade-in fixed ${colors[type]}`}
      role="alert"
      aria-live="assertive"
    >
      {title && <span>{title}</span>}
      {Array.isArray(message)
        ? message.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))
        : message}
    </div>
  );
}
