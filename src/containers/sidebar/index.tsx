import { cookies } from 'next/headers';

import { getCurrentUser } from '@/data/user';
import { SidebarContainer } from './components/SidebarContainer';

export default async function Sidebar() {
  const currentUser = await getCurrentUser(cookies().get('AUTH_TOKEN')?.value);

  return <SidebarContainer currentUser={currentUser} />;
}
