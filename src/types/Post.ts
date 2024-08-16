import { Comment } from './Comment';
import { Profile } from './Profile';

export type Post = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  commentsCount: number;
  firstComment: Comment | null;
  author: Profile;
  comments: Comment[];
};

export type PostCardType = 'detail' | 'summary';
