import { defaultBoardConfig } from './boardConfig';
import {
  calculateMove,
  coordsToSquare,
  findJump,
  getMovePath,
  isValidRoll,
  isWinningSquare,
  resolveSquare,
  rollDie,
  shuffle,
  squareToCoords,
  validateBoardConfig,
} from './logic';
import type { BoardConfig } from './types';

const config: BoardConfig = {
  snakes: [{ head: 17, tail: 7 }],
  ladders: [{ base: 3, top: 22 }],
};

describe('calculateMove / getMovePath', () => {
  it('moves forward by the roll', () => {
    expect(calculateMove(0, 4)).toBe(4);
    expect(calculateMove(10, 6)).toBe(16);
  });

  it('lists every square walked', () => {
    expect(getMovePath(5, 3)).toEqual([6, 7, 8]);
  });

  it('allows landing exactly on 100', () => {
    expect(calculateMove(97, 3)).toBe(100);
    expect(getMovePath(94, 6)).toEqual([95, 96, 97, 98, 99, 100]);
  });

  it('forfeits rolls that overshoot 100', () => {
    expect(calculateMove(98, 3)).toBe(98);
    expect(getMovePath(99, 2)).toEqual([]);
    expect(calculateMove(100, 1)).toBe(100);
  });

  it('ignores invalid rolls', () => {
    expect(calculateMove(10, 0)).toBe(10);
    expect(calculateMove(10, 7)).toBe(10);
    expect(isValidRoll(2.5)).toBe(false);
  });
});

describe('snake and ladder resolution', () => {
  it('moves down a snake from head to tail', () => {
    expect(findJump(config, 17)).toEqual({ type: 'snake', from: 17, to: 7 });
    expect(resolveSquare(config, 17)).toBe(7);
  });

  it('moves up a ladder from base to top', () => {
    expect(findJump(config, 3)).toEqual({ type: 'ladder', from: 3, to: 22 });
    expect(resolveSquare(config, 3)).toBe(22);
  });

  it('leaves other squares alone', () => {
    expect(findJump(config, 5)).toBeNull();
    expect(resolveSquare(config, 5)).toBe(5);
    // Landing on a snake tail or ladder top does nothing.
    expect(resolveSquare(config, 7)).toBe(7);
    expect(resolveSquare(config, 22)).toBe(22);
  });
});

describe('win detection', () => {
  it('only wins on exactly 100', () => {
    expect(isWinningSquare(100)).toBe(true);
    expect(isWinningSquare(99)).toBe(false);
    expect(isWinningSquare(0)).toBe(false);
  });
});

describe('board layout', () => {
  it('numbers squares in a boustrophedon pattern', () => {
    expect(squareToCoords(1)).toEqual({ row: 0, col: 0 });
    expect(squareToCoords(10)).toEqual({ row: 0, col: 9 });
    expect(squareToCoords(11)).toEqual({ row: 1, col: 9 });
    expect(squareToCoords(20)).toEqual({ row: 1, col: 0 });
    expect(squareToCoords(21)).toEqual({ row: 2, col: 0 });
    expect(squareToCoords(100)).toEqual({ row: 9, col: 0 });
  });

  it('round-trips every square', () => {
    for (let n = 1; n <= 100; n++) {
      expect(coordsToSquare(squareToCoords(n))).toBe(n);
    }
  });
});

describe('validateBoardConfig', () => {
  it('accepts the default board', () => {
    expect(validateBoardConfig(defaultBoardConfig)).toEqual([]);
  });

  it('rejects snakes that go up and ladders that go down', () => {
    expect(
      validateBoardConfig({ snakes: [{ head: 5, tail: 9 }], ladders: [] }),
    ).toHaveLength(1);
    expect(
      validateBoardConfig({ snakes: [], ladders: [{ base: 9, top: 5 }] }),
    ).toHaveLength(1);
  });

  it('rejects out-of-range, duplicate and chained entries', () => {
    expect(
      validateBoardConfig({ snakes: [{ head: 101, tail: 5 }], ladders: [] }),
    ).not.toEqual([]);
    expect(
      validateBoardConfig({
        snakes: [{ head: 50, tail: 5 }],
        ladders: [{ base: 50, top: 60 }],
      }),
    ).not.toEqual([]);
    expect(
      validateBoardConfig({
        snakes: [{ head: 50, tail: 20 }],
        ladders: [{ base: 10, top: 50 }],
      }),
    ).not.toEqual([]);
  });
});

describe('rollDie', () => {
  it('maps the random source onto 1..6', () => {
    expect(rollDie(() => 0)).toBe(1);
    expect(rollDie(() => 0.5)).toBe(4);
    expect(rollDie(() => 0.999999)).toBe(6);
  });

  it('only produces values from 1 to 6', () => {
    for (let i = 0; i < 500; i++) {
      const v = rollDie();
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(6);
    }
  });
});

describe('shuffle', () => {
  it('returns a permutation without mutating the input', () => {
    const input = [1, 2, 3, 4];
    const result = shuffle(input, () => 0.3);
    expect([...result].sort()).toEqual([1, 2, 3, 4]);
    expect(input).toEqual([1, 2, 3, 4]);
  });
});
