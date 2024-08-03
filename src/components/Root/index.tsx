'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';
import {
  IconArrowLeft,
  IconHome,
  IconSettings,
  IconUserBolt,
  IconHeart,
  IconRosetteDiscountCheck,
  IconBookmark
} from '@tabler/icons-react';
import { cn, sliceString } from '@/lib/utils';
import { Sidebar, SidebarBody, SidebarLink } from '../Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../common/Avatar';

export function Root({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: 'Home',
      href: '/',
      icon: <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: 'Following',
      href: '/following',
      icon: (
        <IconRosetteDiscountCheck className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: 'Liked',
      href: '/liked',
      icon: <IconHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: 'Saved',
      href: '/saved',
      icon: (
        <IconBookmark className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      )
    }
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-auto h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 border-r sticky top-0">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-12 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: sliceString('Nguyễn Đức Lộc', 25),
                href: '#',
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

export const Logo = () => {
  return (
    <Link href="/" className="flex space-x-2 items-center text-black py-1 relative z-20">
      <Image src="/logo.png" width={30} height={30} alt="Conduit logo" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-black dark:text-white whitespace-pre"
      >
        Conduit
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="space-x-2 py-1 relative z-20">
      <Image src="/logo.png" width={30} height={30} alt="Conduit logo" />
    </Link>
  );
};
