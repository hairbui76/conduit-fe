export default function PostSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-4 px-4 sm:px-8 sm:w-[570px] md:w-[640px] h-fit">
      {children}
    </section>
  );
}
