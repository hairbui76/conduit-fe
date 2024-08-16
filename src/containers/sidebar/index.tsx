import { getCurrentUser } from '@/actions/user';
import { SidebarContainer } from './components/SidebarContainer';

export async function Sidebar() {
  const currentUser = await getCurrentUser();

  return <SidebarContainer currentUser={currentUser} />;
}
