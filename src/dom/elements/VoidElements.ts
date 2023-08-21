/**
 * List of void elements
 * These elements are not allowed to have children
 * @type {VoidElement[]}
 */
const VoidElements = [
  'area', //
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
] as const;

export type VoidElement = (typeof VoidElements)[number];
export default VoidElements;
