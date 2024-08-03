import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.nav
        className={cn(
          'h-full px-4 py-3 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0',
          className
        )}
        animate={{
          width: animate ? (open ? '250px' : '64px') : '250px'
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.nav>
    </>
  );
};
