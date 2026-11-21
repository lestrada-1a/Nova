import type { Player } from '../../game/types';
import { Token } from '../Token/Token';
import styles from './PlayerPanel.module.css';

interface PlayerPanelProps {
  players: Player[];
}

export function PlayerPanel({ players }: PlayerPanelProps) {
  return (
    <section aria-label="Players">
      <ul className={styles.list}>
        {players.map((player) => (
          <li
            key={player.id}
            className={`${styles.player} ${player.isActive ? styles.active : ''}`}
            aria-current={player.isActive ? 'true' : undefined}
          >
            <Token player={player} />
            <span className={styles.name}>{player.name}</span>
            <span className={styles.position}>
              {player.position === 0 ? 'Off board' : `Square ${player.position}`}
            </span>
            {player.isActive && <span className={styles.turn}>Turn</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
