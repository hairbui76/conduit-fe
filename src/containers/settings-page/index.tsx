import { getCurrentUser } from '@/actions/user';
import SettingsSection from './settings-section';
import Sidebar from './sidebar-section';
import SettingsCard from '@/components/Card/SettingsCard';
import NeedAuthCard from '@/components/Card/NeedAuthCard';

const tabNames = ['profile', 'account', 'appearance'] as const;

export type TabName = (typeof tabNames)[number];

export default async function SettingsContainer() {
  const currentUser = await getCurrentUser();

  return (
    <SettingsCard>
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar tabs={[...tabNames]} />
        {currentUser ? (
          <SettingsSection className="flex-grow space-y-6" currentUser={currentUser} />
        ) : (
          <NeedAuthCard message="You need login to setting your account" />
        )}
      </div>
    </SettingsCard>
  );
}
