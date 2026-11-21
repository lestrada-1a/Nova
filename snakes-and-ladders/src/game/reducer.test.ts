import { defaultBoardConfig } from './boardConfig';
import { PLAYER_COLORS } from './constants';
import { createInitialState, gameReducer } from './reducer';
import type { GameAction } from './reducer';
import type { BoardConfig, GameState } from './types';

const emptyBoard: BoardConfig = { snakes: [], ladders: [] };

function start(config: BoardConfig = emptyBoard, count = 2): GameState {
  return gameReducer(createInitialState(config), {
    type: 'START_GAME',
    players: Array.from({ length: count }, (_, i) => ({
      name: `P${i + 1}`,
      color: PLAYER_COLORS[i],
    })),
  });
}

function run(state: GameState, ...actions: GameAction[]): GameState {
  return actions.reduce(gameReducer, state);
}

/** Rolls and plays the whole move out, like the timer-driven provider does. */
function playTurn(state: GameState, value: number): GameState {
  let next = gameReducer(state, { type: 'ROLL', value });
  while (next.pendingMove) next = gameReducer(next, { type: 'STEP' });
  return next;
}

function withPositions(state: GameState, positions: number[]): GameState {
  return {
    ...state,
    players: state.players.map((p, i) => ({ ...p, position: positions[i] })),
  };
}

describe('START_GAME', () => {
  it('puts every token off-board and makes the first player active', () => {
    const state = start(defaultBoardConfig, 3);
    expect(state.gamePhase).toBe('playing');
    expect(state.players.map((p) => p.position)).toEqual([0, 0, 0]);
    expect(state.players.map((p) => p.isActive)).toEqual([true, false, false]);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.lastRoll).toBeNull();
    expect(state.winnerId).toBeNull();
  });

  it('gives every player a unique color', () => {
    const colors = start(emptyBoard, 4).players.map((p) => p.color.value);
    expect(new Set(colors).size).toBe(4);
  });
});

describe('ROLL / STEP', () => {
  it('walks the token square by square and then passes the turn', () => {
    let state = gameReducer(start(), { type: 'ROLL', value: 3 });
    expect(state.lastRoll).toBe(3);
    expect(state.pendingMove?.path).toEqual([1, 2, 3]);

    state = gameReducer(state, { type: 'STEP' });
    expect(state.players[0].position).toBe(1);
    state = run(state, { type: 'STEP' }, { type: 'STEP' });
    expect(state.players[0].position).toBe(3);
    expect(state.currentPlayerIndex).toBe(0); // still settling

    state = gameReducer(state, { type: 'STEP' });
    expect(state.pendingMove).toBeNull();
    expect(state.currentPlayerIndex).toBe(1);
    expect(state.players.map((p) => p.isActive)).toEqual([false, true]);
  });

  it('wraps the turn order back to the first player', () => {
    const state = playTurn(playTurn(start(), 2), 4);
    expect(state.currentPlayerIndex).toBe(0);
    expect(state.players.map((p) => p.position)).toEqual([2, 4]);
  });

  it('ignores rolls while a move is in progress or with invalid values', () => {
    const rolling = gameReducer(start(), { type: 'ROLL', value: 2 });
    expect(gameReducer(rolling, { type: 'ROLL', value: 5 })).toBe(rolling);
    const fresh = start();
    expect(gameReducer(fresh, { type: 'ROLL', value: 7 })).toBe(fresh);
    expect(gameReducer(fresh, { type: 'ROLL', value: 0 })).toBe(fresh);
  });

  it('is deterministic for the same sequence of rolls', () => {
    const rolls = [3, 6, 1, 4, 5, 2, 6, 6];
    const play = () => rolls.reduce(playTurn, start(defaultBoardConfig, 3));
    expect(play()).toEqual(play());
  });
});

describe('snakes and ladders', () => {
  const config: BoardConfig = {
    snakes: [{ head: 5, tail: 2 }],
    ladders: [{ base: 3, top: 20 }],
  };

  it('moves up a ladder after landing on its base', () => {
    const state = playTurn(start(config), 3);
    expect(state.players[0].position).toBe(20);
    expect(state.messages.some((m) => m.text.includes('Ladder! P1: 3 → 20'))).toBe(true);
  });

  it('moves down a snake after landing on its head', () => {
    const state = playTurn(start(config), 5);
    expect(state.players[0].position).toBe(2);
    expect(state.messages.some((m) => m.text.includes('Snake! P1: 5 → 2'))).toBe(true);
  });

  it('shows the token on the snake head before sliding down', () => {
    let state = gameReducer(start(config), { type: 'ROLL', value: 5 });
    state = run(state, ...Array<GameAction>(5).fill({ type: 'STEP' }));
    expect(state.players[0].position).toBe(5);
    state = gameReducer(state, { type: 'STEP' });
    expect(state.players[0].position).toBe(2);
  });

  it('does nothing when passing over a snake head or ladder base', () => {
    const state = playTurn(start(config), 6);
    expect(state.players[0].position).toBe(6);
  });
});

describe('winning', () => {
  it('declares the first player to land exactly on 100 the winner', () => {
    const state = playTurn(withPositions(start(), [96, 50]), 4);
    expect(state.gamePhase).toBe('finished');
    expect(state.winnerId).toBe(0);
    expect(state.players[0].position).toBe(100);
    expect(state.currentPlayerIndex).toBe(0);
  });

  it('forfeits a roll that overshoots 100', () => {
    const before = withPositions(start(), [98, 50]);
    const state = playTurn(before, 5);
    expect(state.players[0].position).toBe(98);
    expect(state.gamePhase).toBe('playing');
    expect(state.currentPlayerIndex).toBe(1);
    expect(state.lastRoll).toBe(5);
    expect(state.pendingMove).toBeNull();
  });

  it('stops accepting rolls once finished', () => {
    const finished = playTurn(withPositions(start(), [99, 50]), 1);
    expect(gameReducer(finished, { type: 'ROLL', value: 3 })).toBe(finished);
  });

  it('wins via a ladder that ends on 100', () => {
    const config: BoardConfig = { snakes: [], ladders: [{ base: 95, top: 100 }] };
    const state = playTurn(withPositions(start(config), [92, 0]), 3);
    expect(state.winnerId).toBe(0);
  });
});

describe('restarting', () => {
  it('START_GAME resets positions from any state, even mid-move', () => {
    const midMove = gameReducer(withPositions(start(), [10, 20]), {
      type: 'ROLL',
      value: 3,
    });
    const restarted = gameReducer(midMove, {
      type: 'START_GAME',
      players: midMove.players.map(({ name, color }) => ({ name, color })),
    });
    expect(restarted.pendingMove).toBeNull();
    expect(restarted.players.map((p) => p.position)).toEqual([0, 0]);
    expect(restarted.messages).toHaveLength(1);
  });

  it('RESET returns to setup', () => {
    const state = gameReducer(playTurn(start(), 4), { type: 'RESET' });
    expect(state.gamePhase).toBe('setup');
    expect(state.players).toEqual([]);
  });
});
