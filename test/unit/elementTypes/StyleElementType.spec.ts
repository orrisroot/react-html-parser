import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  props: { prop1: 'value1', prop2: 'value2' },
  generatePropsFromAttributesMock: vi.fn().mockReturnValue({ prop1: 'value1', prop2: 'value2' }),
}));

vi.mock('generatePropsFromAttributes', () => ({
  default: mockStore.generatePropsFromAttributesMock,
}));

import StyleElementType from 'elementTypes/StyleElementType';
import type { DomElement } from 'interfaces';

describe('Testing `elementTypes/StyleElementType`', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.generatePropsFromAttributesMock.mockReturnValue(mockStore.props);
  });

  it('should return a `style` element with a single text child if the node has children', () => {
    const node = {
      children: [{ data: 'style data' }],
    };
    const styleElement = StyleElementType(node as DomElement, 'key');

    expect(styleElement.type).toBe('style');
    expect(styleElement.props).toEqual({
      prop1: 'value1',
      prop2: 'value2',
      children: 'style data',
    });
  });

  it('should return a `style` element with no children if the node has no children', () => {
    const node = {
      children: [],
    };
    const styleElement = StyleElementType(node as DomElement, 'key');

    expect(styleElement.type).toBe('style');
    expect(styleElement.props).toEqual({
      prop1: 'value1',
      prop2: 'value2',
      children: undefined,
    });
  });
});
