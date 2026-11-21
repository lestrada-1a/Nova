export type GamePhase = 'setup' | 'playing' | 'finished';

export interface Snake {
  head: number;
  tail: number;
}

export interface Ladder {
  base: number;
  top: number;
}

export interface BoardConfig {
  snakes: Snake[];
  ladders: Ladder[];
}

export interface PlayerSetup {
  name: string;
  color: PlayerColor;
}

export interface PlayerColor {
  name: string;
  value: string;
}

export interface Player {
  id: number;
  name: string;
  color: PlayerColor;
  /** 0 means the token has not entered the board yet. */
  position: number;
  isActive: boolean;
}

export interface PendingMove {
  playerIndex: number;
  /** Squares the token still has to walk through, in order. */
  path: number[];
}

export interface LogMessage {
  id: number;
  text: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  lastRoll: number | null;
  gamePhase: GamePhase;
  boardConfig: BoardConfig;
  pendingMove: PendingMove | null;
  winnerId: number | null;
  messages: LogMessage[];
}

export type JumpType = 'snake' | 'ladder';

export interface Jump {
  type: JumpType;
  from: number;
  to: number;
}
