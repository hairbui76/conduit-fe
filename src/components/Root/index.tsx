'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  IconHome,
  IconSettings,
  IconHeart,
  IconRosetteDiscountCheck,
  IconBookmark,
  IconHomeFilled,
  IconRosetteDiscountCheckFilled,
  IconHeartFilled,
  IconBookmarkFilled,
  IconSettingsFilled,
  IconUserFilled,
  IconUser,
  IconLogout2,
  IconLogin
} from '@tabler/icons-react';
import { cn, sliceString } from '@/lib/utils';
import { Sidebar } from '../Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../common/Avatar';
import { SidebarBody } from '../Sidebar/SidebarBody';
import { Links, SidebarLink } from '../Sidebar/SidebarLink';
import { Logo, LogoIcon } from '../Logo';

export function Root({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) {
  let links: Links[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: <IconHome className="h-5 w-5 flex-shrink-0" />,
      iconFilled: <IconHomeFilled className="h-5 w-5 flex-shrink-0" />
    }
  ];

  if (isLoggedIn) {
    links = links.concat([
      {
        id: 'following',
        label: 'Following',
        href: '/following',
        icon: <IconRosetteDiscountCheck className="h-5 w-5 flex-shrink-0" />,
        iconFilled: <IconRosetteDiscountCheckFilled className="h-5 w-5 flex-shrink-0" />
      },
      {
        id: 'liked',
        label: 'Liked',
        href: '/liked',
        icon: <IconHeart className="h-5 w-5 flex-shrink-0" />,
        iconFilled: <IconHeartFilled className="h-5 w-5 flex-shrink-0" />
      },
      {
        id: 'saved',
        label: 'Saved',
        href: '/saved',
        icon: <IconBookmark className="h-5 w-5 flex-shrink-0" />,
        iconFilled: <IconBookmarkFilled className="h-5 w-5 flex-shrink-0" />
      },
      {
        id: 'profile',
        label: 'Profile',
        href: '/profile',
        icon: <IconUser className="h-5 w-5 flex-shrink-0" />,
        iconFilled: <IconUserFilled className="h-5 w-5 flex-shrink-0" />
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: (
          <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        ),
        iconFilled: (
          <IconSettingsFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        )
      },
      {
        id: 'logout',
        label: 'Logout',
        href: '#',
        icon: (
          <IconLogout2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
        )
      }
    ]);
  } else {
    links.push({
      id: 'login',
      label: 'Login / Signup',
      href: '/login',
      icon: <IconLogin className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    });
  }

  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/login') {
    return children;
  }

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-auto h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r md:sticky md:top-0">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-12 flex flex-col gap-2">
              {links.map(link => (
                <SidebarLink key={link.id} link={link} className="pl-1" />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                id: 'avatar',
                label: sliceString('Nguyễn Đức Lộc', 25),
                href: '/profile',
                icon: (
                  <Avatar className="w-7 h-7">
                    <AvatarImage src="https://assets.leetcode.com/users/avatars/avatar_1698835075.png" />
                    <AvatarFallback>LN</AvatarFallback>
                  </Avatar>
                )
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
