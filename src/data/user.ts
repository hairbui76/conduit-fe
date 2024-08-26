import { Profile } from '@/types/Profile';

export async function getProfile(username: string, token: string | undefined) {
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

export async function getCurrentUser(token: string | undefined) {
  if (!token) return null;

  const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) return null;

  const currentUser: { user: Profile } = await response.json();

  return await getProfile(currentUser.user.username, token);
}
