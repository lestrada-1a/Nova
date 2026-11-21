import type { Player } from '../../game/types';
import styles from './Token.module.css';

interface TokenProps {
  player: Player;
  size?: 'sm' | 'md';
}

export function Token({ player, size = 'md' }: TokenProps) {
  return (
    <span
      className={`${styles.token} ${size === 'sm' ? styles.small : ''} ${
        player.isActive ? styles.active : ''
      }`}
      style={{ backgroundColor: player.color.value }}
      role="img"
      aria-label={`${player.name} (${player.color.name}) token`}
    >
      {player.id + 1}
    </span>
  );
}
