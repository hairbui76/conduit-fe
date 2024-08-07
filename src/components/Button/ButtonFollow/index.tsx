'use client';

import { useTransition } from 'react';

import { Button } from '@/components/common/Button';
import { followUser, unfollowUser } from '@/actions/user';
import toast from 'react-hot-toast';
import { IconBellRinging2, IconPlus } from '@tabler/icons-react';

export default function ButtonFollow({
  username,
  following
}: {
  username: string;
  following: boolean;
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
      className="w-full mt-4"
      size="sm"
      onClick={handleClick}
      disabled={pending}
      variant={following ? 'outline' : 'default'}
    >
      {following ? (
        <>
          <IconBellRinging2 className="w-4 h-4 mr-2" />
          Following
        </>
      ) : (
        <>
          <IconPlus className="w-4 h-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  );
}
