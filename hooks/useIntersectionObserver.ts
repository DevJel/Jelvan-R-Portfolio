// Custom Intersection Observer Hook
// Traces whether an element is in the viewport

import { RefObject, useEffect, useState } from 'react';

interface IntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number;
}

/**
 * Custom Intersection Observer hook used to trace whether an element is in the viewport
 *@function useIntersectionObserver
 *@param {React.RefObject<HTMLElement>} ref - ref to React.Node or HTML element
 *@param {IntersectionObserverOptions} options - root margin or threshold of element (standard intersection observer props)
 *@returns {boolean} isElementVisible - the hook returns a boolean value whether the element in viewport
 */
export const useIntersectionObserver = (
  ref: null | RefObject<HTMLDivElement>,
  options: IntersectionObserverOptions
): boolean[] => {
  const [isElementVisible, setIsElementVisible] = useState(false);
  const { rootMargin = '0px', threshold = 0 } = options;

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsElementVisible(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return [isElementVisible];
};
