import { ShapeCategory } from '../types';

export const advancedCategory: ShapeCategory = {
  id: 'advanced',
  name: 'Advanced',
  description: 'Advanced shapes for specialised technical and architectural diagrams.',
  order: 3,
  shapes: [
    {
      id: 'actor',
      name: 'Actor',
      description: 'A person or external system that interacts with the system.',
      tags: ['user', 'person', 'stick-figure'],
      geometry: { defaultWidth: 50, defaultHeight: 90, minWidth: 30, minHeight: 50 },
      template:
        '<circle cx="{{cx}}" cy="12" r="12" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx}}" y1="24" x2="{{cx}}" y2="64" stroke="#333" stroke-width="2"/>' +
        '<line x1="0" y1="40" x2="{{width}}" y2="40" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx}}" y1="64" x2="0" y2="{{height}}" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx}}" y1="64" x2="{{width}}" y2="{{height}}" stroke="#333" stroke-width="2"/>',
      order: 1,
    },
    {
      id: 'cloud',
      name: 'Cloud',
      description: 'Cloud or network resource.',
      tags: ['network', 'internet', 'saas'],
      geometry: { defaultWidth: 160, defaultHeight: 100, minWidth: 60, minHeight: 40 },
      template:
        '<path d="M30,70 Q10,70 10,55 Q10,40 25,40 Q25,20 45,20 Q55,10 70,15 Q80,5 95,10 Q115,5 120,25 Q140,25 140,45 Q150,45 150,60 Q150,75 130,75 Z" fill="white" stroke="#333" stroke-width="2"/>',
      order: 2,
    },
    {
      id: 'server',
      name: 'Server',
      description: 'A server or computing resource.',
      tags: ['computer', 'host', 'machine'],
      geometry: { defaultWidth: 80, defaultHeight: 120, minWidth: 40, minHeight: 60 },
      template:
        '<rect x="5" y="0" width="{{w10}}" height="{{height}}" rx="4" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="5" y1="30" x2="{{w5}}" y2="30" stroke="#333" stroke-width="1"/>' +
        '<line x1="5" y1="60" x2="{{w5}}" y2="60" stroke="#333" stroke-width="1"/>',
      order: 3,
    },
    {
      id: 'database',
      name: 'Database',
      description: 'A database or persistent data store.',
      tags: ['storage', 'data', 'cylinder', 'sql'],
      geometry: { defaultWidth: 100, defaultHeight: 80, minWidth: 40, minHeight: 40 },
      template:
        '<ellipse cx="{{cx}}" cy="12" rx="{{rx}}" ry="12" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="12" width="{{width}}" height="{{h24}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<ellipse cx="{{cx}}" cy="{{h12}}" rx="{{rx}}" ry="12" fill="white" stroke="#333" stroke-width="2"/>',
      order: 4,
    },
    {
      id: 'note',
      name: 'Note',
      description: 'An annotation or comment.',
      tags: ['annotation', 'comment', 'sticky'],
      geometry: { defaultWidth: 120, defaultHeight: 80, minWidth: 40, minHeight: 30 },
      template:
        '<path d="M0,0 H{{w20}} L{{width}},20 V{{height}} H0 Z" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M{{w20}},0 L{{w20}},20 H{{width}}" fill="none" stroke="#333" stroke-width="2"/>',
      order: 5,
    },
    {
      id: 'swimlane',
      name: 'Swimlane',
      description: 'A horizontal or vertical lane separating responsibilities.',
      tags: ['lane', 'pool', 'partition'],
      geometry: { defaultWidth: 400, defaultHeight: 200, minWidth: 100, minHeight: 60 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="0" width="40" height="{{height}}" fill="#f0f0f0" stroke="#333" stroke-width="2"/>',
      order: 6,
    },
    {
      id: 'hexagon',
      name: 'Hexagon',
      description: 'A regular hexagon.',
      tags: ['hex', 'polygon'],
      geometry: { defaultWidth: 100, defaultHeight: 90, minWidth: 30, minHeight: 26 },
      template:
        '<polygon points="{{cx}},0 {{width}},{{qh}} {{width}},{{tqh}} {{cx}},{{height}} 0,{{tqh}} 0,{{qh}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 7,
    },
    {
      id: 'cross',
      name: 'Cross',
      description: 'A plus / cross shape.',
      tags: ['plus', 'add'],
      geometry: { defaultWidth: 80, defaultHeight: 80, minWidth: 30, minHeight: 30, lockAspectRatio: true },
      template:
        '<polygon points="{{t1}},0 {{t2}},0 {{t2}},{{t1}} {{width}},{{t1}} {{width}},{{t2}} {{t2}},{{t2}} {{t2}},{{height}} {{t1}},{{height}} {{t1}},{{t2}} 0,{{t2}} 0,{{t1}} {{t1}},{{t1}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 8,
    },
  ],
};
