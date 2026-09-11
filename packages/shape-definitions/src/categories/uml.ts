import { ShapeCategory } from '../types';

export const umlCategory: ShapeCategory = {
  id: 'uml',
  name: 'UML',
  description: 'Unified Modeling Language shapes for class, component, and use-case diagrams.',
  order: 4,
  shapes: [
    {
      id: 'class',
      name: 'Class',
      description: 'UML class with name, attributes, and methods compartments.',
      tags: ['object', 'oop', 'class-diagram'],
      geometry: { defaultWidth: 160, defaultHeight: 120, minWidth: 80, minHeight: 60 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="0" width="{{width}}" height="30" fill="#dde8f0" stroke="#333" stroke-width="2"/>' +
        '<line x1="0" y1="60" x2="{{width}}" y2="60" stroke="#333" stroke-width="1"/>',
      order: 1,
    },
    {
      id: 'interface',
      name: 'Interface',
      description: 'UML interface (lollipop notation header).',
      tags: ['contract', 'protocol', 'class-diagram'],
      geometry: { defaultWidth: 160, defaultHeight: 120, minWidth: 80, minHeight: 60 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="0" width="{{width}}" height="30" fill="#ddeedd" stroke="#333" stroke-width="2"/>' +
        '<line x1="0" y1="60" x2="{{width}}" y2="60" stroke="#333" stroke-width="1"/>',
      order: 2,
    },
    {
      id: 'abstract-class',
      name: 'Abstract Class',
      description: 'UML abstract class (italic name compartment).',
      tags: ['abstract', 'class-diagram'],
      geometry: { defaultWidth: 160, defaultHeight: 120, minWidth: 80, minHeight: 60 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="0" width="{{width}}" height="30" fill="#f5e6ff" stroke="#333" stroke-width="2"/>' +
        '<line x1="0" y1="60" x2="{{width}}" y2="60" stroke="#333" stroke-width="1"/>',
      order: 3,
    },
    {
      id: 'package',
      name: 'Package',
      description: 'UML package or namespace.',
      tags: ['namespace', 'module', 'class-diagram'],
      geometry: { defaultWidth: 160, defaultHeight: 120, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="20" width="{{width}}" height="{{h20}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="0" width="60" height="20" fill="white" stroke="#333" stroke-width="2"/>',
      order: 4,
    },
    {
      id: 'use-case',
      name: 'Use Case',
      description: 'UML use-case ellipse.',
      tags: ['scenario', 'use-case-diagram'],
      geometry: { defaultWidth: 160, defaultHeight: 80, minWidth: 60, minHeight: 30 },
      template:
        '<ellipse cx="{{cx}}" cy="{{cy}}" rx="{{rx}}" ry="{{ry}}" fill="white" stroke="#333" stroke-width="2"/>',
      order: 5,
    },
    {
      id: 'component',
      name: 'Component',
      description: 'UML component.',
      tags: ['module', 'service', 'component-diagram'],
      geometry: { defaultWidth: 160, defaultHeight: 80, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="20" y="0" width="{{w20}}" height="{{height}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="20" width="30" height="16" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="44" width="30" height="16" fill="white" stroke="#333" stroke-width="2"/>',
      order: 6,
    },
    {
      id: 'node',
      name: 'Node',
      description: 'UML deployment node (3-D box).',
      tags: ['device', 'server', 'deployment-diagram'],
      geometry: { defaultWidth: 140, defaultHeight: 100, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="20" width="{{w20}}" height="{{h20}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<polygon points="0,20 20,0 {{width}},0 {{w20}},20" fill="#f0f0f0" stroke="#333" stroke-width="2"/>' +
        '<polygon points="{{w20}},20 {{width}},0 {{width}},{{h20}} {{w20}},{{height}}" fill="#e0e0e0" stroke="#333" stroke-width="2"/>',
      order: 7,
    },
    {
      id: 'note',
      name: 'Note',
      description: 'UML note / comment.',
      tags: ['comment', 'annotation'],
      geometry: { defaultWidth: 140, defaultHeight: 80, minWidth: 40, minHeight: 30 },
      template:
        '<path d="M0,0 H{{w20}} L{{width}},20 V{{height}} H0 Z" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M{{w20}},0 L{{w20}},20 H{{width}}" fill="none" stroke="#333" stroke-width="2"/>',
      order: 8,
    },
  ],
};
