import { useEffect, useRef } from 'react';
import type { Player } from '../../game/types';
import { Token } from '../Token/Token';
import styles from './GameOverModal.module.css';

interface GameOverModalProps {
  winner: Player;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export function GameOverModal({ winner, onPlayAgain, onNewGame }: GameOverModalProps) {
  const playAgainRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    playAgainRef.current?.focus();
  }, []);

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
      >
        <Token player={winner} />
        <h2 id="game-over-title" className={styles.title}>
          {winner.name} wins!
        </h2>
        <p>First to land exactly on square 100.</p>
        <div className={styles.actions}>
          <button
            ref={playAgainRef}
            type="button"
            className={styles.primary}
            onClick={onPlayAgain}
          >
            Play Again
          </button>
          <button type="button" className={styles.secondary} onClick={onNewGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}
