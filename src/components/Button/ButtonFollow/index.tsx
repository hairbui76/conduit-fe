'use client';

import { useTransition } from 'react';

import { Button } from '@/components/Button';
import { followUser, unfollowUser } from '@/actions/user';
import toast from 'react-hot-toast';
import { IconBellRinging2, IconPlus } from '@tabler/icons-react';
import Spinner from '@/components/Spinner';

export default function ButtonFollow({
  username,
  following,
  size,
  className
}: {
  username: string;
  following: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  className?: string;
}) {
  const [pending, startTrasition] = useTransition();

  function handleClick() {
    const fn = following ? unfollowUser : followUser;

    startTrasition(async () => {
      try {
        await fn(username);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Something went wrong. Try again later', {
          position: 'top-center'
        });
      }
    });
  }

  return (
    <Button
      className={className}
      size={size ?? 'default'}
      onClick={handleClick}
      disabled={pending}
      variant={following ? 'outline' : 'default'}
    >
      {following ? (
        <>
          {pending ? (
            <Spinner className="w-4 h-4 mr-2" />
          ) : (
            <IconBellRinging2 className="w-4 h-4 mr-2" />
          )}
          Following
        </>
      ) : (
        <>
          {pending ? <Spinner className="w-4 h-4 mr-2" /> : <IconPlus className="w-4 h-4 mr-2" />}
          Follow
        </>
      )}
    </Button>
  );
}
