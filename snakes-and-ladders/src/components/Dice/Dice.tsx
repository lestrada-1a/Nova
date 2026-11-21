import styles from './Dice.module.css';

const FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

interface DiceProps {
  value: number | null;
  isRolling: boolean;
  disabled: boolean;
  playerName: string;
  onRoll: () => void;
}

export function Dice({ value, isRolling, disabled, playerName, onRoll }: DiceProps) {
  return (
    <div className={styles.dice}>
      <div
        className={`${styles.face} ${isRolling ? styles.rolling : ''}`}
        role="img"
        aria-label={value ? `Die shows ${value}` : 'Die has not been rolled yet'}
      >
        {value ? FACES[value - 1] : '?'}
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={onRoll}
        disabled={disabled}
        aria-label={`Roll the die for ${playerName}`}
      >
        {isRolling ? 'Rolling…' : 'Roll'}
      </button>
      <span className={styles.status} role="status">
        {value ? `Last roll: ${value}` : ''}
      </span>
    </div>
  );
}
