import { random } from '../../utils';

const DEFAULT_COLOR = '#f48120';

export interface ISparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex?: number;
  };
}

// Monotonic counter guarantees unique React keys (random ids could collide).
let sparkleCounter = 0;

export const generateSparkle = (color = DEFAULT_COLOR): ISparkle => {
  sparkleCounter += 1;
  return {
    id: `sparkle-${sparkleCounter}`,
    createdAt: Date.now(),
    // Bright yellow color:
    color,
    size: random(14, 26),
    style: {
      // Pick a random spot in the available space
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2,
    },
  };
};
