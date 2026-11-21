import { GameScreen } from './components/GameScreen/GameScreen';
import { GameSetup } from './components/GameSetup/GameSetup';
import { useGame } from './game/GameContext';
import { GameProvider } from './game/GameProvider';
import type { GameProviderProps } from './game/GameProvider';

function Screens() {
  const { state, startGame } = useGame();
  return state.gamePhase === 'setup' ? <GameSetup onStart={startGame} /> : <GameScreen />;
}

export function App(props: Omit<GameProviderProps, 'children'>) {
  return (
    <GameProvider {...props}>
      <Screens />
    </GameProvider>
  );
}
