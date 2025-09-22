import React from 'react';
// FIX: Add file extension to import path to resolve module not found error.
import { Poll, CommentType } from '../types.ts';
import CommentColumn from './CommentColumn';

interface CommentSectionProps {
  poll: Poll;
  onAddComment: (pollId: number, commentType: CommentType, text: string) => void;
  upvotedComments: Set<string>;
  downvotedComments: Set<string>;
  onUpvoteComment: (commentId: number) => void;
  onDownvoteComment: (commentId: number) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  poll, 
  onAddComment, 
  upvotedComments,
  downvotedComments,
  onUpvoteComment,
  onDownvoteComment,
}) => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <CommentColumn
          pollId={poll.id}
          title="正方論點"
          comments={poll.proComments}
          commentType={CommentType.Pro}
          onAddComment={onAddComment}
          upvotedComments={upvotedComments}
          downvotedComments={downvotedComments}
          onUpvoteComment={onUpvoteComment}
          onDownvoteComment={onDownvoteComment}
        />
        <CommentColumn
          pollId={poll.id}
          title="反方論點"
          comments={poll.conComments}
          commentType={CommentType.Con}
          onAddComment={onAddComment}
          upvotedComments={upvotedComments}
          downvotedComments={downvotedComments}
          onUpvoteComment={onUpvoteComment}
          onDownvoteComment={onDownvoteComment}
        />
      </div>
    </div>
  );
};

export default CommentSection;
