import { useState } from 'react';
import Link, { LinkProps } from 'next/link';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { logout } from '@/actions/auth';
import { usePathname } from 'next/navigation';

export interface Links {
  id: string;
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  iconFilled?: React.JSX.Element | React.ReactNode;
}

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate, setOpen } = useSidebar();
  const [hover, setHover] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return link.id === 'logout' ? (
    <span
      className={cn('flex items-center justify-start group/sidebar py-3 cursor-pointer', className)}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={async () => {
        setOpen(false);
        await logout();
      }}
    >
      {hover ? (link.iconFilled ? link.iconFilled : link.icon) : link.icon}

      <motion.div
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className="dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block text-sm !p-0 !m-0 !ml-3"
      >
        <span className={`${(hover || isActive) && 'font-semibold'}`}>{link.label}</span>
      </motion.div>
    </span>
  ) : (
    <div onClick={() => setOpen(!open)}>
      <Link
        href={link.href}
        className={cn('flex items-center justify-start group/sidebar py-3', className)}
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(false)}
        aria-label={`${link.label}`}
      >
        {hover || isActive ? (link.iconFilled ? link.iconFilled : link.icon) : link.icon}

        <motion.div
          animate={{
            display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
            opacity: animate ? (open ? 1 : 0) : 1
          }}
          className="dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block text-sm !p-0 !m-0 !ml-3"
        >
          <span className={`${(hover || isActive) && 'font-semibold'}`}>{link.label}</span>
        </motion.div>
      </Link>
    </div>
  );
};
