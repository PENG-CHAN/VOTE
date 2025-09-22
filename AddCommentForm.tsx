
import React, { useState } from 'react';
// FIX: Add file extension to import path to resolve module not found error.
import { CommentType } from '../types.ts';

interface AddCommentFormProps {
  pollId: number;
  commentType: CommentType;
  onAddComment: (pollId: number, commentType: CommentType, text: string) => void;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ pollId, commentType, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(pollId, commentType, text);
      setText('');
    }
  };
  
  const borderColor = commentType === CommentType.Pro ? 'focus:border-green-500 focus:ring-green-500' : 'focus:border-red-500 focus:ring-red-500';
  const buttonColor = commentType === CommentType.Pro ? 'bg-green-500/80 hover:bg-green-500' : 'bg-red-500/80 hover:bg-red-500';

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="發表你的論點..."
        rows={3}
        className={`w-full bg-slate-800 border-2 border-slate-700 rounded-md p-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-300 ${borderColor}`}
      ></textarea>
      <button
        type="submit"
        className={`w-full mt-2 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ${buttonColor}`}
      >
        送出
      </button>
    </form>
  );
};

export default AddCommentForm;