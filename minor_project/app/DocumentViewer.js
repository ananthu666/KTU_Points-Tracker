import React from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';

const DocumentViewer = ({ url, onClose }) => {
  const fileType = url?.toLowerCase().split('.').pop();
  
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(fileType);
  const isPDF = fileType === 'pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-xl p-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close viewer"
        >
          <FaTimes size={24} />
        </button>

        <div className="w-full h-full overflow-hidden mt-2">
          {isImage ? (
            <img
              src={url}
              alt="Activity proof"
              className="w-full h-full object-contain"
            />
          ) : isPDF ? (
            <iframe
              src={`${url}#toolbar=0&navpanes=0`}
              className="w-full h-full"
              title="PDF document"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-gray-600 mb-4">This file type cannot be previewed</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center gap-2"
                >
                  <FaDownload /> Download File
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;