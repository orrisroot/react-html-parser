import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  parseDOMMock: vi.fn().mockReturnValue(['parsed']),
  processNodesMock: vi.fn().mockReturnValue(['processed']),
}));

vi.mock('htmlparser2', () => ({
  default: { parseDOM: mockStore.parseDOMMock },
  parseDOM: mockStore.parseDOMMock,
}));

vi.mock('processNodes', () => ({
  default: mockStore.processNodesMock,
}));

import HtmlParser from 'HtmlParser';

describe('Testing: `HtmlParser`', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should parse the html string and process the resulting nodes with default options', () => {
    const result = HtmlParser('html');
    expect(result).toEqual(['processed']);
    expect(mockStore.parseDOMMock).toHaveBeenCalledWith('html', { decodeEntities: true });
    expect(mockStore.processNodesMock).toHaveBeenCalledWith(['parsed'], undefined);
  });

  it('should apply the options', () => {
    const transform = vi.fn();
    const preprocessNodes = vi.fn((v: any) => v);

    const result = HtmlParser('html', { decodeEntities: false, transform, preprocessNodes });

    expect(result).toEqual(['processed']);
    expect(mockStore.parseDOMMock).toHaveBeenCalledWith('html', { decodeEntities: false });
    expect(mockStore.processNodesMock).toHaveBeenCalledWith(['parsed'], transform);
  });
});
