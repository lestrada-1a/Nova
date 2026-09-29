/**
 * Represents the geometry of a shape's bounding box.
 */
export interface ShapeGeometry {
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
  /** Whether the shape preserves its aspect ratio on resize. */
  lockAspectRatio?: boolean;
}

/**
 * A single connection point (port) on a shape.
 * Coordinates are expressed as fractions of the shape's width/height (0–1).
 */
export interface ConnectionPoint {
  id: string;
  x: number;
  y: number;
}

/**
 * The complete definition of a single shape.
 */
export interface ShapeDefinition {
  /** Unique identifier, scoped within the category (e.g. "start-event"). */
  id: string;
  /** Human-readable display name shown in the shape picker. */
  name: string;
  /** Optional longer description shown in tooltips or search. */
  description?: string;
  /** Search/filter tags. */
  tags?: string[];
  /** Default bounding-box geometry. */
  geometry: ShapeGeometry;
  /**
   * SVG template string used to render the shape.
   * Supports `{{width}}` and `{{height}}` interpolation tokens.
   */
  template: string;
  /** Pre-defined connection ports. Defaults to the four cardinal mid-points when omitted. */
  connectionPoints?: ConnectionPoint[];
  /** Display order within the category (ascending). */
  order: number;
}

/**
 * A logical grouping of shapes that appears as a section in the shape picker.
 */
export interface ShapeCategory {
  /** Unique identifier (e.g. "bpmn"). */
  id: string;
  /** Human-readable label for the category header. */
  name: string;
  /** Optional description shown in the shape picker. */
  description?: string;
  /** Display order relative to other categories (ascending). */
  order: number;
  shapes: ShapeDefinition[];
}
