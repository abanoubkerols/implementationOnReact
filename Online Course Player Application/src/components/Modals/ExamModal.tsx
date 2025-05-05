import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Clock, CheckCircle2 } from 'lucide-react';

// Types
interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
}

interface ExamModalProps {
  title: string;
  questions: Question[];
  timeLimit: number; // in minutes
  onClose: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const ExamModal: React.FC<ExamModalProps> = ({ 
  title, 
  questions, 
  timeLimit, 
  onClose, 
  onComplete 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // convert to seconds
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          !isSubmitted && handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSubmitted]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleOptionSelect = (questionId: string, optionId: string) => {
    if (isSubmitted) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Calculate score
    const score = questions.reduce((acc, question) => {
      const selectedOption = selectedOptions[question.id];
      return selectedOption === question.correctOptionId ? acc + 1 : acc;
    }, 0);
    
    onComplete(score, questions.length);
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Check if all questions are answered
  const allAnswered = questions.every(q => selectedOptions[q.id]);
  
  const getOptionClassName = (question: Question, optionId: string) => {
    const baseClass = "p-3 border rounded-md text-sm transition-colors flex items-center";
    
    if (!isSubmitted) {
      return selectedOptions[question.id] === optionId
        ? "bg-blue-50 border-blue-300 text-blue-700"
        : "border-gray-200 hover:border-blue-200 hover:bg-blue-50";
    }
    
    // After submission
    if (optionId === question.correctOptionId) {
      return "bg-green-50 border-green-300 text-green-700";
    }
    
    if (selectedOptions[question.id] === optionId) {
      return "bg-red-50 border-red-300 text-red-700";
    }
    
    return "border-gray-200 opacity-60";
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-orange-600">
              <Clock size={16} />
              <span className="text-sm font-medium">{formatTime(timeRemaining)}</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto p-6 flex-1">
          <div className="mb-6">
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              {isSubmitted && (
                <span className="flex items-center text-green-600">
                  <CheckCircle2 size={16} className="mr-1" />
                  Completed
                </span>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">{currentQuestion.text}</h4>
            <div className="space-y-3">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                  disabled={isSubmitted}
                  className={`w-full text-left ${getOptionClassName(currentQuestion, option.id)}`}
                >
                  {isSubmitted && option.id === currentQuestion.correctOptionId && (
                    <CheckCircle2 size={16} className="text-green-600 mr-2 flex-shrink-0" />
                  )}
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-sm flex items-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <ChevronLeft size={16} className="mr-1" /> Previous
          </button>
          
          <div className="flex space-x-2">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-sm flex items-center bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            ) : (
              !isSubmitted && (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-70 disabled:bg-blue-400"
                >
                  Submit Quiz
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamModal;