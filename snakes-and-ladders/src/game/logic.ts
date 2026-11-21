import { BOARD_COLUMNS, BOARD_SIZE, DIE_SIDES } from './constants';
import type { BoardConfig, Jump } from './types';

/**
 * Squares a token walks through when moving `roll` squares from `position`.
 * Returns an empty path when the roll would overshoot the final square.
 */
export function getMovePath(position: number, roll: number): number[] {
  if (!isValidRoll(roll) || position + roll > BOARD_SIZE) return [];
  return Array.from({ length: roll }, (_, i) => position + i + 1);
}

/** Final square after a roll, ignoring snakes and ladders. Overshooting keeps the player put. */
export function calculateMove(position: number, roll: number): number {
  const path = getMovePath(position, roll);
  return path.length > 0 ? path[path.length - 1] : position;
}

export function isValidRoll(roll: number): boolean {
  return Number.isInteger(roll) && roll >= 1 && roll <= DIE_SIDES;
}

/** Returns the snake/ladder starting at `square`, if any. */
export function findJump(config: BoardConfig, square: number): Jump | null {
  const snake = config.snakes.find((s) => s.head === square);
  if (snake) return { type: 'snake', from: snake.head, to: snake.tail };
  const ladder = config.ladders.find((l) => l.base === square);
  if (ladder) return { type: 'ladder', from: ladder.base, to: ladder.top };
  return null;
}

/** Square the token ends on after applying any snake or ladder. */
export function resolveSquare(config: BoardConfig, square: number): number {
  return findJump(config, square)?.to ?? square;
}

export function isWinningSquare(square: number): boolean {
  return square === BOARD_SIZE;
}

export interface GridCoords {
  /** 0 is the bottom row. */
  row: number;
  /** 0 is the left-most column. */
  col: number;
}

/** Maps a square number (1-100) to its grid position on a boustrophedon board. */
export function squareToCoords(square: number): GridCoords {
  const index = square - 1;
  const row = Math.floor(index / BOARD_COLUMNS);
  const offset = index % BOARD_COLUMNS;
  const col = row % 2 === 0 ? offset : BOARD_COLUMNS - 1 - offset;
  return { row, col };
}

/** Inverse of `squareToCoords`. */
export function coordsToSquare({ row, col }: GridCoords): number {
  const offset = row % 2 === 0 ? col : BOARD_COLUMNS - 1 - col;
  return row * BOARD_COLUMNS + offset + 1;
}

/** Returns a list of problems with a board config; an empty list means it is valid. */
export function validateBoardConfig(config: BoardConfig): string[] {
  const errors: string[] = [];
  const starts = new Map<number, string>();
  const ends: number[] = [];

  const inRange = (n: number) => Number.isInteger(n) && n >= 1 && n <= BOARD_SIZE;

  const register = (kind: string, from: number, to: number, mustGoDown: boolean) => {
    if (!inRange(from) || !inRange(to)) {
      errors.push(`${kind} ${from} → ${to} is outside the board`);
      return;
    }
    if (from === BOARD_SIZE) errors.push(`${kind} cannot start on square ${BOARD_SIZE}`);
    if (mustGoDown ? to >= from : to <= from) {
      errors.push(`${kind} ${from} → ${to} goes the wrong way`);
    }
    if (starts.has(from)) errors.push(`Square ${from} has more than one snake or ladder`);
    starts.set(from, kind);
    ends.push(to);
  };

  config.snakes.forEach((s) => register('Snake', s.head, s.tail, true));
  config.ladders.forEach((l) => register('Ladder', l.base, l.top, false));

  ends.forEach((end) => {
    if (starts.has(end)) errors.push(`Square ${end} chains into another snake or ladder`);
  });

  return errors;
}

/** Fisher-Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Random die value in 1..6. `rng` must return a number in [0, 1). */
export function rollDie(rng: () => number = Math.random): number {
  return Math.floor(rng() * DIE_SIDES) + 1;
}
