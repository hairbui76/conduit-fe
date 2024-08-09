import { LoginCard } from '@/components/Card/LoginCard';
import { SignupCard } from '@/components/Card/SignupCard';

export default function Authentication({ page }: { page: 'login' | 'signup' }) {
  return (
    <div
      id={`${page}-form`}
      className="flex justify-center items-center md:flex-grow min-h-screen px-4"
    >
      {page === 'login' ? <LoginCard /> : <SignupCard />}
    </div>
  );
}
