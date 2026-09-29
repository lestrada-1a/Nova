import { shapeCategories, ShapeCategory, ShapeDefinition } from '../index';

describe('shapeCategories registry', () => {
  it('exports all five expected categories', () => {
    const ids = shapeCategories.map((c) => c.id);
    expect(ids).toEqual(
      expect.arrayContaining(['basic', 'flowchart', 'advanced', 'uml', 'bpmn']),
    );
    expect(ids).toHaveLength(5);
  });

  it('is sorted by category order (ascending)', () => {
    const orders = shapeCategories.map((c) => c.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  describe.each(shapeCategories)('category "$id"', (category: ShapeCategory) => {
    it('has a non-empty name', () => {
      expect(category.name.trim()).not.toBe('');
    });

    it('has at least one shape', () => {
      expect(category.shapes.length).toBeGreaterThan(0);
    });

    it('shape ids are unique within the category', () => {
      const ids = category.shapes.map((s: ShapeDefinition) => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('shapes are sorted by order (ascending)', () => {
      const orders = category.shapes.map((s: ShapeDefinition) => s.order);
      expect(orders).toEqual([...orders].sort((a, b) => a - b));
    });

    it.each(category.shapes)('shape "$id" has valid geometry', (shape: ShapeDefinition) => {
      expect(shape.geometry.defaultWidth).toBeGreaterThan(0);
      expect(shape.geometry.defaultHeight).toBeGreaterThan(0);
      if (shape.geometry.minWidth !== undefined) {
        expect(shape.geometry.minWidth).toBeLessThanOrEqual(shape.geometry.defaultWidth);
      }
      if (shape.geometry.minHeight !== undefined) {
        expect(shape.geometry.minHeight).toBeLessThanOrEqual(shape.geometry.defaultHeight);
      }
    });

    it.each(category.shapes)('shape "$id" has a non-empty SVG template', (shape: ShapeDefinition) => {
      expect(shape.template.trim()).not.toBe('');
    });
  });
});
