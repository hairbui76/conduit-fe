import { Button } from '@/components/Button';
import { IconEdit } from '@tabler/icons-react';

export default function ButtonEditPost({
  setOpen
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button className="px-2 w-full" variant="ghost" onClick={() => setOpen(true)}>
      Edit
      <IconEdit className="w-5 h-5 ml-auto" />
    </Button>
  );
}
