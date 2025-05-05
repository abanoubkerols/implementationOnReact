import React from 'react';
import { X, Download, Printer } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, title, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.open(pdfUrl, '_blank')}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Download size={18} />
            </button>
            <button 
              onClick={() => {
                const printWindow = window.open(pdfUrl, '_blank');
                printWindow?.addEventListener('load', () => {
                  printWindow.print();
                });
              }}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Printer size={18} />
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe 
            src={pdfUrl} 
            title={title}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;