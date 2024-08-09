import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Profile } from '@/types/Profile';

export default function PostCardHeaderAvatar({ author }: { author: Profile }) {
  return (
    <Avatar className="w-9 h-9">
      <AvatarImage src={author.image} alt={`${author.username} avatar`} />
      <AvatarFallback>{author.username[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
