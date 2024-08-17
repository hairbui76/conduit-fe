'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { PostSchema } from '@/forms/create-form';
import { insertNewLine } from '@/lib/utils';
import { z } from 'zod';

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
