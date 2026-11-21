import { createContext, useContext } from 'react';
import type { GameState, PlayerSetup } from './types';

export interface GameContextValue {
  state: GameState;
  /** True while the die is tumbling or a token is still moving. */
  isBusy: boolean;
  isRolling: boolean;
  canRoll: boolean;
  rollDice: () => void;
  /** Starts a game; turn order is shuffled. */
  startGame: (players: PlayerSetup[]) => void;
  /** Restarts with the same players and a freshly shuffled turn order. */
  playAgain: () => void;
  /** Returns to the setup screen. */
  newGame: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
