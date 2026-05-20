import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockStore = vi.hoisted(() => ({
  parseDocumentMock: vi.fn().mockReturnValue({ children: ['parsed'] }),
  processNodesMock: vi.fn().mockReturnValue(['processed']),
}));

vi.mock('htmlparser2', () => ({
  default: { parseDocument: mockStore.parseDocumentMock },
  parseDocument: mockStore.parseDocumentMock,
}));

vi.mock('processNodes', () => ({
  default: mockStore.processNodesMock,
}));

import HtmlParser from 'HtmlParser';
import type { DomNode } from 'interfaces';

describe('Testing: `HtmlParser`', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should parse the html string and process the resulting nodes with default options', () => {
    const result = HtmlParser('html');
    expect(result).toEqual(['processed']);
    expect(mockStore.parseDocumentMock).toHaveBeenCalledWith('html', { decodeEntities: true });
    expect(mockStore.processNodesMock).toHaveBeenCalledWith(['parsed'], undefined);
  });

  it('should apply the options', () => {
    const transform = vi.fn();
    const preprocessNodes = vi.fn((v: DomNode[]) => v);

    const result = HtmlParser('html', { decodeEntities: false, transform, preprocessNodes });

    expect(result).toEqual(['processed']);
    expect(mockStore.parseDocumentMock).toHaveBeenCalledWith('html', { decodeEntities: false });
    expect(mockStore.processNodesMock).toHaveBeenCalledWith(['parsed'], transform);
  });
});
