import { HTMLAttributes, ReactNode } from 'react';

export interface ModalContextType {
  onClose: () => void;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void | undefined;
  closeOnOutsideClick?: boolean;
  children?: ReactNode;
}
