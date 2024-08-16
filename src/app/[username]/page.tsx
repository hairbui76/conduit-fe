import { notFound } from 'next/navigation';

import { getCurrentUser, getProfile } from '@/actions/user';
import { Card, CardContent, CardHeader } from '@/components/Card';
import UserInfoSection from '@/containers/user-profile-page/user-info-section';
import BackgroundSection from '@/containers/user-profile-page/background-section';
import RecentPost from '@/containers/user-profile-page/posts-section';

export const generateMetadata = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const profile = await getProfile(username);
  if (profile === null) {
    return {
      title: 'User not found',
      description: `User ${username} you are looking for doesn't exist.`
    };
  }

  const currentUser = await getCurrentUser();
  const isMe = currentUser !== null && currentUser.username === profile.username;

  return isMe
    ? {
        title: `@${username}`,
        description:
          'Welcome to your profile! This is your personal space on Conduit where you can showcase your interests, share your thoughts, and connect with others. Update your bio, manage your posts, and highlight your achievements. Explore your activity, followers, and the people you follow. Make your profile uniquely yours and let others get to know you better in the Conduit community.'
      }
    : {
        title: `@${username}`,
        description: `Welcome to ${username}'s Profile Page! Here, you can learn more about ${username}'s interests, see their posts, and follow their activity on Conduit. Discover their shared thoughts, experiences, and contributions to the community. Connect with ${username} to stay updated on their latest posts and engage in meaningful conversations. Explore and get to know a valued member of the Conduit community!`
      };
};

export default async function Page({ params }: { params: { username: string } }) {
  const { username } = params;
  const profile = await getProfile(username);
  if (profile === null) {
    notFound();
  }
  const currentUser = await getCurrentUser();
  const isMe = currentUser !== null && currentUser.username === profile.username;

  return (
    <div className="flex flex-col items-center gap-4 px-4 sm:px-8 sm:w-[600px] md:w-[670px] lg:w-[700px] h-fit">
      <Card className="w-full overflow-hidden">
        <CardHeader className="p-0 w-full relative h-40">
          <BackgroundSection />
        </CardHeader>
        <CardContent className="z-40 px-8">
          <UserInfoSection profile={profile} isMe={isMe} />
          <RecentPost username={username} currentUser={currentUser} />
        </CardContent>
      </Card>
    </div>
  );
}
