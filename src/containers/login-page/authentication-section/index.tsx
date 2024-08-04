'use client';

import { useState } from 'react';

import { LoginCard } from '@/components/Card/LoginCard';
import { SignupCard } from '@/components/Card/SignupCard';

export default function AuthenticationFrom() {
  const [state, setState] = useState<'login' | 'signup'>('login');

  return (
    <div
      id="authentication"
      className="flex justify-center items-center md:flex-grow h-screen px-4"
    >
      {state === 'login' ? <LoginCard setState={setState} /> : <SignupCard setState={setState} />}
    </div>
  );
}
