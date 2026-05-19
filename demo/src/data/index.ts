import entities from './entities/index';
import simple from './simple/index';
import transform from './transform/index';

export type ExampleKey = 'simple' | 'entities' | 'transform';

interface ExampleData {
  html: string;
  options: Record<string, unknown>;
  display?: string;
}

export default {
  simple,
  entities,
  transform,
} as Record<ExampleKey, ExampleData>;
