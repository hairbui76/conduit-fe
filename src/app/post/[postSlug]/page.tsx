import { getSinglePost } from '@/actions/post';
import SinglePostSection from '@/containers/single-post-page/single-post-section';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { postSlug: string } }) {
  const data = await getSinglePost(params.postSlug);

  if (data === null) {
    notFound();
  }

  return <SinglePostSection post={data.post} comments={data.comments} />;
}
