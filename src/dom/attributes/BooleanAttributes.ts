/**
 * List of boolean attributes
 * These attributes should have their React attribute value set to be the same as their name
 * E.g. <input disabled> = <input disabled>
 *      <input disabled=""> = <input disabled>
 *      <input disabled="disabled"> = <input disabled>
 * @type {BooleanAttribute[]}
 */
const BooleanAttributes = [
  'allowfullScreen', //
  'async',
  'autoplay',
  'capture',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'loop',
  'multiple',
  'muted',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'scoped',
  'seamless',
  'selected',
  'itemscope',
] as const;

export type BooleanAttribute = (typeof BooleanAttributes)[number];
export default BooleanAttributes;
