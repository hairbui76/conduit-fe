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

  const { title, description, createdAt, author } = data.post;

  return {
    title: title,
    description: description === undefined || description.length === 0 ? title : description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      publishedTime: createdAt,
      authors: [author]
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
