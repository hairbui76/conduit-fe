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
        href: '/profile',
        icon: (
          <Avatar className="w-7 h-7">
            <AvatarImage src={currentUser.image} />
            <AvatarFallback>LN</AvatarFallback>
          </Avatar>
        )
      }}
    />
  );
}
