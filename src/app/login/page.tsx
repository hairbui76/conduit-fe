import type { Metadata } from 'next';

import Authentication from '@/containers/login-page/authentication-section';
import Introduction from '@/containers/login-page/introduction-section';

export const metadata: Metadata = {
  title: 'Login',
  description:
    "Welcome to Conduit! Please log in to access your personalized feed, connect with friends, and explore a world of engaging content. Enter your credentials to start sharing your thoughts, discovering new communities, and making meaningful connections. If you're new here, sign up to join our vibrant community and be a part of the conversation!"
};

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Introduction page="login" />
      <Authentication page="login" />
    </div>
  );
}
