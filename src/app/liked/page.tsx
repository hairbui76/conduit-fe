import { Metadata } from 'next';
import { cookies } from 'next/headers';

import LikedPostsSection from '@/containers/liked-page/posts-section';
import NeedAuthCard from '@/components/Card/NeedAuthCard';
import TagsSection from '@/containers/tags';
import { getCurrentUser } from '@/data/user';

export const metadata: Metadata = {
  title: 'Liked',
  description:
    "Welcome to your Liked Posts! Here, you'll find all the posts you've enjoyed and saved for easy access. Revisit your favorite content, keep up with the discussions that matter to you, and continue to engage with the creators and topics you love. This is your personal collection of inspiration, ideas, and moments that resonated with you on Conduit."
};

export default async function Page() {
  const currentUser = await getCurrentUser(cookies().get('AUTH_TOKEN')?.value);
  if (!currentUser) {
    return (
      <NeedAuthCard
        message="You need login to see posts you liked"
        className="sm:w-[570px] md:w-[640px]"
      />
    );
  }

  return (
    <>
      <LikedPostsSection currentUser={currentUser} />
      <TagsSection />
    </>
  );
}
