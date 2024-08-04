import { getPosts } from '@/actions/post';
import ButtonRefresh from '../Button/RefreshButton';

import PostCard from '../Card/PostCard';
import LoadMore from '../LoadMore';

export default async function Posts({ fetchUrl }: { fetchUrl: string }) {
  const postsData = await getPosts(fetchUrl, { page: 1 });

  return (
    <>
      {/* <ButtonRefresh /> */}
      <>
        {postsData.posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}

        {postsData.nextPage ? <LoadMore fetchUrl={fetchUrl} /> : <p>You have read all posts :)</p>}
      </>
    </>
  );
}
