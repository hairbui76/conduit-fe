import SettingsContainer from '@/containers/settings-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description:
    'Welcome to the Settings Page! Here, you can customize your Conduit experience to fit your preferences. Manage your account details, adjust privacy settings, configure notifications, and personalize your interface. Take control of your experience on Conduit and make sure everything is set just the way you like it. Your journey, your way!'
};

export default function Page() {
  return <SettingsContainer />;
}
