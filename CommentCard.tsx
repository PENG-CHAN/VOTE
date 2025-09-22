import React from 'react';
// FIX: Add file extension to import path to resolve module not found error.
import { Comment } from '../types.ts';
import UpvoteIcon from './icons/UpvoteIcon';
import DownvoteIcon from './icons/DownvoteIcon';

interface CommentCardProps {
  comment: Comment;
  isUpvoted: boolean;
  isDownvoted: boolean;
  onUpvote: () => void;
  onDownvote: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, isUpvoted, isDownvoted, onUpvote, onDownvote }) => {
  const score = comment.upvotes - comment.downvotes;

  const upvoteClasses = isUpvoted 
    ? 'text-green-400' 
    : 'text-slate-400 hover:text-green-400';
    
  const downvoteClasses = isDownvoted 
    ? 'text-red-400' 
    : 'text-slate-400 hover:text-red-400';
    
  const scoreColor = score > 0 ? 'text-green-400' : score < 0 ? 'text-red-400' : 'text-slate-300';

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4 shadow-md transition-shadow hover:shadow-lg flex">
      <div className="flex flex-col items-center justify-start mr-4 space-y-1">
        <button onClick={onUpvote} className={`group ${upvoteClasses} transition-colors`}>
          <UpvoteIcon />
        </button>
        <span className={`font-bold text-sm w-6 text-center ${scoreColor}`}>{score}</span>
        <button onClick={onDownvote} className={`group ${downvoteClasses} transition-colors`}>
          <DownvoteIcon />
        </button>
      </div>
      <div className="flex-grow">
        <p className="text-slate-300 text-sm mb-3">{comment.text}</p>
        <div className="flex justify-between items-center text-slate-500">
          <span className="text-xs font-medium">{comment.author}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
