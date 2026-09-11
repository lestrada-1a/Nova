import { bpmnCategory } from '../categories/bpmn';
import { ShapeDefinition } from '../types';

const EXPECTED_EVENT_IDS = [
  'bpmn-start-event',
  'bpmn-intermediate-catch-event',
  'bpmn-intermediate-throw-event',
  'bpmn-boundary-event',
  'bpmn-end-event',
];

const EXPECTED_ACTIVITY_IDS = [
  'bpmn-task',
  'bpmn-user-task',
  'bpmn-service-task',
  'bpmn-script-task',
  'bpmn-send-task',
  'bpmn-receive-task',
  'bpmn-manual-task',
  'bpmn-business-rule-task',
  'bpmn-call-activity',
  'bpmn-sub-process',
];

const EXPECTED_GATEWAY_IDS = [
  'bpmn-exclusive-gateway',
  'bpmn-inclusive-gateway',
  'bpmn-parallel-gateway',
  'bpmn-event-based-gateway',
  'bpmn-complex-gateway',
];

const EXPECTED_DATA_OBJECT_IDS = [
  'bpmn-data-object',
  'bpmn-data-object-collection',
  'bpmn-data-store',
  'bpmn-data-input',
  'bpmn-data-output',
];

const ALL_EXPECTED_IDS = [
  ...EXPECTED_EVENT_IDS,
  ...EXPECTED_ACTIVITY_IDS,
  ...EXPECTED_GATEWAY_IDS,
  ...EXPECTED_DATA_OBJECT_IDS,
];

