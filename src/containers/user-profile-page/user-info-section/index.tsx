import Bio from '@/components/Bio';
import ButtonCopy from '@/components/Button/ButtonCopy';
import ButtonEditProfile from '@/components/Button/ButtonEditProfile';
import ButtonFollow from '@/components/Button/ButtonFollow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar';
import { Profile } from '@/types/Profile';

export default function UserInfoSection({ profile, isMe }: { profile: Profile; isMe: boolean }) {
  const { username, image, following, bio } = profile;

  return (
    <section>
      <Avatar className="w-28 h-28 -translate-y-1/2 border-4 border-white">
        <AvatarImage src={image} alt={`${username} avatar`} />
        <AvatarFallback className="text-2xl">{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="-mt-12">
        <p className="font-bold">@{username}</p>
        <div className="flex gap-4 mt-2 mb-6 flex-wrap items-center">
          {isMe ? (
            <ButtonEditProfile className="flex-grow" />
          ) : (
            <ButtonFollow username={username} following={following} className="flex-grow" />
          )}
          <ButtonCopy
            page=""
            id={username}
            variant="outline"
            className="flex-row-reverse flex-grow"
            iconClassName="mr-2"
          />
        </div>
        <div>
          <h6 className="font-semibold mb-1">Bio</h6>
          <Bio text={bio} />
        </div>
      </div>
    </section>
  );
}
