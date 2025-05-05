import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  userId: string;
  user: User;
  text: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (text: string) => void;
}

const Comments: React.FC<CommentsProps> = ({ comments, currentUser, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-gray-800">Comments</h2>
        <MessageSquare size={18} className="text-blue-500" />
      </div>
      
      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {comments.map(comment => (
          <div key={comment.id} className="p-4">
            <div className="flex items-start gap-3">
              <img 
                src={comment.user.avatar} 
                alt={comment.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-medium text-sm text-gray-800">{comment.user.name}</h4>
                  <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                </div>
                <p className="mt-1 text-sm text-gray-700">{comment.text}</p>
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-3">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex items-start gap-2">
                        <img 
                          src={reply.user.avatar} 
                          alt={reply.user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between">
                            <h4 className="font-medium text-xs text-gray-800">{reply.user.name}</h4>
                            <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                          </div>
                          <p className="mt-1 text-xs text-gray-700">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 py-2 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            disabled={!newComment.trim()}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;