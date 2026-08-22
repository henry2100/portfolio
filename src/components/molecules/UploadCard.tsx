import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { UploadCloud, X, Image, File as FileIcon } from 'lucide-react';

export interface UploadCardRef {
  reset: () => void;
}

interface UploadCardProps {
  mode?: 'image' | 'file';
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  onFiles?: (files: File[]) => void;
  value?: File[];
  className?: string;
  label?: string;
  showPreview?: boolean;
}

const UploadCard = forwardRef<UploadCardRef, UploadCardProps>(({
  mode = 'file',
  multiple = false,
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedTypes,
  onFiles,
  value,
  className = '',
  label,
  showPreview = true,
}, ref) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const internalFiles = value ?? files;

  useImperativeHandle(ref, () => ({
    reset: () => {
      setFiles([]);
      setError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
  }));

  const defaultAccepted = mode === 'image'
    ? ['.png', '.jpg', '.jpeg', '.webp', '.gif']
    : undefined;

  const types = acceptedTypes ?? defaultAccepted;

  const validateFile = (file: File): string => {
    if (types && types.length > 0) {
      const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!types.includes(ext)) return `Invalid file type: ${file.name}. Allowed: ${types.join(', ')}`;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File too large: ${file.name}. Max ${maxSizeMB}MB`;
    }
    return '';
  };

  const handleFiles = (newFiles: FileList) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];
    const remainingSlots = maxFiles - internalFiles.length;

    if (remainingSlots <= 0) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    fileArray.forEach((file) => {
      const err = validateFile(file);
      if (err) errors.push(err);
      else if (!internalFiles.some((f) => f.name === file.name)) {
        validFiles.push(file);
      }
    });

    const filesToAdd = validFiles.slice(0, remainingSlots);
    if (validFiles.length > remainingSlots) {
      errors.push(`Only ${remainingSlots} more file(s) allowed`);
    }

    setError(errors.length > 0 ? errors.join('; ') : '');
    if (filesToAdd.length > 0) {
      const updated = [...internalFiles, ...filesToAdd];
      setFiles(updated);
      onFiles?.(updated);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const updated = internalFiles.filter((_, i) => i !== index);
    setFiles(updated);
    onFiles?.(updated);
  };

  const acceptAttr = types?.join(',');

  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 text-sm font-medium block text-Background">{label}</label>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-Primary bg-Primary_Accents_2xs'
            : 'border-Secondary/30 hover:border-Primary/50 hover:bg-Primary_Accents_2xs'
        }`}
      >
        <div className="w-12 h-12 bg-Primary_Accents_2xs rounded-full flex items-center justify-center mx-auto mb-3">
          {mode === 'image' ? (
            <Image className="w-6 h-6 text-Primary" />
          ) : (
            <UploadCloud className="w-6 h-6 text-Primary" />
          )}
        </div>
        <p className="text-sm font-medium text-Background">
          {isDragging ? 'Drop here' : mode === 'image' ? 'Drop images here or click to browse' : 'Drop files here or click to browse'}
        </p>
        <p className="text-xs text-GrayCustom mt-1">
          {mode === 'image'
            ? `PNG, JPG, WEBP up to ${maxSizeMB}MB each`
            : `Up to ${maxSizeMB}MB per file`}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptAttr}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>

      {error && (
        <p className="text-sm mt-2 text-Danger">{error}</p>
      )}

      {showPreview && internalFiles.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-Background mb-2">
            {internalFiles.length} file{internalFiles.length > 1 ? 's' : ''} selected
          </p>
          {mode === 'image' ? (
            <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3">
              {internalFiles.map((file, i) => (
                <div key={file.name + i} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full aspect-square object-cover rounded-lg border border-Secondary/20"
                  />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="absolute top-1 right-1 w-6 h-6 bg-Danger text-white rounded-full text-xs opacity-100 mobile:opacity-100 tablet:opacity-0 tablet:group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {internalFiles.map((file, i) => (
                <div key={file.name + i} className="flex items-center justify-between gap-2 bg-DarkBg2 p-2 rounded-lg">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileIcon className="w-4 h-4 text-GrayCustom flex-shrink-0" />
                    <span className="text-sm text-Background truncate">{file.name}</span>
                    <span className="text-xs text-GrayCustom flex-shrink-0">
                      ({(file.size / 1024 / 1024).toFixed(1)}MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    title="Remove file"
                    onClick={() => removeFile(i)}
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-Danger text-white hover:bg-Danger2 transition-colors flex-shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

UploadCard.displayName = 'UploadCard';
export default UploadCard;
