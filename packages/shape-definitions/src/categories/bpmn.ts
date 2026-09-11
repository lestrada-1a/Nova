import { ShapeCategory } from '../types';

/**
 * BPMN core shape definitions.
 *
 * Covers the four confirmed element families from the ranked shape list:
 *   1. Events      – start, end, and intermediate life-cycle markers
 *   2. Activities  – atomic tasks and compound sub-processes
 *   3. Gateways    – routing and merging constructs
 *   4. Data objects – data artefacts that flow through the process
 *
 * Shape order within each family follows the BPMN 2.0 specification ordering
 * (start → intermediate → end for events; atomic → compound for activities; etc.).
 *
 * SVG templates use `{{width}}` and `{{height}}` tokens; additional derived
 * tokens (cx, cy, rx, ry) are resolved by the renderer at paint time.
 */
export const bpmnCategory: ShapeCategory = {
  id: 'bpmn',
  name: 'BPMN',
  description:
    'Business Process Model and Notation (BPMN 2.0) shapes for process and workflow diagrams.',
  order: 5,
  shapes: [
    // ─── Events ────────────────────────────────────────────────────────────────

    {
      id: 'bpmn-start-event',
      name: 'Start Event',
      description:
        'Marks where a process or sub-process begins. Rendered as a thin-bordered circle.',
      tags: ['bpmn', 'event', 'start', 'trigger'],
      geometry: { defaultWidth: 36, defaultHeight: 36, minWidth: 24, minHeight: 24, lockAspectRatio: true },
      template:
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r}}" fill="white" stroke="#333" stroke-width="2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 1,
    },
    {
      id: 'bpmn-intermediate-catch-event',
      name: 'Intermediate Catch Event',
      description:
        'Catches a trigger mid-flow (e.g. a timer or message). Rendered as a double-bordered circle.',
      tags: ['bpmn', 'event', 'intermediate', 'catch'],
      geometry: { defaultWidth: 36, defaultHeight: 36, minWidth: 24, minHeight: 24, lockAspectRatio: true },
      template:
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r3}}" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 2,
    },
    {
      id: 'bpmn-intermediate-throw-event',
      name: 'Intermediate Throw Event',
      description:
        'Throws a trigger mid-flow (e.g. sends a message). Rendered as a filled double-bordered circle.',
      tags: ['bpmn', 'event', 'intermediate', 'throw'],
      geometry: { defaultWidth: 36, defaultHeight: 36, minWidth: 24, minHeight: 24, lockAspectRatio: true },
      template:
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r}}" fill="#e8e8e8" stroke="#333" stroke-width="2"/>' +
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r3}}" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 3,
    },
    {
      id: 'bpmn-boundary-event',
      name: 'Boundary Event',
      description:
        'Catches a trigger attached to the boundary of an activity. Rendered as a dashed double-bordered circle.',
      tags: ['bpmn', 'event', 'boundary', 'interrupting'],
      geometry: { defaultWidth: 36, defaultHeight: 36, minWidth: 24, minHeight: 24, lockAspectRatio: true },
      template:
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r}}" fill="white" stroke="#333" stroke-width="2" stroke-dasharray="4 2"/>' +
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r3}}" fill="none" stroke="#333" stroke-width="1.5" stroke-dasharray="4 2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 4,
    },
    {
      id: 'bpmn-end-event',
      name: 'End Event',
      description:
        'Marks where a process or sub-process ends. Rendered as a thick-bordered circle.',
      tags: ['bpmn', 'event', 'end', 'terminate'],
      geometry: { defaultWidth: 36, defaultHeight: 36, minWidth: 24, minHeight: 24, lockAspectRatio: true },
      template:
        '<circle cx="{{cx}}" cy="{{cy}}" r="{{r}}" fill="white" stroke="#333" stroke-width="4"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 5,
    },

    // ─── Activities ─────────────────────────────────────────────────────────────

    {
      id: 'bpmn-task',
      name: 'Task',
      description:
        'An atomic unit of work performed by a person or system. Rendered as a rounded rectangle.',
      tags: ['bpmn', 'activity', 'task', 'work'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 6,
    },
    {
      id: 'bpmn-user-task',
      name: 'User Task',
      description:
        'A task performed by a human with system assistance. Includes a user icon marker.',
      tags: ['bpmn', 'activity', 'task', 'human', 'user'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<circle cx="14" cy="12" r="5" fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<path d="M5,26 Q5,18 14,18 Q23,18 23,26" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 7,
    },
    {
      id: 'bpmn-service-task',
      name: 'Service Task',
      description:
        'A task performed automatically by a service or system. Includes a gear icon marker.',
      tags: ['bpmn', 'activity', 'task', 'system', 'automated', 'service'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<circle cx="14" cy="14" r="7" fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<circle cx="14" cy="14" r="3" fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<line x1="14" y1="5"  x2="14" y2="7"  stroke="#333" stroke-width="2"/>' +
        '<line x1="14" y1="21" x2="14" y2="23" stroke="#333" stroke-width="2"/>' +
        '<line x1="5"  y1="14" x2="7"  y2="14" stroke="#333" stroke-width="2"/>' +
        '<line x1="21" y1="14" x2="23" y2="14" stroke="#333" stroke-width="2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 8,
    },
    {
      id: 'bpmn-script-task',
      name: 'Script Task',
      description:
        'A task executed by a business process engine via a script. Includes a script icon marker.',
      tags: ['bpmn', 'activity', 'task', 'script', 'code'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M6,4 Q14,4 14,10 Q14,16 6,16 Q6,24 14,24" fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<line x1="8"  y1="9"  x2="14" y2="9"  stroke="#333" stroke-width="1.5"/>' +
        '<line x1="8"  y1="14" x2="14" y2="14" stroke="#333" stroke-width="1.5"/>' +
        '<line x1="8"  y1="19" x2="14" y2="19" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 9,
    },
    {
      id: 'bpmn-send-task',
      name: 'Send Task',
      description:
        'A task that sends a message to an external participant. Includes a filled envelope icon marker.',
      tags: ['bpmn', 'activity', 'task', 'message', 'send'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="4" y="6" width="18" height="14" rx="1" fill="#333" stroke="#333" stroke-width="1"/>' +
        '<polyline points="4,6 13,15 22,6" fill="none" stroke="white" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 10,
    },
    {
      id: 'bpmn-receive-task',
      name: 'Receive Task',
      description:
        'A task that waits to receive a message from an external participant. Includes an outline envelope icon marker.',
      tags: ['bpmn', 'activity', 'task', 'message', 'receive'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="4" y="6" width="18" height="14" rx="1" fill="white" stroke="#333" stroke-width="1.5"/>' +
        '<polyline points="4,6 13,15 22,6" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 11,
    },
    {
      id: 'bpmn-manual-task',
      name: 'Manual Task',
      description:
        'A task performed by a human without system assistance. Includes a hand icon marker.',
      tags: ['bpmn', 'activity', 'task', 'manual', 'human'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M5,20 L5,10 Q5,7 8,7 Q11,7 11,10 L11,14 Q12,12 14,12 Q16,12 16,14 L16,15 Q17,13 19,13 Q21,13 21,15 L21,22 Q21,28 15,28 L10,28 Q5,28 5,22 Z" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 12,
    },
    {
      id: 'bpmn-business-rule-task',
      name: 'Business Rule Task',
      description:
        'A task that evaluates a business rule or decision table. Includes a table icon marker.',
      tags: ['bpmn', 'activity', 'task', 'rule', 'decision', 'dmn'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="4" y="4" width="18" height="22" fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<rect x="4" y="4" width="18" height="8"  fill="#333"/>' +
        '<line x1="4"  y1="18" x2="22" y2="18" stroke="#333" stroke-width="1"/>' +
        '<line x1="13" y1="12" x2="13" y2="26" stroke="#333" stroke-width="1"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 13,
    },
    {
      id: 'bpmn-call-activity',
      name: 'Call Activity',
      description:
        'Calls a globally-defined process or task. Rendered as a rounded rectangle with a thick border.',
      tags: ['bpmn', 'activity', 'call', 'reuse', 'global'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="4"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 14,
    },
    {
      id: 'bpmn-sub-process',
      name: 'Sub-Process',
      description:
        'A compound activity that contains a nested process. Rendered as a rounded rectangle with a [+] marker.',
      tags: ['bpmn', 'activity', 'sub-process', 'compound', 'collapsed'],
      geometry: { defaultWidth: 120, defaultHeight: 60, minWidth: 60, minHeight: 40 },
      template:
        '<rect x="0" y="0" width="{{width}}" height="{{height}}" rx="8" ry="8" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="{{cx-8}}" y="{{h-16}}" width="16" height="12" rx="2" fill="white" stroke="#333" stroke-width="1.5"/>' +
        '<line x1="{{cx}}" y1="{{h-14}}" x2="{{cx}}" y2="{{h-6}}"  stroke="#333" stroke-width="1.5"/>' +
        '<line x1="{{cx-6}}" y1="{{h-10}}" x2="{{cx+6}}" y2="{{h-10}}" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 15,
    },

    // ─── Gateways ───────────────────────────────────────────────────────────────

    {
      id: 'bpmn-exclusive-gateway',
      name: 'Exclusive Gateway',
      description:
        'Routes flow along exactly one outgoing path based on conditions (XOR). Rendered as a diamond with an X marker.',
      tags: ['bpmn', 'gateway', 'xor', 'exclusive', 'decision', 'branch'],
      geometry: { defaultWidth: 50, defaultHeight: 50, minWidth: 30, minHeight: 30, lockAspectRatio: true },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx-10}}" y1="{{cy-10}}" x2="{{cx+10}}" y2="{{cy+10}}" stroke="#333" stroke-width="3"/>' +
        '<line x1="{{cx+10}}" y1="{{cy-10}}" x2="{{cx-10}}" y2="{{cy+10}}" stroke="#333" stroke-width="3"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 16,
    },
    {
      id: 'bpmn-inclusive-gateway',
      name: 'Inclusive Gateway',
      description:
        'Routes flow along one or more outgoing paths (OR). Rendered as a diamond with a circle marker.',
      tags: ['bpmn', 'gateway', 'or', 'inclusive', 'branch'],
      geometry: { defaultWidth: 50, defaultHeight: 50, minWidth: 30, minHeight: 30, lockAspectRatio: true },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<circle cx="{{cx}}" cy="{{cy}}" r="10" fill="none" stroke="#333" stroke-width="2.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 17,
    },
    {
      id: 'bpmn-parallel-gateway',
      name: 'Parallel Gateway',
      description:
        'Splits flow into all outgoing paths simultaneously (AND). Rendered as a diamond with a + marker.',
      tags: ['bpmn', 'gateway', 'and', 'parallel', 'fork', 'join'],
      geometry: { defaultWidth: 50, defaultHeight: 50, minWidth: 30, minHeight: 30, lockAspectRatio: true },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx}}" y1="{{cy-12}}" x2="{{cx}}" y2="{{cy+12}}" stroke="#333" stroke-width="3"/>' +
        '<line x1="{{cx-12}}" y1="{{cy}}" x2="{{cx+12}}" y2="{{cy}}" stroke="#333" stroke-width="3"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 18,
    },
    {
      id: 'bpmn-event-based-gateway',
      name: 'Event-Based Gateway',
      description:
        'Routes flow to the first event that occurs among outgoing paths. Rendered as a diamond with a double circle and pentagon marker.',
      tags: ['bpmn', 'gateway', 'event', 'race', 'branch'],
      geometry: { defaultWidth: 50, defaultHeight: 50, minWidth: 30, minHeight: 30, lockAspectRatio: true },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<circle cx="{{cx}}" cy="{{cy}}" r="12" fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<circle cx="{{cx}}" cy="{{cy}}" r="8"  fill="none" stroke="#333" stroke-width="1.5"/>' +
        '<polygon points="{{cx}},{{cy-6}} {{cx+5.7}},{{cy-1.8}} {{cx+3.5}},{{cy+4.8}} {{cx-3.5}},{{cy+4.8}} {{cx-5.7}},{{cy-1.8}}" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 19,
    },
    {
      id: 'bpmn-complex-gateway',
      name: 'Complex Gateway',
      description:
        'Handles complex merging and branching conditions. Rendered as a diamond with an asterisk marker.',
      tags: ['bpmn', 'gateway', 'complex', 'merge', 'branch'],
      geometry: { defaultWidth: 50, defaultHeight: 50, minWidth: 30, minHeight: 30, lockAspectRatio: true },
      template:
        '<polygon points="{{cx}},0 {{width}},{{cy}} {{cx}},{{height}} 0,{{cy}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx}}" y1="{{cy-12}}" x2="{{cx}}" y2="{{cy+12}}" stroke="#333" stroke-width="2.5"/>' +
        '<line x1="{{cx-12}}" y1="{{cy}}" x2="{{cx+12}}" y2="{{cy}}" stroke="#333" stroke-width="2.5"/>' +
        '<line x1="{{cx-8}}" y1="{{cy-8}}" x2="{{cx+8}}" y2="{{cy+8}}" stroke="#333" stroke-width="2.5"/>' +
        '<line x1="{{cx+8}}" y1="{{cy-8}}" x2="{{cx-8}}" y2="{{cy+8}}" stroke="#333" stroke-width="2.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 20,
    },

    // ─── Data Objects ───────────────────────────────────────────────────────────

    {
      id: 'bpmn-data-object',
      name: 'Data Object',
      description:
        'Represents data that is read or written by an activity. Rendered as a page with a folded corner.',
      tags: ['bpmn', 'data', 'document', 'artefact', 'artifact'],
      geometry: { defaultWidth: 36, defaultHeight: 50, minWidth: 24, minHeight: 30 },
      template:
        '<path d="M0,0 H{{w12}} L{{width}},12 V{{height}} H0 Z" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M{{w12}},0 L{{w12}},12 H{{width}}" fill="none" stroke="#333" stroke-width="2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 21,
    },
    {
      id: 'bpmn-data-object-collection',
      name: 'Data Object (Collection)',
      description:
        'A collection of data objects (e.g. a list). Rendered as a page with a parallel-lines collection marker.',
      tags: ['bpmn', 'data', 'collection', 'list', 'artefact', 'artifact'],
      geometry: { defaultWidth: 36, defaultHeight: 50, minWidth: 24, minHeight: 30 },
      template:
        '<path d="M0,0 H{{w12}} L{{width}},12 V{{height}} H0 Z" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M{{w12}},0 L{{w12}},12 H{{width}}" fill="none" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx-6}}" y1="{{h-8}}" x2="{{cx-6}}" y2="{{h-2}}" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx}}"   y1="{{h-8}}" x2="{{cx}}"   y2="{{h-2}}" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{cx+6}}" y1="{{h-8}}" x2="{{cx+6}}" y2="{{h-2}}" stroke="#333" stroke-width="2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 22,
    },
    {
      id: 'bpmn-data-store',
      name: 'Data Store',
      description:
        'Persistent storage accessed by activities (e.g. a database). Rendered as a cylinder.',
      tags: ['bpmn', 'data', 'database', 'storage', 'repository'],
      geometry: { defaultWidth: 60, defaultHeight: 60, minWidth: 30, minHeight: 30 },
      template:
        '<ellipse cx="{{cx}}" cy="10" rx="{{rx}}" ry="10" fill="white" stroke="#333" stroke-width="2"/>' +
        '<rect x="0" y="10" width="{{width}}" height="{{h20}}" fill="white" stroke="#333" stroke-width="2"/>' +
        '<ellipse cx="{{cx}}" cy="{{h10}}" rx="{{rx}}" ry="10" fill="white" stroke="#333" stroke-width="2"/>' +
        '<line x1="0" y1="{{h10}}" x2="0" y2="10" stroke="#333" stroke-width="2"/>' +
        '<line x1="{{width}}" y1="{{h10}}" x2="{{width}}" y2="10" stroke="#333" stroke-width="2"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 23,
    },
    {
      id: 'bpmn-data-input',
      name: 'Data Input',
      description:
        'External data provided as input to a process. Rendered as a page with a hollow arrow marker in the top-left corner.',
      tags: ['bpmn', 'data', 'input', 'artefact', 'artifact'],
      geometry: { defaultWidth: 36, defaultHeight: 50, minWidth: 24, minHeight: 30 },
      template:
        '<path d="M0,0 H{{w12}} L{{width}},12 V{{height}} H0 Z" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M{{w12}},0 L{{w12}},12 H{{width}}" fill="none" stroke="#333" stroke-width="2"/>' +
        '<polygon points="4,16 14,16 14,11 20,19 14,27 14,22 4,22" fill="none" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 24,
    },
    {
      id: 'bpmn-data-output',
      name: 'Data Output',
      description:
        'Data produced as output from a process. Rendered as a page with a filled arrow marker in the top-left corner.',
      tags: ['bpmn', 'data', 'output', 'artefact', 'artifact'],
      geometry: { defaultWidth: 36, defaultHeight: 50, minWidth: 24, minHeight: 30 },
      template:
        '<path d="M0,0 H{{w12}} L{{width}},12 V{{height}} H0 Z" fill="white" stroke="#333" stroke-width="2"/>' +
        '<path d="M{{w12}},0 L{{w12}},12 H{{width}}" fill="none" stroke="#333" stroke-width="2"/>' +
        '<polygon points="4,16 14,16 14,11 20,19 14,27 14,22 4,22" fill="#333" stroke="#333" stroke-width="1.5"/>',
      connectionPoints: [
        { id: 'top',    x: 0.5, y: 0   },
        { id: 'right',  x: 1,   y: 0.5 },
        { id: 'bottom', x: 0.5, y: 1   },
        { id: 'left',   x: 0,   y: 0.5 },
      ],
      order: 25,
    },
  ],
};
