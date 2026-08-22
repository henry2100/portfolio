import React from 'react';
import AppModal from '../organisms/CustomModal';

interface ImagePreviewProps {
  src: string;
  alt?: string;
  onClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, onClose }) => (
  <AppModal
    handleClose={onClose}
    modalStyle="w-full max-w-3xl mobile:w-[95%] h-fit max-h-[90vh] z-30 right-0 left-0 top-16 mx-auto animate-slide_down2 mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition ease-in-out duration-500 overflow-hidden"
    backDropStyle="!bg-BackDrop_d_xl"
    contentStyle="p-0 flex flex-col items-center bg-DarkBg2"
    closeBtnStyle="hidden"
  >
    <div className="relative w-full">
      <img
        src={src}
        alt={alt || 'Preview'}
        className="w-full max-h-[80vh] object-contain"
      />
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-lg hover:bg-black/80 transition-colors"
      >
        &times;
      </button>
    </div>
  </AppModal>
);

export default ImagePreview;
