import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Circle, Play } from 'lucide-react';

// Types
interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: 'video' | 'quiz' | 'reading';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CurriculumProps {
  modules: Module[];
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ 
  modules, 
  currentLessonId, 
  onSelectLesson 
}) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    modules.reduce((acc, module) => ({ ...acc, [module.id]: true }), {})
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const getLessonIcon = (lesson: Lesson) => {
    if (lesson.isCompleted) {
      return <CheckCircle size={16} className="text-green-500 flex-shrink-0" />;
    }
    
    if (lesson.type === 'video') {
      return <Play size={16} className="text-blue-500 flex-shrink-0" />;
    }
    
    return <Circle size={16} className="text-gray-400 flex-shrink-0" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-lg text-gray-800">Curriculum</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {modules.map(module => (
          <div key={module.id} className="overflow-hidden">
            <button
              onClick={() => toggleModule(module.id)}
              className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {expandedModules[module.id] ? (
                  <ChevronDown size={18} className="text-gray-500" />
                ) : (
                  <ChevronRight size={18} className="text-gray-500" />
                )}
                <span className="font-medium text-gray-800">{module.title}</span>
              </div>
              <span className="text-sm text-gray-500">
                {module.lessons.filter(l => l.isCompleted).length}/{module.lessons.length}
              </span>
            </button>
            
            {expandedModules[module.id] && (
              <div className="pl-10 pr-4 pb-2">
                {module.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`flex items-center justify-between w-full py-2 px-3 text-left rounded-md transition-colors ${
                      currentLessonId === lesson.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {getLessonIcon(lesson)}
                      <span className={`text-sm ${
                        currentLessonId === lesson.id ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculum;