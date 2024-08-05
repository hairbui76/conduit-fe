import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { useSidebar } from '@/hooks/useSidebar';

export const Logo = () => {
  const { setOpen } = useSidebar();

  return (
    <div className="flex z-20 items-center justify-between" onClick={() => setOpen(!open)}>
      <Link href="/" className="flex space-x-2 items-center text-black py-1">
        <Image src="/logo.png" width={30} height={30} alt="Conduit logo" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-bold text-black dark:text-white whitespace-pre"
        >
          Conduit
        </motion.span>
      </Link>
      <div className="z-50 dark:text-neutral-200 md:hidden" onClick={() => setOpen(!open)}>
        <IconX />
      </div>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <Link href="/" className="space-x-2 py-1 relative z-20">
      <Image src="/logo.png" width={30} height={30} alt="Conduit logo" />
    </Link>
  );
};
