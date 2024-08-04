import Posts from '@/components/Posts';

export default function PostsSection() {
  return (
    <section className="flex-grow flex flex-col items-center gap-4 px-8 md:pt-12 pt-16 h-fit">
      <Posts fetchUrl={`${process.env.BACKEND_URL}/api/articles`} queryKey="posts-for-you" />
    </section>
  );
}
