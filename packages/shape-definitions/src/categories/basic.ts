import { ShapeCategory } from '../types';

export const basicCategory: ShapeCategory = {
  id: 'basic',
  name: 'Basic',
  description: 'Fundamental shapes for general-purpose diagrams.',
  order: 1,
  shapes: [
    {
      id: 'rectangle',
      name: 'Rectangle',
      tags: ['rect', 'box', 'square'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 20, minHeight: 20 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="0" ry="0" fill="white" stroke="#333" stroke-width="2"/>',
      order: 1,
    },
    {
      id: 'rounded-rectangle',
      name: 'Rounded Rectangle',
      tags: ['rect', 'box', 'rounded'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 20, minHeight: 20 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>',
      order: 2,
    },
    {
      id: 'ellipse',
      name: 'Ellipse',
      tags: ['oval', 'circle'],
      geometry: { defaultWidth: 120, defaultHeight: 80, minWidth: 20, minHeight: 20 },
      template:
        '<ellipse cx="{{cx}}" cy="{{cy}}" rx="{{rx}}" ry="{{ry}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 3,
    },
    {
      id: 'circle',
      name: 'Circle',
      tags: ['round', 'dot'],
      geometry: { defaultWidth: 80, defaultHeight: 80, minWidth: 20, minHeight: 20, lockAspectRatio: true },
      template:
        '<ellipse cx="{{cx}}" cy="{{cy}}" rx="{{rx}}" ry="{{ry}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 4,
    },
    {
      id: 'triangle',
      name: 'Triangle',
      tags: ['arrow', 'delta'],
      geometry: { defaultWidth: 100, defaultHeight: 100, minWidth: 20, minHeight: 20 },
      template:
        '<polygon points="{{cx}},0 {{width}},{{height}} 0,{{height}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 5,
    },
    {
      id: 'diamond',
      name: 'Diamond',
      tags: ['rhombus', 'decision'],
      geometry: { defaultWidth: 100, defaultHeight: 80, minWidth: 20, minHeight: 20 },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 6,
    },
    {
      id: 'line',
      name: 'Line',
      tags: ['connector', 'arrow'],
      geometry: { defaultWidth: 120, defaultHeight: 2, minWidth: 10, minHeight: 2 },
      template:
        '<line x1="0" y1="{{cy}}" x2="{{width}}" y2="{{cy}}" stroke="#333" stroke-width="2"/>',
      order: 7,
    },
    {
      id: 'text',
      name: 'Text',
      tags: ['label', 'note'],
      geometry: { defaultWidth: 120, defaultHeight: 40, minWidth: 20, minHeight: 20 },
      template:
        '<text x="0" y="{{height}}" font-size="14" fill="#333">Text</text>',
      order: 8,
    },
  ],
};
