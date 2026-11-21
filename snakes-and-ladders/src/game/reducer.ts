import { BOARD_SIZE } from './constants';
import { findJump, getMovePath, isValidRoll, isWinningSquare } from './logic';
import type { BoardConfig, GameState, LogMessage, Player, PlayerSetup } from './types';

export type GameAction =
  /** Starts (or restarts) a game. `players` must already be in turn order. */
  | { type: 'START_GAME'; players: PlayerSetup[] }
  /** Applies a die result to the active player. */
  | { type: 'ROLL'; value: number }
  /** Advances the pending move by one square, or settles it once the walk is over. */
  | { type: 'STEP' }
  /** Returns to the setup screen. */
  | { type: 'RESET' };

export function createInitialState(boardConfig: BoardConfig): GameState {
  return {
    players: [],
    currentPlayerIndex: 0,
    lastRoll: null,
    gamePhase: 'setup',
    boardConfig,
    pendingMove: null,
    winnerId: null,
    messages: [],
  };
}

function log(messages: LogMessage[], text: string): LogMessage[] {
  return [...messages, { id: messages.length, text }];
}

function withActivePlayer(players: Player[], activeIndex: number | null): Player[] {
  return players.map((p, i) => ({ ...p, isActive: i === activeIndex }));
}

function setPosition(players: Player[], index: number, position: number): Player[] {
  return players.map((p, i) => (i === index ? { ...p, position } : p));
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const players: Player[] = action.players.map((setup, id) => ({
        id,
        name: setup.name,
        color: setup.color,
        position: 0,
        isActive: id === 0,
      }));
      return {
        ...createInitialState(state.boardConfig),
        players,
        gamePhase: 'playing',
        messages: log([], `${players[0].name} goes first.`),
      };
    }

    case 'RESET':
      return createInitialState(state.boardConfig);

    case 'ROLL': {
      if (state.gamePhase !== 'playing' || state.pendingMove) return state;
      if (!isValidRoll(action.value)) return state;

      const player = state.players[state.currentPlayerIndex];
      const path = getMovePath(player.position, action.value);
      let messages = log(state.messages, `${player.name} rolled a ${action.value}.`);

      if (path.length === 0) {
        const needed = BOARD_SIZE - player.position;
        messages = log(
          messages,
          `${player.name} needs exactly ${needed} to win and stays put.`,
        );
        return {
          ...advanceTurn(state),
          lastRoll: action.value,
          messages,
        };
      }

      return {
        ...state,
        lastRoll: action.value,
        pendingMove: { playerIndex: state.currentPlayerIndex, path },
        messages,
      };
    }

    case 'STEP': {
      const move = state.pendingMove;
      if (state.gamePhase !== 'playing' || !move) return state;

      if (move.path.length > 0) {
        const [next, ...rest] = move.path;
        return {
          ...state,
          players: setPosition(state.players, move.playerIndex, next),
          pendingMove: { ...move, path: rest },
        };
      }
      return settleMove(state);
    }

    default:
      return state;
  }
}

function advanceTurn(state: GameState): GameState {
  const next = (state.currentPlayerIndex + 1) % state.players.length;
  return {
    ...state,
    currentPlayerIndex: next,
    players: withActivePlayer(state.players, next),
    pendingMove: null,
  };
}

/** Applies snake/ladder, checks for a win, then passes the turn on. */
function settleMove(state: GameState): GameState {
  const index = state.currentPlayerIndex;
  const player = state.players[index];
  let messages = state.messages;
  let players = state.players;

  const jump = findJump(state.boardConfig, player.position);
  if (jump) {
    const label = jump.type === 'snake' ? 'Snake!' : 'Ladder!';
    messages = log(messages, `${label} ${player.name}: ${jump.from} → ${jump.to}`);
    players = setPosition(players, index, jump.to);
  }

  const finalPosition = players[index].position;
  if (isWinningSquare(finalPosition)) {
    return {
      ...state,
      players: withActivePlayer(players, index),
      pendingMove: null,
      gamePhase: 'finished',
      winnerId: player.id,
      messages: log(messages, `${player.name} reaches ${BOARD_SIZE} and wins!`),
    };
  }

  if (!jump) {
    messages = log(messages, `${player.name} moves to ${finalPosition}.`);
  }
  return advanceTurn({ ...state, players, messages });
}
