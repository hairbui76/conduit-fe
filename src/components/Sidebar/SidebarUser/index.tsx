import { SidebarLink } from '../SidebarLink';
import { sliceString } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Profile } from '@/types/Profile';

export default function SidebarUser({ currentUser }: { currentUser: Profile }) {
  return (
    <SidebarLink
      link={{
        id: 'avatar',
        label: sliceString(`@${currentUser.username}`, 25),
        href: `/${currentUser.username}`,
        icon: (
          <Avatar className="w-7 h-7">
            <AvatarImage src={currentUser.image} alt={`${currentUser.username} avatar`} />
            <AvatarFallback>{currentUser.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        )
      }}
    />
  );
}
