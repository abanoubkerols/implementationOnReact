import React from 'react';
import { FileText, Download, ExternalLink, Award } from 'lucide-react';

// Types
interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'file';
  url: string;
  size?: string;
}

interface CourseMaterialsProps {
  materials: Material[];
  onOpenPdf: (material: Material) => void;
}

const CourseMaterials: React.FC<CourseMaterialsProps> = ({ materials, onOpenPdf }) => {
  const getIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText size={18} className="text-red-500" />;
      case 'link':
        return <ExternalLink size={18} className="text-blue-500" />;
      case 'file':
        return <Download size={18} className="text-green-500" />;
      default:
        return <FileText size={18} className="text-gray-500" />;
    }
  };

  const handleItemClick = (material: Material) => {
    if (material.type === 'pdf') {
      onOpenPdf(material);
    } else if (material.type === 'link') {
      window.open(material.url, '_blank');
    } else {
      // Download file
      const link = document.createElement('a');
      link.href = material.url;
      link.download = material.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-800">Course Materials</h2>
        <Award size={18} className="text-yellow-500" />
      </div>
      <div className="divide-y divide-gray-100">
        {materials.map(material => (
          <button
            key={material.id}
            onClick={() => handleItemClick(material)}
            className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {getIcon(material.type)}
              <span className="text-sm font-medium text-gray-700">{material.title}</span>
            </div>
            {material.size && (
              <span className="text-xs text-gray-500">{material.size}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseMaterials;