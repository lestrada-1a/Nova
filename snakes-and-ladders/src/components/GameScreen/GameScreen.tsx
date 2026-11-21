import { useGame } from '../../game/GameContext';
import { Board } from '../Board/Board';
import { Dice } from '../Dice/Dice';
import { GameOverModal } from '../GameOverModal/GameOverModal';
import { MessageLog } from '../MessageLog/MessageLog';
import { PlayerPanel } from '../PlayerPanel/PlayerPanel';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { state, isRolling, canRoll, rollDice, playAgain, newGame } = useGame();
  const { players, currentPlayerIndex, lastRoll, boardConfig, gamePhase, winnerId } =
    state;
  const current = players[currentPlayerIndex];
  const winner = players.find((p) => p.id === winnerId);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h1 className={styles.title}>Snakes and Ladders</h1>
        <div className={styles.actions}>
          <button type="button" onClick={playAgain}>
            Restart
          </button>
          <button type="button" onClick={newGame}>
            New Game
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Board boardConfig={boardConfig} players={players} />
        <aside className={styles.sidebar}>
          <p className={styles.turn} aria-live="polite">
            {gamePhase === 'finished' ? 'Game over' : `${current.name}'s turn`}
          </p>
          <Dice
            value={lastRoll}
            isRolling={isRolling}
            disabled={!canRoll}
            playerName={current.name}
            onRoll={rollDice}
          />
          <PlayerPanel players={players} />
          <MessageLog messages={state.messages} />
        </aside>
      </main>

      {gamePhase === 'finished' && winner && (
        <GameOverModal winner={winner} onPlayAgain={playAgain} onNewGame={newGame} />
      )}
    </div>
  );
}
