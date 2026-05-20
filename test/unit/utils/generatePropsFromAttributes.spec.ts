import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  htmlAttributesToReactMock: vi.fn().mockImplementation((attribs: Record<string, string>) => attribs),
  inlineStyleToObjectMock: vi.fn().mockReturnValue('converted-style'),
}));

vi.mock('htmlAttributesToReact', () => ({
  default: mockStore.htmlAttributesToReactMock,
}));

vi.mock('inlineStyleToObject', () => ({
  default: mockStore.inlineStyleToObjectMock,
}));

import generatePropsFromAttributes from 'generatePropsFromAttributes';

describe('Testing `utils/generatePropsFromAttributes`', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.htmlAttributesToReactMock.mockImplementation((attribs: Record<string, string>) => attribs);
    mockStore.inlineStyleToObjectMock.mockReturnValue('converted-style');
  });

  it('should return an object with the converted html attributes and key', () => {
    const attributes = {
      attr1: 'one',
      attr2: 'two',
    };

    expect(generatePropsFromAttributes(attributes, 'the-key')).toEqual({
      attr1: 'one',
      attr2: 'two',
      key: 'the-key',
    });

    expect(mockStore.htmlAttributesToReactMock).toHaveBeenCalledWith(attributes);
  });

  it('should return an object containing the converted style prop if there is a style html attribute', () => {
    const attributes = {
      style: 'style',
    };

    expect(generatePropsFromAttributes(attributes, 'style-key')).toEqual({
      style: 'converted-style',
      key: 'style-key',
    });

    expect(mockStore.inlineStyleToObjectMock).toHaveBeenCalledWith('style');
  });

  it('should return an object containing the converted style prop when the style html attribute is an empty string', () => {
    const attributes = {
      style: '',
    };

    expect(generatePropsFromAttributes(attributes, 'style-key')).toEqual({
      style: 'converted-style',
      key: 'style-key',
    });

    expect(mockStore.inlineStyleToObjectMock).toHaveBeenCalledWith('');
  });
});
