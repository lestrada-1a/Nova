# Snakes and Ladders

A browser-based Snakes and Ladders game for 2–4 local players, built with React, TypeScript and Vite. No backend is required.

## Scripts

| Command                | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `npm install`          | Install dependencies                                          |
| `npm run dev`          | Start the dev server                                          |
| `npm run build`        | Type-check and build for production                           |
| `npm test`             | Run unit and component tests (Vitest + React Testing Library) |
| `npm run lint`         | ESLint                                                        |
| `npm run format:check` | Prettier check                                                |

## Rules

- 10×10 board, squares 1–100 numbered in a zigzag pattern.
- Turn order is randomized at game start; each player gets a unique color.
- Roll a single die to move. Landing on a snake head slides you to its tail; landing on a ladder base lifts you to its top.
- You must land **exactly** on 100 to win. Rolls that overshoot are forfeited.

## Layout

- `src/data/board.json` – snake and ladder positions (edit this to change the board; it is validated on load).
- `src/game/logic.ts` – pure game functions (move calculation, snake/ladder resolution, win detection, board layout).
- `src/game/reducer.ts` – deterministic reducer. Randomness (die, shuffle) is supplied from outside, so a game is fully determined by its sequence of rolls.
- `src/game/GameProvider.tsx` – React Context + `useReducer`; drives roll/step timers for animations.
- `src/components/*` – `GameSetup`, `Board`, `Square`, `Dice`, `PlayerPanel`, `GameOverModal`, `MessageLog`, `Token`, `GameScreen`.
