import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getSinglePost } from '@/actions/post';
import SinglePostSection from '@/containers/single-post-page/single-post-section';

export const generateMetadata = async ({ params }: { params: { postSlug: string } }) => {
  const data = await getSinglePost(params.postSlug);

  if (!data)
    return {
      title: 'Post not found',
      description: 'This post can not be found'
    };

  return {
    title: data.post.title,
    description: data.post.description,
    openGraph: {
      title: data.post.title,
      description: data.post.description,
      type: 'article',
      publishedTime: data.post.createdAt,
      authors: [data.post.author]
    }
  };
};

export default async function Page({ params }: { params: { postSlug: string } }) {
  const data = await getSinglePost(params.postSlug);

  if (data === null) {
    notFound();
  }

  return <SinglePostSection post={data.post} comments={data.comments} />;
}
