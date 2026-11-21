import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultBoardConfig } from './boardConfig';
import { DEFAULT_ROLL_DELAY_MS, DEFAULT_STEP_DELAY_MS } from './constants';
import { GameContext } from './GameContext';
import type { GameContextValue } from './GameContext';
import { rollDie, shuffle } from './logic';
import { createInitialState, gameReducer } from './reducer';
import type { BoardConfig, PlayerSetup } from './types';

export interface GameProviderProps {
  children: ReactNode;
  boardConfig?: BoardConfig;
  /** Random source in [0, 1); injectable so games can be replayed in tests. */
  rng?: () => number;
  rollDelayMs?: number;
  stepDelayMs?: number;
}

export function GameProvider({
  children,
  boardConfig = defaultBoardConfig,
  rng = Math.random,
  rollDelayMs = DEFAULT_ROLL_DELAY_MS,
  stepDelayMs = DEFAULT_STEP_DELAY_MS,
}: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, boardConfig, createInitialState);
  const [isRolling, setIsRolling] = useState(false);
  const rollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelRoll = useCallback(() => {
    if (rollTimer.current) clearTimeout(rollTimer.current);
    rollTimer.current = null;
    setIsRolling(false);
  }, []);

  useEffect(() => cancelRoll, [cancelRoll]);

  // Walk the token one square at a time (and settle snakes/ladders) on a timer.
  const hasPendingMove = state.pendingMove !== null;
  const remainingSteps = state.pendingMove?.path.length;
  useEffect(() => {
    if (!hasPendingMove) return;
    const id = setTimeout(() => dispatch({ type: 'STEP' }), stepDelayMs);
    return () => clearTimeout(id);
  }, [hasPendingMove, remainingSteps, stepDelayMs]);

  const isPlaying = state.gamePhase === 'playing';
  const isBusy = isRolling || hasPendingMove;
  const canRoll = isPlaying && !isBusy;

  const rollDice = useCallback(() => {
    if (!canRoll) return;
    setIsRolling(true);
    rollTimer.current = setTimeout(() => {
      rollTimer.current = null;
      setIsRolling(false);
      dispatch({ type: 'ROLL', value: rollDie(rng) });
    }, rollDelayMs);
  }, [canRoll, rng, rollDelayMs]);

  const startGame = useCallback(
    (players: PlayerSetup[]) => {
      cancelRoll();
      dispatch({ type: 'START_GAME', players: shuffle(players, rng) });
    },
    [cancelRoll, rng],
  );

  const playAgain = useCallback(() => {
    startGame(state.players.map(({ name, color }) => ({ name, color })));
  }, [startGame, state.players]);

  const newGame = useCallback(() => {
    cancelRoll();
    dispatch({ type: 'RESET' });
  }, [cancelRoll]);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      isBusy,
      isRolling,
      canRoll,
      rollDice,
      startGame,
      playAgain,
      newGame,
    }),
    [state, isBusy, isRolling, canRoll, rollDice, startGame, playAgain, newGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
