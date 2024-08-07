import Spinner from '@/components/common/Spinner';

export default function Loading() {
  return (
    <div className="sm:w-[570px] md:w-[640px] pt-6 pb-4 px-8 h-fit flex justify-center">
      <Spinner className="my-2 w-7 h-7" />
    </div>
  );
}
