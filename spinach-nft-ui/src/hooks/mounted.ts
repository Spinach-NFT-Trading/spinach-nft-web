'use client';
import React from 'react';


type UseMountedOpts<T> = {
  onMounted?: () => Promise<T>,
};

export const useMounted = <T>(opts?: UseMountedOpts<T>) => {
  const [mounted, setMounted] = React.useState(false);
  const [onMountedReturn, setOnMountedReturn] = React.useState<T | null>(null);

  React.useEffect(() => {
    setMounted(true);
    if (opts?.onMounted) {
      opts.onMounted().then(setOnMountedReturn);
    }
  }, []);

  return {mounted, onMountedReturn};
};
