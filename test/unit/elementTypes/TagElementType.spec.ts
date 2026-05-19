import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  generatePropsFromAttributesMock: vi.fn().mockImplementation((attrs: any) => attrs ?? {}),
  processNodesMock: vi.fn().mockReturnValue('children'),
  isValidTagOrAttributeNameMock: vi.fn().mockReturnValue(true),
  VoidElementsMock: ['void'],
}));

vi.mock('utils/generatePropsFromAttributes', () => ({
  default: mockStore.generatePropsFromAttributesMock,
}));

vi.mock('processNodes', () => ({
  default: mockStore.processNodesMock,
}));

vi.mock('utils/isValidTagOrAttributeName', () => ({
  default: mockStore.isValidTagOrAttributeNameMock,
}));

vi.mock('VoidElements', () => ({
  default: mockStore.VoidElementsMock,
}));

import TagElementType from 'elementTypes/TagElementType';

describe('Testing `elementTypes/TagElementType`', () => {
  let transform: () => void;
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.generatePropsFromAttributesMock.mockImplementation((attrs: any) => attrs ?? {});
    mockStore.processNodesMock.mockReturnValue('children');
    mockStore.isValidTagOrAttributeNameMock.mockReturnValue(true);
    mockStore.VoidElementsMock = ['void'];
    transform = () => {};
  });

  it('should return a React element corresponding to the node name', () => {
    const node1 = {
      name: 'h1',
      attribs: {
        id: 'test',
      },
      children: 'node 1 children',
    };
    const node1Element = TagElementType(node1 as any, 'key', transform);

    expect(node1Element.type).toBe('h1');
    expect(node1Element.props).toEqual({
      id: 'test',
      children: 'children',
    });

    expect(mockStore.processNodesMock).toHaveBeenCalledWith('node 1 children', transform);
    expect(mockStore.generatePropsFromAttributesMock).toHaveBeenCalledWith(node1.attribs, 'key');
  });

  it('should not pass though children for void elements', () => {
    const voidNode = {
      name: 'void',
      attribs: {
        id: 'test',
      },
      children: 'child',
    };

    const voidElement = TagElementType(voidNode as any, 'key');

    expect(voidElement.type).toBe('void');
    expect(voidElement.props.children).toBe(null);
  });

  it('should return null for invalid tag types', () => {
    mockStore.isValidTagOrAttributeNameMock.mockReturnValue(false);
    const invalidNode = {
      name: 'invalid',
    };

    expect(TagElementType(invalidNode as any)).toBeNull();
  });
});
