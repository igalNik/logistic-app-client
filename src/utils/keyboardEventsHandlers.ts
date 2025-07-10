const closeOnEscape = (onClose: () => void) => {
  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  });
};

const removeCloseOnEscape = (onClose: () => void) => {
  document.removeEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  });
};

export { closeOnEscape, removeCloseOnEscape };
