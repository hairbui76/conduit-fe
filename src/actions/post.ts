'use server';

import { PostSchema } from '@/forms/create-form';
import { insertNewLine } from '@/lib/utils';
import { Comment } from '@/types/Comment';
import { Post } from '@/types/Post';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function getPosts(
  url: string,
  options: { page?: number; liked?: string; tag?: string; author?: string; limit?: number }
) {
  const limit = options.limit || 5;
  const token = cookies().get('AUTH_TOKEN')?.value;

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
      fetch(`${process.env.BACKEND_URL}/api/articles/${article.slug}/comments`, {
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
  });

  return {
    posts: articles,
    postsCount: articlesCount,
    page: page,
    nextPage: page * limit >= articlesCount ? null : page + 1
  };
}

export async function getSinglePost(slug: string) {
  const url = `${process.env.BACKEND_URL}/api/articles/${slug}`;
  const token = cookies().get('AUTH_TOKEN')?.value;

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

export async function createPost(createPostFormData: z.infer<typeof PostSchema>) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to create post' };
  }

  const postBody = processPostFormData(createPostFormData);

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      article: postBody
    })
  });

  if (!response.ok) {
    return { error: 'Could not create post' };
  }

  const slug: string | null | undefined = (await response.json())?.article?.slug;
  if (!!slug) {
    revalidateTag('posts');
    revalidateTag('tags');
    redirect(`/post/${slug}`);
  }
}

export async function updatePost({
  updatePostFormData,
  slug
}: {
  updatePostFormData: z.infer<typeof PostSchema>;
  slug: string;
}) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to update post' };
  }

  const putBody = processPostFormData(updatePostFormData);

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      article: putBody
    })
  });

  if (!response.ok) {
    return { error: 'Could not update post' };
  }

  revalidateTag('posts');
  revalidateTag('tags');
}

export async function deletePost(slug: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to delete post' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return { error: 'Could not delete post' };
  }

  revalidateTag('posts');
  revalidateTag('tags');
}

export async function likePost(slug: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to like this post' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return { error: 'Could not like this post' };
  }

  revalidateTag('posts');
  revalidateTag(slug);
}

export async function unlikePost(slug: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to unlike this post' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return { error: 'Could not unlike this post' };
  }

  revalidateTag('posts');
  revalidateTag(slug);
}

export async function commentPost({ slug, comment }: { slug: string; comment: string }) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to comment this post' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/articles/${slug}/comments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: {
        body: comment
      }
    })
  });

  if (!response.ok) {
    return { error: 'Could not comment this post' };
  }

  revalidateTag(`${slug}-comments`);
}

export async function deleteComment({ slug, commentId }: { slug: string; commentId: string }) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to detete this comment');
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/articles/${slug}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Could not delete this comment');
  }

  revalidateTag(`${slug}-comments`);
}

function processPostFormData(formData: z.infer<typeof PostSchema>): {
  title: string;
  description?: string;
  body: string;
  tagList?: string[];
} {
  const { title, description, body, tagList } = formData;

  const requestBody: { title: string; description?: string; body: string; tagList?: string[] } = {
    title,
    body: insertNewLine(body)
  };
  if (description.length > 0) requestBody.description = description;
  const trimmedTagList = tagList
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  if (trimmedTagList.length > 0) requestBody.tagList = trimmedTagList;

  return requestBody;
}
