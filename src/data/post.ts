import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';

export async function getPosts(
  url: string,
  options: { page?: number; liked?: string; tag?: string; author?: string; limit?: number },
  token: string | undefined,
  backendUrl?: string
) {
  const limit = options.limit || 5;

  const postsResponse = await fetch(
    `${url}?limit=${limit}&page=${options.page || ''}&favorited=${options.liked || ''}&author=${options.author || ''}${options.tag ? `&tag=${options.tag}` : ''}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      next: { tags: ['posts'] }
    }
  );
  if (!postsResponse.ok) {
    throw new Error('Could not get posts.');
  }

  const postsData: { articles: Post[]; articlesCount: number; page: number } =
    await postsResponse.json();

  const commentsData: { comments: Comment[] }[] = await Promise.all(
    postsData.articles.map(article =>
      fetch(`${process.env.BACKEND_URL || backendUrl}/api/articles/${article.slug}/comments`, {
        next: { tags: [`${article.slug}-comments`] }
      }).then(r => {
        if (!r.ok) {
          throw new Error(`Could not get ${article.slug} comments.`);
        }
        return r.json();
      })
    )
  );

  const { articles, articlesCount, page } = postsData;

  articles.forEach((article, index) => {
    const comments = commentsData[index].comments;
    article.commentsCount = comments.length;
    article.firstComment = comments.length > 0 ? comments[0] : null;
    article.comments = comments;
  });

  return {
    posts: articles,
    postsCount: articlesCount,
    page: page,
    nextPage: page * limit >= articlesCount ? null : page + 1
  };
}

export async function getSinglePost(slug: string, token: string | undefined) {
  const url = `${process.env.BACKEND_URL}/api/articles/${slug}`;

  const [postResponse, commentsResponse] = await Promise.all([
    fetch(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      next: { tags: [slug] }
    }),
    fetch(`${url}/comments`, { next: { tags: [`${slug}-comments`] } })
  ]);

  if (!postResponse.ok) {
    return null;
  }

  const [postData, commentsData]: [
    postData: { article: Post },
    commentData: { comments: Comment[] }
  ] = await Promise.all([postResponse.json(), commentsResponse.json()]);

  const post = postData.article;
  post.comments = commentsData.comments;
  post.commentsCount = commentsData.comments.length;
  return post;
}
