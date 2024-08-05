'use server';

import { signupSchema } from '@/forms/signup-form';
import { Profile } from '@/types/Profile';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function createUser(signupFormData: z.infer<typeof signupSchema>) {
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
