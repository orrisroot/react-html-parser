import UnsupportedElementType from 'elementTypes/UnsupportedElementType';
import { describe, expect, it } from 'vitest';

describe('Testing `elementTypes/UnsupportedElementType`', () => {
  it('should always return null', () => {
    expect(UnsupportedElementType()).toBeNull();
    expect(UnsupportedElementType('test')).toBeNull();
    expect(UnsupportedElementType({}, 'test')).toBeNull();
  });
});
