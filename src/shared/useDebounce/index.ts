import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect((): (() => void) => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [value]);

  return debouncedValue;
};
