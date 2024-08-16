import { cn } from '@/lib/utils';
import LoginPageBackground from './components/LoginPageBackground';
import ButtonGoHome from './components/ButtonGoHome';
import ButtonAuthenticate from './components/ButtonAuthenticate';

export default function Introduction({ page }: { page: 'login' | 'signup' }) {
  return (
    <div className="h-screen min-h-screen relative overflow-hidden bg-slate-900 dark:bg-slate-950 flex flex-col items-center justify-center md:basis-1/2">
      <div className="absolute inset-0 w-full h-full bg-slate-900 dark:bg-slate-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <LoginPageBackground />
      <h1 className={cn('md:text-4xl text-3xl text-white relative z-20')}>Conduit is Awesome</h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Connecting Ideas, Sharing Stories
      </p>
      <div className="z-20 mt-4 relative flex items-center">
        <ButtonGoHome />
        <ButtonAuthenticate page={page} />
      </div>
    </div>
  );
}
