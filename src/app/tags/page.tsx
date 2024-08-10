import { Metadata } from 'next';

import TagsSection from '@/containers/tags';

export const metadata: Metadata = {
  title: 'Tags',
  description:
    "Conduit is a dynamic social media platform designed to bring people together through meaningful conversations and shared experiences. Whether you're looking to connect with like-minded individuals, share your stories, or discover new perspectives, Conduit is your go-to place. Our intuitive interface and diverse community make it easy to engage, express, and inspire. Join Conduit today and be part of a network where your voice matters and connections flourish."
};

export default function Page() {
  return <TagsSection canHidden={false} />;
}
