'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { SidebarProvider } from '@/contexts/sidebar';
import { SidebarBody } from '../SidebarBody';
import { Logo, LogoIcon } from '@/components/Logo';
import { Links, SidebarLink } from '../SidebarLink';
import SidebarUser from '../SidebarUser';
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
import { Profile } from '@/types/Profile';

export const SidebarContainer = ({
  animate,
  currentUser
}: {
  animate?: boolean;
  currentUser: Profile | null;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === '/login') return null;

  const isLoggedIn = currentUser !== null;

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
        href: `/${currentUser.username}`,
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

  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      <SidebarBody className="justify-between gap-10 border-r md:sticky md:top-0">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-12 flex flex-col gap-2">
            {links.map(link => (
              <SidebarLink key={link.id} link={link} className="pl-1" />
            ))}
          </div>
        </div>
        {currentUser !== null && <SidebarUser currentUser={currentUser} />}
      </SidebarBody>
    </SidebarProvider>
  );
};
