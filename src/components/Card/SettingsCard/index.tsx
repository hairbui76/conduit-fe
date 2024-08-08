import { Separator } from '@/components/Separator';
import { Card } from '@/components/common/Card';

export default function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="px-10 py-12 sm:w-[600px] md:w-[670px] lg:w-[900px] h-fit">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set appearance.</p>
      </div>
      <Separator className="my-6" />
      {children}
    </Card>
  );
}
