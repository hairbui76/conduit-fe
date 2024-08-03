import Link, { LinkProps } from 'next/link';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { useState } from 'react';

interface Links {
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
  const { open, animate } = useSidebar();
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={link.href}
      className={cn('flex items-center justify-start gap-3 group/sidebar py-3', className)}
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (link.iconFilled ?? link.icon) : link.icon}

      <motion.div
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1
        }}
        className="text-semibold dark:text-neutral-200 group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block text-sm !p-0 !m-0"
      >
        {link.label}
      </motion.div>
    </Link>
  );
};
