'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { SignupSchema } from '@/forms/signup-form';
import { Profile } from '@/types/Profile';
import { z } from 'zod';
import { UpdateProfileSchema } from '@/forms/update-user-form';

export async function createUser(signupFormData: z.infer<typeof SignupSchema>) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        ...signupFormData
      }
    })
  });

  const data:
    | {
        user: { username: string; email: string; admin: boolean; token: string };
      }
    | { errors: { username?: string; email?: string } } = await response.json();
  if (!response.ok) {
    if ('errors' in data) {
      if (data.errors.email) throw new Error('Email is already used.');
      if (data.errors.username) throw new Error('Username is already used.');
    }
  }
}

export async function getCurrentUser() {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) return null;

  const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) return null;

  const currentUser: { user: Profile } = await response.json();

  return currentUser.user;
}

export async function followUser(username: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to follow this user');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/profiles/${username}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Could not follow this user');
  }

  revalidateTag('posts');
  revalidateTag(username);
}

export async function unfollowUser(username: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to unfollow this user');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/profiles/${username}/follow`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Could not unfollow this user');
  }

  revalidateTag('posts');
  revalidateTag(username);
}

export async function getProfile(username: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/profiles/${username}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    },
    next: {
      tags: [username]
    }
  });

  if (!response.ok) {
    return null;
  }

  const data: { profile: Profile } = await response.json();

  return data.profile;
}

export async function updateProfile(updateProfileFormData: z.infer<typeof UpdateProfileSchema>) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    throw new Error('You need login to update profile');
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user: updateProfileFormData
    })
  });

  if (!response.ok) {
    throw new Error('Could not update profile');
  }

  revalidatePath('/');
}
