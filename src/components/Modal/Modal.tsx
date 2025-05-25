import { HTMLAttributes, ReactNode } from 'react';

import Icon from '../Icon';
import { ModalContext } from './ModalContext';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void | undefined;
  closeOnOutsideClick?: boolean;
  children?: ReactNode;
}

function Modal({ onClose, closeOnOutsideClick = false, children }: ModalProps) {
  return (
    <ModalContext.Provider value={{ onClose: onClose }}>
      <div
        className="inset-0 fixed z-10"
        onClick={() => closeOnOutsideClick && onClose}
      >
        <div
          className={`bg-slate-900/60 flex h-full w-full items-center justify-center`}
          role="dialog"
          aria-modal="true"
          aria-label="dialog"
          onClick={() => closeOnOutsideClick && onClose()}
        >
          <header className="bg-white rounded-lg shadow-xl md:max-w-3xl min-w-sm relative overflow-hidden">
            <span className="bg-white/40 left-0 top-0 m-3 absolute rounded-full">
              <button onClick={onClose} className="cursor-pointer">
                <Icon name={'Close'} />
              </button>
            </span>
            {children}
          </header>
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default Modal;
