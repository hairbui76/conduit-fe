import { Metadata } from 'next';

import { getCurrentUser } from '@/actions/user';
import PostsSection from '@/containers/liked-page/posts-section';
import NeedAuthCard from '@/components/Card/NeedAuthCard';
import TagsSection from '@/containers/tags';

export const metadata: Metadata = {
  title: 'Liked',
  description:
    "Welcome to your Liked Posts! Here, you'll find all the posts you've enjoyed and saved for easy access. Revisit your favorite content, keep up with the discussions that matter to you, and continue to engage with the creators and topics you love. This is your personal collection of inspiration, ideas, and moments that resonated with you on Conduit."
};

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <NeedAuthCard message="You need login to see posts you liked" />;
  }

  return (
    <>
      <PostsSection currentUser={currentUser} />
      <TagsSection />
    </>
  );
}
