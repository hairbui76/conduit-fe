import type { Metadata } from 'next';

import Authentication from '@/containers/login-page/authentication-section';
import Introduction from '@/containers/login-page/introduction-section';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    "Welcome to Conduit! Join our community by creating your account today. Signing up is quick and easy—just fill in your details to get started. Once you're in, you'll be able to connect with others, share your ideas, and explore a world of engaging content. Become a part of Conduit and start making meaningful connections now!"
};

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Introduction page="signup" />
      <Authentication page="signup" />
    </div>
  );
}
