import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/70"
      onClick={onClose}
    />
    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-Secondary/20 bg-DarkBg3 shadow-2xl p-6 mobile:p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-Primary">{title}</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-GrayCustom hover:text-Primary hover:bg-DarkBg10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
