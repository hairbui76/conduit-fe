import { notFound } from 'next/navigation';

import SinglePostSection from '@/containers/single-post-page/single-post-section';
import { cookies } from 'next/headers';
import { getSinglePost } from '@/data/post';

export const generateMetadata = async ({ params }: { params: { postSlug: string } }) => {
  const post = await getSinglePost(params.postSlug, cookies().get('AUTH_TOKEN')?.value);

  if (!post)
    return {
      title: 'Post not found',
      description: 'This post can not be found'
    };

  const { title, description, createdAt, author } = post;

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
  const post = await getSinglePost(params.postSlug, cookies().get('AUTH_TOKEN')?.value);

  if (post === null) {
    notFound();
  }

  return <SinglePostSection post={post} />;
}
