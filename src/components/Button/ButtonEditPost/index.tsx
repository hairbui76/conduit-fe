import { Button } from '@/components/common/Button';
import { IconEdit } from '@tabler/icons-react';

export default function ButtonEditPost() {
  return (
    <Button className="p-2 w-full" variant="ghost">
      Edit
      <IconEdit className="w-5 h-5 ml-auto" />
    </Button>
  );
}
