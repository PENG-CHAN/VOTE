import React from 'react';
// FIX: Add file extension to import path to resolve module not found error.
import { Comment, CommentType } from '../types.ts';
import CommentCard from './CommentCard';
import AddCommentForm from './AddCommentForm';
import AgreeIcon from './icons/AgreeIcon';
import DisagreeIcon from './icons/DisagreeIcon';

interface CommentColumnProps {
  pollId: number;
  title: string;
  comments: Comment[];
  commentType: CommentType;
  onAddComment: (pollId: number, commentType: CommentType, text: string) => void;
  upvotedComments: Set<string>;
  downvotedComments: Set<string>;
  onUpvoteComment: (commentId: number) => void;
  onDownvoteComment: (commentId: number) => void;
}

const CommentColumn: React.FC<CommentColumnProps> = ({
  pollId,
  title,
  comments,
  commentType,
  onAddComment,
  upvotedComments,
  downvotedComments,
  onUpvoteComment,
  onDownvoteComment,
}) => {
  const isPro = commentType === CommentType.Pro;
  const headerColor = isPro ? 'text-green-400' : 'text-red-400';
  const Icon = isPro ? AgreeIcon : DisagreeIcon;

  const sortedComments = [...comments].sort((a, b) => {
    const scoreA = a.upvotes - a.downvotes;
    const scoreB = b.upvotes - b.downvotes;
    return scoreB - scoreA;
  });

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 md:p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Icon />
        <h3 className={`text-xl font-bold ml-2 ${headerColor}`}>{title}</h3>
      </div>
      <div className="flex-grow overflow-y-auto pr-2" style={{ maxHeight: '400px' }}>
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => {
            const commentKey = `${pollId}-${comment.id}`;
            return (
              <CommentCard 
                key={comment.id} 
                comment={comment} 
                isUpvoted={upvotedComments.has(commentKey)}
                isDownvoted={downvotedComments.has(commentKey)}
                onUpvote={() => onUpvoteComment(comment.id)}
                onDownvote={() => onDownvoteComment(comment.id)}
              />
            )
          })
        ) : (
          <p className="text-slate-500 text-sm italic text-center py-4">目前沒有任何評論。</p>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700">
         <AddCommentForm pollId={pollId} commentType={commentType} onAddComment={onAddComment} />
      </div>
    </div>
  );
};

export default CommentColumn;
