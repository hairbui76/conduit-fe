import { getCurrentUser } from '@/actions/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Card } from '@/components/common/Card';
import CreatePostDialog from '@/components/Dialog/CreatePostDialog';

export default async function CreatePostSection() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;

  const { username, image } = currentUser;

  return (
    <Card className="px-6 py-4 flex gap-3 w-full items-center">
      <Avatar className="w-9 h-9">
        <AvatarImage src={image} alt={`${username} avatar`} />
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <CreatePostDialog />
    </Card>
  );
}
