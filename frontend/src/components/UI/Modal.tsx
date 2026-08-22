import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#02241d]/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Dialog */}
      <div className="relative bg-surface w-full max-w-lg rounded-xl shadow-md border border-outline-variant/30 p-6 md:p-8 flex flex-col overflow-hidden max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4 mb-6">
          <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-black/5 transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>
        
        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
