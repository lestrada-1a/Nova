import { BOARD_COLUMNS } from '../../game/constants';
import { coordsToSquare } from '../../game/logic';
import type { BoardConfig, Player } from '../../game/types';
import { Square } from '../Square/Square';
import { BoardOverlay } from './BoardOverlay';
import styles from './Board.module.css';

interface BoardProps {
  boardConfig: BoardConfig;
  players: Player[];
}

/** Square numbers in render order: top row first, zigzagging like the classic board. */
const SQUARE_ORDER: number[] = Array.from(
  { length: BOARD_COLUMNS * BOARD_COLUMNS },
  (_, i) => {
    const rowFromTop = Math.floor(i / BOARD_COLUMNS);
    return coordsToSquare({
      row: BOARD_COLUMNS - 1 - rowFromTop,
      col: i % BOARD_COLUMNS,
    });
  },
);

export function Board({ boardConfig, players }: BoardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.board} role="list" aria-label="Snakes and Ladders board">
        {SQUARE_ORDER.map((number) => (
          <Square
            key={number}
            number={number}
            boardConfig={boardConfig}
            players={players.filter((p) => p.position === number)}
          />
        ))}
        <BoardOverlay boardConfig={boardConfig} className={styles.overlay} />
      </div>
    </div>
  );
}
