import { Metadata } from 'next';
import Link from 'next/link';

import { getCurrentUser } from '@/actions/user';
import PostsSection from '@/containers/liked-page/posts-section';
import { Button } from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';

export const metadata: Metadata = {
  title: 'Liked',
  description:
    "Welcome to your Liked Posts! Here, you'll find all the posts you've enjoyed and saved for easy access. Revisit your favorite content, keep up with the discussions that matter to you, and continue to engage with the creators and topics you love. This is your personal collection of inspiration, ideas, and moments that resonated with you on Conduit."
};

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <Card className="sm:w-[570px] md:w-[640px] p-16 h-fit flex justify-center">
        <CardContent className="text-center p-0">
          <p className="pb-2">You need login to comment this post</p>
          <Button>
            <Link href="/login">Go to login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <PostsSection currentUser={currentUser} />;
}
