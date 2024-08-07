export default function PostSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-4 sm:w-[570px] h-fit">{children}</section>
  );
}
