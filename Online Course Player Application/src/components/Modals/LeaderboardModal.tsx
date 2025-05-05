import React from 'react';
import { X, Award, Trophy, Medal } from 'lucide-react';

// Types
interface LeaderboardEntry {
  id: string;
  rank: number;
  user: {
    name: string;
    avatar: string;
  };
  score: number;
  completionTime: string;
}

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ 
  entries, 
  currentUserId, 
  onClose 
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={18} className="text-yellow-500" />;
      case 2:
        return <Medal size={18} className="text-gray-400" />;
      case 3:
        return <Medal size={18} className="text-amber-600" />;
      default:
        return <span className="text-xs font-bold text-gray-500 w-5 h-5 flex items-center justify-center">{rank}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award size={20} className="text-yellow-500" />
            <h3 className="font-semibold text-gray-800">Course Leaderboard</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto">
          <div className="px-4 py-3 bg-blue-50 flex items-center justify-between text-sm font-medium text-gray-600">
            <div className="w-10 text-center">Rank</div>
            <div className="flex-1">Student</div>
            <div className="w-20 text-right">Score</div>
          </div>
          
          {entries.map(entry => (
            <div 
              key={entry.id} 
              className={`px-4 py-3 flex items-center justify-between border-b border-gray-100 ${
                entry.id === currentUserId ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-10 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              
              <div className="flex-1 flex items-center space-x-3">
                <img 
                  src={entry.user.avatar} 
                  alt={entry.user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className={`text-sm font-medium ${
                    entry.id === currentUserId ? 'text-blue-700' : 'text-gray-800'
                  }`}>
                    {entry.user.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Completed in {entry.completionTime}
                  </div>
                </div>
              </div>
              
              <div className="w-20 text-right font-medium text-gray-700">
                {entry.score}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500 rounded-b-lg">
          Complete more lessons to improve your ranking!
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;