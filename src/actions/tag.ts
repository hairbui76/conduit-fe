'use server';

export async function getTags() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/tags`);

  if (!response.ok) {
    return null;
  }

  const data: { tags: string[] } = await response.json();

  return data.tags;
}
