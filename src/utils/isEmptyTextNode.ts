import { DomNode, DomText } from '../interfaces';

/**
 * Tests a htmlparser2 node and returns whether is it a text node at the start and end of the line containing only
 * white space. This allows these node types to be excluded from the rendering because they are unnecessary.
 *
 * @param {DomNode} node The element object as created by htmlparser2
 * @returns {boolean} Whether the node is an empty text node
 */
const isEmptyTextNode = (node: DomNode): boolean => {
  return node.type === 'text' && /\r?\n/.test((node as DomText).data) && (node as DomText).data.trim() === '';
};

export default isEmptyTextNode;
