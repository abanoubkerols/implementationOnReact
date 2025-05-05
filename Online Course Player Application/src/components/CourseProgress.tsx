import React from 'react';
import { BarChart2 } from 'lucide-react';

interface CourseProgressProps {
  progress: number; // 0-100
  modulesCompleted: number;
  totalModules: number;
}

const CourseProgress: React.FC<CourseProgressProps> = ({ 
  progress, 
  modulesCompleted, 
  totalModules 
}) => {
  // Calculate color based on progress
  const getProgressColor = () => {
    if (progress < 30) return 'bg-blue-500';
    if (progress < 70) return 'bg-blue-600';
    return 'bg-blue-700';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-800">Your Progress</h2>
        <BarChart2 size={18} className="text-blue-500" />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Course Completion</span>
          <span className="text-sm font-bold text-blue-600">{progress}%</span>
        </div>
        
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${getProgressColor()} transition-all duration-500 ease-out`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>{modulesCompleted} of {totalModules} modules completed</span>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-gray-50 rounded p-2 text-center">
              <div className={`text-lg font-bold ${i < 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                {i + 1}
              </div>
              <div className="text-xs text-gray-500">Week</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;