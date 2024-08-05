import { Profile } from './Profile';

export type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: Profile;
};
