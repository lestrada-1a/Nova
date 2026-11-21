import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import type { BoardConfig } from './game/types';

const emptyBoard: BoardConfig = { snakes: [], ladders: [] };

/** rng that returns the given values in turn (shuffle uses them first, then dice). */
function sequence(values: number[]) {
  let i = 0;
  return () => values[Math.min(i++, values.length - 1)];
}

const fast = { rollDelayMs: 0, stepDelayMs: 0 };

describe('setup', () => {
  it('starts a game with the chosen number of players and custom names', async () => {
    const user = userEvent.setup();
    render(<App boardConfig={emptyBoard} {...fast} rng={() => 0.99} />);

    await user.click(screen.getByRole('radio', { name: '3' }));
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    await user.type(screen.getByLabelText(/Player 1 name/), 'Ada');
    await user.click(screen.getByRole('button', { name: 'Start Game' }));

    const panel = screen.getByRole('region', { name: 'Players' });
    expect(within(panel).getAllByRole('listitem')).toHaveLength(3);
    expect(within(panel).getByText('Ada')).toBeInTheDocument();
    expect(within(panel).getByText('Player 2')).toBeInTheDocument();
    expect(within(panel).getAllByText('Off board')).toHaveLength(3);
  });

  it('offers 2 to 4 players', () => {
    render(<App {...fast} />);
    expect(
      screen.getAllByRole('radio').map((r) => (r as HTMLInputElement).value),
    ).toEqual(['2', '3', '4']);
  });
});

describe('playing', () => {
  async function startTwoPlayerGame(rng: () => number, board: BoardConfig = emptyBoard) {
    const user = userEvent.setup();
    render(<App boardConfig={board} {...fast} rng={rng} />);
    await user.click(screen.getByRole('button', { name: 'Start Game' }));
    return user;
  }

  // shuffle with a 2-player list consumes one rng value (0.99 keeps original order).
  it('rolls the die, moves the active token and passes the turn', async () => {
    const user = await startTwoPlayerGame(sequence([0.99, 0.5])); // roll = 4
    expect(screen.getByText("Player 1's turn")).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Roll the die for Player 1/ }));

    await waitFor(() => expect(screen.getByText("Player 2's turn")).toBeInTheDocument());
    expect(screen.getByText('Square 4')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Die shows 4' })).toBeInTheDocument();
    expect(screen.getByRole('log')).toHaveTextContent('Player 1 rolled a 4.');
  });

  it('applies a ladder on landing', async () => {
    const board: BoardConfig = { snakes: [], ladders: [{ base: 4, top: 40 }] };
    const user = await startTwoPlayerGame(sequence([0.99, 0.5]), board);
    await user.click(screen.getByRole('button', { name: /Roll the die/ }));
    await waitFor(() => expect(screen.getByText('Square 40')).toBeInTheDocument());
    expect(screen.getByRole('log')).toHaveTextContent('Ladder! Player 1: 4 → 40');
  });

  it('disables the roll button while a turn is being played', async () => {
    const user = await startTwoPlayerGame(sequence([0.99, 0.99]));
    const button = screen.getByRole('button', { name: /Roll the die/ });
    await user.click(button);
    expect(button).toBeDisabled();
    await waitFor(() => expect(screen.getByText("Player 2's turn")).toBeInTheDocument());
    expect(
      screen.getByRole('button', { name: /Roll the die for Player 2/ }),
    ).toBeEnabled();
  });

  it('can be restarted and returned to setup at any time', async () => {
    const user = await startTwoPlayerGame(sequence([0.99, 0.5, 0.99]));
    await user.click(screen.getByRole('button', { name: /Roll the die/ }));
    await waitFor(() => expect(screen.getByText("Player 2's turn")).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Restart' }));
    expect(screen.getAllByText('Off board')).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'New Game' }));
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
  });
});

describe('game over', () => {
  // Ladder 1 -> 99 puts the winner one square away; a later roll of 1 lands on 100.
  const board: BoardConfig = { snakes: [], ladders: [{ base: 1, top: 99 }] };

  it('announces the winner and offers Play Again / New Game', async () => {
    // shuffle, roll 1 (ladder to 99), P2 roll 6, P1 roll 1 -> 100.
    const rng = sequence([0.99, 0, 0.99, 0]);
    const user = userEvent.setup();
    render(<App boardConfig={board} {...fast} rng={rng} />);
    await user.click(screen.getByRole('button', { name: 'Start Game' }));

    for (let turn = 0; turn < 3; turn++) {
      const roll = await screen.findByRole('button', { name: /Roll the die/ });
      await waitFor(() => expect(roll).toBeEnabled());
      await user.click(roll);
      if (turn < 2)
        await waitFor(() =>
          expect(screen.getByRole('button', { name: /Roll the die/ })).toBeEnabled(),
        );
    }

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByText('Player 1 wins!')).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: 'Play Again' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getAllByText('Off board')).toHaveLength(2);
  });

  it('New Game from the modal goes back to setup', async () => {
    const rng = sequence([0.99, 0, 0.99, 0]);
    const user = userEvent.setup();
    render(<App boardConfig={board} {...fast} rng={rng} />);
    await user.click(screen.getByRole('button', { name: 'Start Game' }));
    for (let turn = 0; turn < 3; turn++) {
      const roll = await screen.findByRole('button', { name: /Roll the die/ });
      await waitFor(() => expect(roll).toBeEnabled());
      await user.click(roll);
      if (turn < 2)
        await waitFor(() =>
          expect(screen.getByRole('button', { name: /Roll the die/ })).toBeEnabled(),
        );
    }
    const dialog = await screen.findByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'New Game' }));
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
  });
});