describe('bpmnCategory', () => {
  it('has id "bpmn"', () => {
    expect(bpmnCategory.id).toBe('bpmn');
  });

  it('has a non-empty name', () => {
    expect(bpmnCategory.name.trim()).not.toBe('');
  });

  it('has order 5 (after basic, flowchart, advanced, uml)', () => {
    expect(bpmnCategory.order).toBe(5);
  });

  it('contains all expected shape ids', () => {
    const ids = bpmnCategory.shapes.map((s) => s.id);
    for (const expectedId of ALL_EXPECTED_IDS) {
      expect(ids).toContain(expectedId);
    }
  });

  it('shape ids are unique', () => {
    const ids = bpmnCategory.shapes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('shapes are ordered ascending', () => {
    const orders = bpmnCategory.shapes.map((s) => s.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  describe('events', () => {
    it.each(EXPECTED_EVENT_IDS)('includes shape %s', (id) => {
      expect(bpmnCategory.shapes.find((s) => s.id === id)).toBeDefined();
    });

    it('all event shapes have "event" in their tags', () => {
      for (const id of EXPECTED_EVENT_IDS) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.tags).toContain('event');
      }
    });

    it('start event has a thinner border than end event (stroke-width "2" vs "4")', () => {
      const start = bpmnCategory.shapes.find((s) => s.id === 'bpmn-start-event')!;
      const end   = bpmnCategory.shapes.find((s) => s.id === 'bpmn-end-event')!;
      expect(start.template).toContain('stroke-width="2"');
      expect(end.template).toContain('stroke-width="4"');
    });

    it('intermediate catch and throw events both use double circles', () => {
      const catchEvent = bpmnCategory.shapes.find((s) => s.id === 'bpmn-intermediate-catch-event')!;
      const throwEvent = bpmnCategory.shapes.find((s) => s.id === 'bpmn-intermediate-throw-event')!;
      // Both templates reference two <circle> elements
      const circleCount = (t: string) => (t.match(/<circle/g) ?? []).length;
      expect(circleCount(catchEvent.template)).toBeGreaterThanOrEqual(2);
      expect(circleCount(throwEvent.template)).toBeGreaterThanOrEqual(2);
    });

    it('boundary event uses dashed stroke', () => {
      const boundary = bpmnCategory.shapes.find((s) => s.id === 'bpmn-boundary-event')!;
      expect(boundary.template).toContain('stroke-dasharray');
    });
  });

  describe('activities', () => {
    it.each(EXPECTED_ACTIVITY_IDS)('includes shape %s', (id) => {
      expect(bpmnCategory.shapes.find((s) => s.id === id)).toBeDefined();
    });

    it('all activity shapes have "activity" in their tags', () => {
      for (const id of EXPECTED_ACTIVITY_IDS) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.tags).toContain('activity');
      }
    });

    it('all task shapes use a rounded-rectangle template (rx="8")', () => {
      const taskIds = EXPECTED_ACTIVITY_IDS.filter((id) => id.endsWith('-task'));
      for (const id of taskIds) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.template).toContain('rx="8"');
      }
    });

    it('call activity uses a thicker border than a plain task', () => {
      const task       = bpmnCategory.shapes.find((s) => s.id === 'bpmn-task')!;
      const callActivity = bpmnCategory.shapes.find((s) => s.id === 'bpmn-call-activity')!;
      expect(task.template).toContain('stroke-width="2"');
      expect(callActivity.template).toContain('stroke-width="4"');
    });

    it('sub-process template includes a [+] marker', () => {
      const subProcess = bpmnCategory.shapes.find((s) => s.id === 'bpmn-sub-process')!;
      // The [+] is represented by perpendicular lines within a small rect
      expect(subProcess.template).toContain('<line');
    });
  });

  describe('gateways', () => {
    it.each(EXPECTED_GATEWAY_IDS)('includes shape %s', (id) => {
      expect(bpmnCategory.shapes.find((s) => s.id === id)).toBeDefined();
    });

    it('all gateway shapes have "gateway" in their tags', () => {
      for (const id of EXPECTED_GATEWAY_IDS) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.tags).toContain('gateway');
      }
    });

    it('all gateways use a diamond (<polygon>) as their base', () => {
      for (const id of EXPECTED_GATEWAY_IDS) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.template).toContain('<polygon');
      }
    });

    it('exclusive gateway contains an X marker', () => {
      const xor = bpmnCategory.shapes.find((s) => s.id === 'bpmn-exclusive-gateway')!;
      // Two diagonal lines form an X
      expect((xor.template.match(/<line/g) ?? []).length).toBeGreaterThanOrEqual(2);
    });

    it('parallel gateway contains a + marker', () => {
      const and = bpmnCategory.shapes.find((s) => s.id === 'bpmn-parallel-gateway')!;
      expect((and.template.match(/<line/g) ?? []).length).toBeGreaterThanOrEqual(2);
    });

    it('inclusive gateway contains a circle marker', () => {
      const or = bpmnCategory.shapes.find((s) => s.id === 'bpmn-inclusive-gateway')!;
      expect(or.template).toContain('<circle');
    });

    it('all gateways lock aspect ratio', () => {
      for (const id of EXPECTED_GATEWAY_IDS) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.geometry.lockAspectRatio).toBe(true);
      }
    });
  });

  describe('data objects', () => {
    it.each(EXPECTED_DATA_OBJECT_IDS)('includes shape %s', (id) => {
      expect(bpmnCategory.shapes.find((s) => s.id === id)).toBeDefined();
    });

    it('all data shapes have "data" in their tags', () => {
      for (const id of EXPECTED_DATA_OBJECT_IDS) {
        const shape = bpmnCategory.shapes.find((s) => s.id === id)!;
        expect(shape.tags).toContain('data');
      }
    });

    it('data object uses a folded-page path template', () => {
      const dataObj = bpmnCategory.shapes.find((s) => s.id === 'bpmn-data-object')!;
      expect(dataObj.template).toContain('<path');
    });

    it('data object collection includes extra vertical lines for the collection marker', () => {
      const collection = bpmnCategory.shapes.find((s) => s.id === 'bpmn-data-object-collection')!;
      const lineCount = (collection.template.match(/<line/g) ?? []).length;
      expect(lineCount).toBeGreaterThanOrEqual(3);
    });

    it('data store uses a cylinder (ellipses + rect)', () => {
      const store = bpmnCategory.shapes.find((s) => s.id === 'bpmn-data-store')!;
      expect(store.template).toContain('<ellipse');
      expect(store.template).toContain('<rect');
    });

    it('data input uses a hollow arrow marker', () => {
      const input = bpmnCategory.shapes.find((s) => s.id === 'bpmn-data-input')!;
      expect(input.template).toContain('fill="none"');
    });

    it('data output uses a filled arrow marker', () => {
      const output = bpmnCategory.shapes.find((s) => s.id === 'bpmn-data-output')!;
      expect(output.template).toContain('fill="#333"');
    });
  });

  describe('connection points', () => {
    it.each(bpmnCategory.shapes)(
      'shape "$id" has the four cardinal connection points',
      (shape: ShapeDefinition) => {
        const points = shape.connectionPoints!;
        expect(points).toBeDefined();
        expect(points.find((p) => p.id === 'top')).toMatchObject({ x: 0.5, y: 0 });
        expect(points.find((p) => p.id === 'right')).toMatchObject({ x: 1, y: 0.5 });
        expect(points.find((p) => p.id === 'bottom')).toMatchObject({ x: 0.5, y: 1 });
        expect(points.find((p) => p.id === 'left')).toMatchObject({ x: 0, y: 0.5 });
      },
    );
  });
});
