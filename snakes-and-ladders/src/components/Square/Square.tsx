import { findJump } from '../../game/logic';
import type { BoardConfig, Player } from '../../game/types';
import { Token } from '../Token/Token';
import styles from './Square.module.css';

interface SquareProps {
  number: number;
  boardConfig: BoardConfig;
  players: Player[];
}

export function Square({ number, boardConfig, players }: SquareProps) {
  const jump = findJump(boardConfig, number);
  const isDark = isDarkSquare(number);

  const description = [
    `Square ${number}`,
    jump
      ? `${jump.type} ${jump.type === 'snake' ? 'head' : 'base'}, goes to ${jump.to}`
      : null,
    players.length > 0 ? `tokens: ${players.map((p) => p.name).join(', ')}` : null,
  ]
    .filter(Boolean)
    .join(', ');

  const classNames = [
    styles.square,
    isDark ? styles.dark : styles.light,
    jump?.type === 'snake' ? styles.snake : '',
    jump?.type === 'ladder' ? styles.ladder : '',
    players.length > 0 ? styles.occupied : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      role="listitem"
      aria-label={description}
      data-square={number}
    >
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      {jump && (
        <span className={styles.jump} aria-hidden="true">
          {jump.type === 'snake' ? '▼' : '▲'}
          {jump.to}
        </span>
      )}
      {players.length > 0 && (
        <div className={styles.tokens}>
          {players.map((p) => (
            <Token key={p.id} player={p} size={players.length > 1 ? 'sm' : 'md'} />
          ))}
        </div>
      )}
    </div>
  );
}

function isDarkSquare(number: number): boolean {
  return number % 2 === 0;
}
