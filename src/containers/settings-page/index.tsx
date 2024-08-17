import { cookies } from 'next/headers';

import { getCurrentUser } from '@/data/user';
import SettingsSection from './settings-section';
import Sidebar from './sidebar-section';
import { Card } from '@/components/Card';
import { Separator } from '@/components/Separator';

const tabNames = ['profile', 'account', 'appearance'] as const;

export type TabName = (typeof tabNames)[number];

export default async function SettingsContainer() {
  const currentUser = await getCurrentUser(cookies().get('AUTH_TOKEN')?.value);

  return (
    <Card className="px-10 py-12 sm:w-[600px] md:w-[670px] lg:w-[900px] h-fit">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set appearance.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar tabs={[...tabNames]} />
        <SettingsSection className="flex-grow space-y-6 basis-2/3" currentUser={currentUser} />
      </div>
    </Card>
  );
}
