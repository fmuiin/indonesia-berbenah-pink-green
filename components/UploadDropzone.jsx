import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadDropzone({ onFileSelect, isProcessing }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-brave-pink bg-brave-pink/10' 
          : 'border-gray-300 hover:border-brave-pink hover:bg-gray-50'
        }
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="space-y-4">
        <div className="text-6xl">📸</div>
        
        {isDragActive ? (
          <p className="text-brave-pink font-medium">
            Drop your image here...
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-gray-600 font-medium">
              Drag & drop your image here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, GIF, WebP
            </p>
          </div>
        )}
        
        {isProcessing && (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brave-pink"></div>
            <span className="text-sm text-gray-600">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}
