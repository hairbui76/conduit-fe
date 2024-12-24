'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

import { SignupSchema } from '@/forms/signup-form';
import { z } from 'zod';
import { UpdateProfileSchema } from '@/forms/update-user-form';
import { login } from './auth';

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
      if (data.errors.email) return { error: `Email ${data.errors.email}` };
      if (data.errors.username) return { error: `Username ${data.errors.username}` };
    }
  }
}

export async function followUser(username: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to follow this user' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/profiles/${username}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return { error: 'Could not follow this user' };
  }

  revalidateTag('posts');
  revalidateTag(username);
}

export async function unfollowUser(username: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to follow this user' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/profiles/${username}/follow`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return { error: 'Could not unfollow this user' };
  }

  revalidateTag('posts');
  revalidateTag(username);
}

export async function getToken() {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to update profile' };
  }

  return token;
}

export async function updateProfile(formData: FormData) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  // const formData = new FormData();
  // for (const key in updateProfileFormData) {
  //   formData.append(key, updateProfileFormData[key]);
  // }

  // if (image) formData.append('avatar', image);

  if (!token) {
    return { error: 'You need login to update profile' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    return { error: 'Could not update profile' };
  }

  revalidatePath('/');
}

export async function updatePassword(newPassword: string) {
  const token = cookies().get('AUTH_TOKEN')?.value;

  if (!token) {
    return { error: 'You need login to change your password' };
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user: {
        password: newPassword
      }
    })
  });

  if (!response.ok) {
    return { error: 'Could not change your password' };
  }

  const data: {
    user: {
      email: string;
    };
  } = await response.json();

  await login({ email: data.user.email, password: newPassword }, false);
}
