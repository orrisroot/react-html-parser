import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  ElementTypes: {
    text: vi.fn(),
    type1: vi.fn().mockReturnValue('type1'),
    type2: vi.fn().mockReturnValue('type2'),
  },
}));

vi.mock('elementTypes', () => ({
  default: mockStore.ElementTypes,
}));

import convertNodeToElement from 'convertNodeToElement';

describe('Testing `convertNodeToElement`', () => {
  let transform: () => void;
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.ElementTypes.text.mockClear();
    mockStore.ElementTypes.type1.mockClear();
    mockStore.ElementTypes.type2.mockClear();
    transform = () => {};
  });

  it('should convert each node to the correct element type', () => {
    const nodes = [
      { type: 'type1', data: 'type1 1' },
      { type: 'type2', data: 'type2 1' },
      { type: 'type1', data: 'type1 2' },
    ];

    const node1 = convertNodeToElement(nodes[0], 0, transform);
    expect(node1).toBe('type1');

    const node2 = convertNodeToElement(nodes[1], 1, transform);
    expect(node2).toBe('type2');

    const node3 = convertNodeToElement(nodes[2], 2, transform);
    expect(node3).toBe('type1');

    expect(mockStore.ElementTypes.type1.mock.calls.length).toBe(2);
    expect(mockStore.ElementTypes.type1.mock.calls[0]).toEqual([nodes[0], 0, transform]);
    expect(mockStore.ElementTypes.type1.mock.calls[1]).toEqual([nodes[2], 2, transform]);

    expect(mockStore.ElementTypes.type2.mock.calls.length).toBe(1);
    expect(mockStore.ElementTypes.type2.mock.calls[0]).toEqual([nodes[1], 1, transform]);
  });
});
