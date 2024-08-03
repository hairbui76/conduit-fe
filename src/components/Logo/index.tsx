import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

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
