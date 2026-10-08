import React from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
const isRenderingOnServer = typeof window === 'undefined';
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

/**
 *Custom hook designed to detect whether user has prefer-reduced-motion flag
 *@function usePrefersReducedMotion
 *@returns {boolean} prefersReducedMotion - specifies whether user turned off animations preference on OS/browser level
 */
export function usePrefersReducedMotion(): boolean {
  return false;
}
