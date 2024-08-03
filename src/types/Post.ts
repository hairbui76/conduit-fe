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
  favoritedCount: number;
  author: Profile;
};
