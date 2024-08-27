'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { useSocket } from '@/hooks/useSocket';
import toast from 'react-hot-toast';
import { IconBubbleFilled, IconHeartFilled } from '@tabler/icons-react';
import { sliceString } from '@/lib/utils';

type TNotification = { user: string; postSlug: string; postTitle: string };

export default function Notification() {
  const { socket, status } = useSocket();

  function receiveNotification(
    action: 'comment' | 'like',
    { user, postSlug, postTitle }: TNotification
  ) {
    toast(
      t => (
        <Link href={`/post/${postSlug}`} onClick={() => toast.dismiss(t.id)}>
          <strong>{user}</strong> {action === 'comment' ? 'commented on' : 'liked'} your post:
          &quot;
          <strong>{sliceString(postTitle, 30)}</strong>&quot;
        </Link>
      ),
      {
        icon:
          action === 'comment' ? (
            <IconBubbleFilled className="w-9 h-9 mr-2 fill-blue-500" />
          ) : (
            <IconHeartFilled className="w-9 h-9 mr-2 fill-primary" />
          ),
        position: 'bottom-left'
      }
    );
  }

  useEffect(() => {
    if (status === 'connected') {
      socket?.on('comment', (notification: TNotification) =>
        receiveNotification('comment', notification)
      );

      socket?.on('like', (notification: TNotification) =>
        receiveNotification('like', notification)
      );

      return () => {
        socket?.off('comment', (notification: TNotification) =>
          receiveNotification('comment', notification)
        );
        socket?.off('like', (notification: TNotification) =>
          receiveNotification('like', notification)
        );
      };
    }
  }, [socket, status]);

  return null;
}
