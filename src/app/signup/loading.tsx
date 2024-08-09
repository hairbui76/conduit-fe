import Spinner from '@/components/common/Spinner';

export default function Loading() {
  return (
    <div className="flex-grow flex flex-col items-center gap-4 px-8 md:pt-12 pt-16 pb-4 h-fit min-h-screen">
      <Spinner className="my-2 w-7 h-7" />
    </div>
  );
}
