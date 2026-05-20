import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  isEmptyTextNodeMock: vi.fn().mockReturnValue(false),
  convertNodeToElementMock: vi.fn(),
}));

vi.mock('isEmptyTextNode', () => ({
  default: mockStore.isEmptyTextNodeMock,
}));

vi.mock('convertNodeToElement', () => ({
  default: mockStore.convertNodeToElementMock,
}));

import processNodes from 'processNodes';

describe('Testing `processNodes`', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.isEmptyTextNodeMock.mockReturnValue(false);
    mockStore.convertNodeToElementMock.mockImplementation((node: string) => node);
  });

  it('should filter out empty text nodes', () => {
    mockStore.isEmptyTextNodeMock.mockImplementation((node: string) => node !== 'node2');

    const nodes = ['node1', 'node2', 'node3'];

    expect(processNodes(nodes)).toEqual(['node2']);
  });

  it('should return the response from the transform function if it is not undefined', () => {
    const nodes = ['node1', 'node2'];
    const transform = (node: string) => `${node}_transformed`;

    expect(processNodes(nodes, transform)).toEqual(['node1_transformed', 'node2_transformed']);
  });

  it('should return the response from the transform function if it is null', () => {
    const nodes = ['node1', 'node2'];
    const transform = () => null;

    expect(processNodes(nodes, transform)).toEqual([null, null]);
  });

  it('should ignore the response from the transform function if it is undefined', () => {
    const nodes = ['node1', 'node2'];
    const transform = () => {};
    mockStore.convertNodeToElementMock.mockImplementation((node: string) => `${node}_converted`);

    expect(processNodes(nodes, transform)).toEqual(['node1_converted', 'node2_converted']);
  });

  it('should convert the node to an element if there is no transform function', () => {
    const nodes = ['node1', 'node2'];
    mockStore.convertNodeToElementMock.mockImplementation((node: string) => `${node}_converted`);

    expect(processNodes(nodes)).toEqual(['node1_converted', 'node2_converted']);
  });
});
