export interface Comment {
  id: number;
  text: string;
  author: string;
  upvotes: number;
  downvotes: number;
}

export enum CommentType {
  Pro = 'pro',
  Con = 'con',
}

export interface Poll {
  id: number;
  topic: string;
  description: string;
  proComments: Comment[];
  conComments: Comment[];
  proVotes: number;
  conVotes: number;
  likes: number;
}