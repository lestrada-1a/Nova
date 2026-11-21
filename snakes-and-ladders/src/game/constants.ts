import type { PlayerColor } from './types';

export const BOARD_SIZE = 100;
export const BOARD_COLUMNS = 10;
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;
export const DIE_SIDES = 6;

/** Colors chosen to have at least 4.5:1 contrast against white text. */
export const PLAYER_COLORS: readonly PlayerColor[] = [
  { name: 'Red', value: '#c62828' },
  { name: 'Blue', value: '#1565c0' },
  { name: 'Green', value: '#2e7d32' },
  { name: 'Purple', value: '#6a1b9a' },
];

export const DEFAULT_ROLL_DELAY_MS = 600;
export const DEFAULT_STEP_DELAY_MS = 250;
