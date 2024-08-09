'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/common/Button';
import { TabName } from '..';
import { capitalize } from 'lodash';

export default function Sidebar({ tabs }: { tabs: TabName[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = (searchParams.get('tab') as TabName) ?? 'profile';

  function handleSwitchTab(tabName: TabName) {
    const params = new URLSearchParams();
    params.set('tab', tabName);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <nav className="flex lg:flex-col basis-1/3 flex-wrap gap-2">
      {tabs.map(tab => (
        <Button
          key={tab}
          variant={activeTab === tab ? 'secondary' : 'ghost'}
          className="lg:justify-start flex-grow lg:flex-grow-0 lg:mb-2"
          onClick={() => handleSwitchTab(tab)}
        >
          {capitalize(tab)}
        </Button>
      ))}
    </nav>
  );
}
