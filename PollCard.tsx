import React from 'react';
import { Poll, CommentType } from '../types.ts';
import CommentSection from './CommentSection.tsx';
import AgreeIcon from './icons/AgreeIcon.tsx';
import DisagreeIcon from './icons/DisagreeIcon.tsx';
import HeartIcon from './icons/HeartIcon.tsx';

interface PollCardProps {
  poll: Poll;
  onVote: (pollId: number, voteType: 'pro' | 'con') => void;
  votedPolls: Set<number>;
  onAddComment: (pollId: number, commentType: CommentType, text: string) => void;
  upvotedComments: Set<string>;
  downvotedComments: Set<string>;
  onUpvoteComment: (commentId: number) => void;
  onDownvoteComment: (commentId: number) => void;
  isLiked: boolean;
  onLike: (pollId: number) => void;
}

const PollCard: React.FC<PollCardProps> = ({ 
  poll, 
  onVote, 
  votedPolls, 
  onAddComment,
  upvotedComments,
  downvotedComments,
  onUpvoteComment,
  onDownvoteComment,
  isLiked,
  onLike
}) => {
  const totalVotes = poll.proVotes + poll.conVotes;
  const proPercentage = totalVotes > 0 ? Math.round((poll.proVotes / totalVotes) * 100) : 50;
  const conPercentage = 100 - proPercentage;

  const hasVoted = votedPolls.has(poll.id);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-sky-300 mb-2">{poll.topic}</h2>
      <p className="text-slate-400 mb-6">{poll.description}</p>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm font-medium">
          <span className="text-green-400">正方 ({poll.proVotes})</span>
          <span className="text-red-400">反方 ({poll.conVotes})</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 flex overflow-hidden">
          <div 
            className="bg-green-500 transition-all duration-500" 
            style={{ width: `${proPercentage}%` }}
            title={`正方: ${proPercentage}%`}
          ></div>
          <div 
            className="bg-red-500 transition-all duration-500" 
            style={{ width: `${conPercentage}%` }}
            title={`反方: ${conPercentage}%`}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <button 
            onClick={() => onVote(poll.id, 'pro')} 
            disabled={hasVoted}
            className="flex items-center justify-center gap-2 w-32 px-4 py-2 font-semibold text-white bg-green-600/80 rounded-lg hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <AgreeIcon />
            <span>正方</span>
          </button>
          <button 
            onClick={() => onVote(poll.id, 'con')}
            disabled={hasVoted}
            className="flex items-center justify-center gap-2 w-32 px-4 py-2 font-semibold text-white bg-red-600/80 rounded-lg hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <DisagreeIcon />
            <span>反方</span>
          </button>
        </div>
        <div className="flex items-center">
            <button onClick={() => onLike(poll.id)} className="flex items-center space-x-2 text-slate-400 p-2 rounded-full transition-colors duration-200">
                <HeartIcon isLiked={isLiked} />
                <span className={`font-semibold text-lg ${isLiked ? 'text-red-400' : 'text-slate-400'}`}>{poll.likes}</span>
            </button>
        </div>
      </div>
      
      {hasVoted && <p className="text-center text-yellow-400 text-sm -mt-4 mb-4">您已對此議題投票。</p>}

      <CommentSection 
        poll={poll} 
        onAddComment={onAddComment} 
        upvotedComments={upvotedComments}
        downvotedComments={downvotedComments}
        onUpvoteComment={onUpvoteComment}
        onDownvoteComment={onDownvoteComment}
      />
    </div>
  );
};

export default PollCard;