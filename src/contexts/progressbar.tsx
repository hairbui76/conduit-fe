'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="3px" color="#09090b" options={{ showSpinner: false }} shallowRouting />
    </>
  );
};

export default ProgressBarProvider;
