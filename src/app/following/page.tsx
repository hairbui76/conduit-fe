import { Metadata } from 'next';

import { getCurrentUser } from '@/actions/user';
import PostsSection from '@/containers/following-page/posts-section';
import NeedAuthCard from '@/components/Card/NeedAuthCard';
import TagsSection from '@/containers/tags';

export const metadata: Metadata = {
  title: 'Following',
  description:
    "Welcome to your Followed People's Posts! This is where you'll see the latest updates and posts from the people you follow on Conduit. Stay connected with your favorite creators, friends, and influencers, and be the first to engage with their new content. Enjoy a curated feed of insights, stories, and experiences from the voices you care about most."
};

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NeedAuthCard message="You need login to see posts from people you are following" />;
  }

  return (
    <>
      <PostsSection currentUser={currentUser} />
      <TagsSection />
    </>
  );
}
