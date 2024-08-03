import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';

export default function PostCardHeaderAvatar() {
  return (
    <Avatar className="w-9 h-9">
      <AvatarImage src="https://assets.leetcode.com/users/avatars/avatar_1698835075.png" />
      <AvatarFallback>LN</AvatarFallback>
    </Avatar>
  );
}
