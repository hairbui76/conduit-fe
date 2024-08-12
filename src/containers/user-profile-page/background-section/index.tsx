import ProfileBackground from '@/components/Background/ProfileBackground';

export default function BackgroundSection() {
  return (
    <section className="relative bg-gray-900 dark:bg-gray-950 px-6 py-8 h-full overflow-hidden flex flex-col justify-end items-start">
      <ProfileBackground number={20} />
    </section>
  );
}
