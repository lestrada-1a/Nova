export * from './types';
export * from './categories/basic';
export * from './categories/flowchart';
export * from './categories/advanced';
export * from './categories/uml';
export * from './categories/bpmn';

import { ShapeCategory } from './types';
import { basicCategory }     from './categories/basic';
import { flowchartCategory } from './categories/flowchart';
import { advancedCategory }  from './categories/advanced';
import { umlCategory }       from './categories/uml';
import { bpmnCategory }      from './categories/bpmn';

/**
 * All shape categories in display order.
 * Consumer applications should iterate this array to populate the shape picker.
 */
export const shapeCategories: ShapeCategory[] = [
  basicCategory,
  flowchartCategory,
  advancedCategory,
  umlCategory,
  bpmnCategory,
].sort((a, b) => a.order - b.order);
