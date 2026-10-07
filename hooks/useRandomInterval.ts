import React from 'react';

const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min)) + min;

export const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
): (() => void) => {
  const timeoutId = React.useRef<number | undefined>(undefined);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const isEnabled =
      typeof minDelay === 'number' && typeof maxDelay === 'number';
    if (isEnabled && minDelay !== null && maxDelay !== null) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);
  return cancel;
};
