import { BOARD_COLUMNS } from '../../game/constants';
import { squareToCoords } from '../../game/logic';
import type { BoardConfig } from '../../game/types';

const CELL = 100 / BOARD_COLUMNS;

function center(square: number): { x: number; y: number } {
  const { row, col } = squareToCoords(square);
  return { x: col * CELL + CELL / 2, y: (BOARD_COLUMNS - 1 - row) * CELL + CELL / 2 };
}

interface BoardOverlayProps {
  boardConfig: BoardConfig;
  className?: string;
}

/** Draws snakes and ladders over the grid in a 100x100 coordinate space. */
export function BoardOverlay({ boardConfig, className }: BoardOverlayProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {boardConfig.ladders.map((ladder) => (
        <Ladder
          key={`l${ladder.base}`}
          from={center(ladder.base)}
          to={center(ladder.top)}
        />
      ))}
      {boardConfig.snakes.map((snake) => (
        <Snake
          key={`s${snake.head}`}
          head={center(snake.head)}
          tail={center(snake.tail)}
        />
      ))}
    </svg>
  );
}

type Point = { x: number; y: number };

function Ladder({ from, to }: { from: Point; to: Point }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy);
  // Unit vector perpendicular to the ladder, used to offset the two rails.
  const nx = (-dy / length) * 1.1;
  const ny = (dx / length) * 1.1;
  const rungs = Math.max(2, Math.round(length / 4));

  return (
    <g stroke="#1b5e20" strokeLinecap="round" opacity="0.85">
      <line
        x1={from.x + nx}
        y1={from.y + ny}
        x2={to.x + nx}
        y2={to.y + ny}
        strokeWidth="0.7"
      />
      <line
        x1={from.x - nx}
        y1={from.y - ny}
        x2={to.x - nx}
        y2={to.y - ny}
        strokeWidth="0.7"
      />
      {Array.from({ length: rungs }, (_, i) => {
        const t = (i + 0.5) / rungs;
        const cx = from.x + dx * t;
        const cy = from.y + dy * t;
        return (
          <line
            key={i}
            x1={cx + nx}
            y1={cy + ny}
            x2={cx - nx}
            y2={cy - ny}
            strokeWidth="0.5"
          />
        );
      })}
    </g>
  );
}

function Snake({ head, tail }: { head: Point; tail: Point }) {
  const mx = (head.x + tail.x) / 2;
  const my = (head.y + tail.y) / 2;
  const dx = tail.x - head.x;
  const dy = tail.y - head.y;
  const length = Math.hypot(dx, dy) || 1;
  const bend = Math.min(6, length / 4);
  const px = (-dy / length) * bend;
  const py = (dx / length) * bend;
  const path = `M ${head.x} ${head.y} C ${head.x + dx * 0.25 + px} ${head.y + dy * 0.25 + py}, ${
    mx - px
  } ${my - py}, ${mx} ${my} S ${tail.x + px} ${tail.y + py}, ${tail.x} ${tail.y}`;

  return (
    <g opacity="0.85">
      <path
        d={path}
        fill="none"
        stroke="#b71c1c"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx={head.x} cy={head.y} r="1.6" fill="#b71c1c" />
      <circle cx={head.x - 0.5} cy={head.y - 0.5} r="0.3" fill="#fff" />
      <circle cx={head.x + 0.5} cy={head.y - 0.5} r="0.3" fill="#fff" />
    </g>
  );
}
