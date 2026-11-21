import { useState } from 'react';
import type { FormEvent } from 'react';
import { MAX_PLAYERS, MIN_PLAYERS, PLAYER_COLORS } from '../../game/constants';
import type { PlayerSetup } from '../../game/types';
import styles from './GameSetup.module.css';

interface GameSetupProps {
  onStart: (players: PlayerSetup[]) => void;
}

const COUNTS = Array.from(
  { length: MAX_PLAYERS - MIN_PLAYERS + 1 },
  (_, i) => MIN_PLAYERS + i,
);

export function GameSetup({ onStart }: GameSetupProps) {
  const [count, setCount] = useState(MIN_PLAYERS);
  const [names, setNames] = useState<string[]>(() => Array(MAX_PLAYERS).fill(''));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onStart(
      Array.from({ length: count }, (_, i) => ({
        name: names[i].trim() || `Player ${i + 1}`,
        color: PLAYER_COLORS[i],
      })),
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Snakes and Ladders</h1>

      <fieldset className={styles.fieldset}>
        <legend>Number of players</legend>
        <div className={styles.counts}>
          {COUNTS.map((n) => (
            <label key={n} className={styles.count}>
              <input
                type="radio"
                name="player-count"
                value={n}
                checked={count === n}
                onChange={() => setCount(n)}
              />
              {n}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Player names (optional)</legend>
        {Array.from({ length: count }, (_, i) => (
          <label key={i} className={styles.name}>
            <span
              className={styles.swatch}
              style={{ backgroundColor: PLAYER_COLORS[i].value }}
              aria-hidden="true"
            />
            <span className={styles.nameLabel}>
              Player {i + 1} name ({PLAYER_COLORS[i].name})
            </span>
            <input
              type="text"
              value={names[i]}
              maxLength={16}
              placeholder={`Player ${i + 1}`}
              onChange={(e) =>
                setNames(names.map((n, j) => (j === i ? e.target.value : n)))
              }
            />
          </label>
        ))}
      </fieldset>

      <button type="submit" className={styles.start}>
        Start Game
      </button>
    </form>
  );
}
