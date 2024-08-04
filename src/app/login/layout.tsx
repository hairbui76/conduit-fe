import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description:
    "Welcome to Conduit! Please log in to access your personalized feed, connect with friends, and explore a world of engaging content. Enter your credentials to start sharing your thoughts, discovering new communities, and making meaningful connections. If you're new here, sign up to join our vibrant community and be a part of the conversation!"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
