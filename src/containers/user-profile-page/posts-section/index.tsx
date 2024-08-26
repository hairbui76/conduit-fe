import { default as PostsContainer } from '@/containers/posts';
import Posts from '@/components/Posts';
import { Profile } from '@/types/Profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs';

enum TabNames {
  Recent = 'recent',
  Liked = 'liked'
}

export default function PostSection({
  username,
  currentUser
}: {
  username: string;
  currentUser: Profile | null;
}) {
  return (
    <div className="mt-6">
      <Tabs defaultValue={TabNames.Recent}>
        <TabsList className="mb-2 w-full flex-wrap h-fit">
          <TabsTrigger value={TabNames.Recent} className="flex-grow">
            Recent posts
          </TabsTrigger>
          <TabsTrigger value={TabNames.Liked} className="flex-grow">
            Liked posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TabNames.Recent}>
          <PostsContainer className="w-full sm:w-full">
            <Posts
              fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
              options={{ author: username }}
              currentUser={currentUser}
            />
          </PostsContainer>
        </TabsContent>
        <TabsContent value={TabNames.Liked}>
          <PostsContainer>
            <Posts
              fetchUrl={`${process.env.BACKEND_URL}/api/articles`}
              options={{ liked: username }}
              currentUser={currentUser}
            />
          </PostsContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
