import { ShapeCategory } from '../types';

export const flowchartCategory: ShapeCategory = {
  id: 'flowchart',
  name: 'Flowchart',
  description: 'Standard flowchart symbols for process and workflow diagrams.',
  order: 2,
  shapes: [
    {
      id: 'process',
      name: 'Process',
      description: 'A processing step or action.',
      tags: ['step', 'action', 'task'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 40, minHeight: 30 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 1,
    },
    {
      id: 'decision',
      name: 'Decision',
      description: 'A branching decision point.',
      tags: ['branch', 'condition', 'if'],
      geometry: { defaultWidth: 100, defaultHeight: 80, minWidth: 40, minHeight: 40 },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 2,
    },
    {
      id: 'terminator',
      name: 'Terminator',
      description: 'Start or end of a process.',
      tags: ['start', 'end', 'terminal', 'oval'],
      geometry: { defaultWidth: 120, defaultHeight: 50, minWidth: 40, minHeight: 30 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="{{ry}}" ry="{{ry}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 3,
    },
    {
      id: 'document',
      name: 'Document',
      description: 'A document or report.',
      tags: ['page', 'report', 'file'],
      geometry: { defaultWidth: 120, defaultHeight: 70, minWidth: 40, minHeight: 30 },
      template:
        '<path d="M0,0 H{{width}} V{{height80}} Q{{cx}},{{height120}} 0,{{height80}} Z" fill="white" stroke="#333" stroke-width="2"/>',
      order: 4,
    },
    {
      id: 'data',
      name: 'Data',
      description: 'Input or output data.',
      tags: ['io', 'input', 'output', 'parallelogram'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 40, minHeight: 30 },
      template:
        '<polygon points="20,0 {{width}},0 {{w20}},{{height}} 0,{{height}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 5,
    },
    {
      id: 'stored-data',
      name: 'Stored Data',
      description: 'Data that is stored (database or file).',
      tags: ['database', 'storage', 'cylinder'],
      geometry: { defaultWidth: 100, defaultHeight: 80, minWidth: 40, minHeight: 40 },
      template:
        '<ellipse cx="{{cx}}" cy="12" rx="{{rx}}" ry="12" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="12" width="{{width}}" height="{{h24}}" fill="white" stroke="#333" stroke-width="2" stroke-top="none"/>' +
        '<ellipse cx="{{cx}}" cy="{{h12}}" rx="{{rx}}" ry="12" fill="white" stroke="#333" stroke-width="2"/>',
      order: 6,
    },
    {
      id: 'predefined-process',
      name: 'Predefined Process',
      description: 'A named sub-process defined elsewhere.',
      tags: ['sub-process', 'subroutine'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 40, minHeight: 30 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="10" y1="0" x2="10" y2="{{height}}" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{w10}}" y1="0" x2="{{w10}}" y2="{{height}}" stroke="#333" stroke-width="2"/>',
      order: 7,
    },
    {
      id: 'connector',
      name: 'Connector',
      description: 'Off-page or on-page connector.',
      tags: ['reference', 'circle'],
      geometry: { defaultWidth: 40, defaultHeight: 40, minWidth: 20, minHeight: 20, lockAspectRatio: true },
      template:
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 8,
    },
  ],
};
