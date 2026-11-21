import data from '../data/board.json';
import { validateBoardConfig } from './logic';
import type { BoardConfig } from './types';

export const defaultBoardConfig: BoardConfig = data;

const errors = validateBoardConfig(defaultBoardConfig);
if (errors.length > 0) {
  throw new Error(`Invalid board configuration:\n${errors.join('\n')}`);
}
