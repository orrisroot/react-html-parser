import { Node, Text } from '../interfaces';

/**
 * Tests a htmlparser2 node and returns whether is it a text node at the start and end of the line containing only
 * white space. This allows these node types to be excluded from the rendering because they are unnecessary.
 *
 * @param {Node} node The element object as created by htmlparser2
 * @returns {boolean} Whether the node is an empty text node
 */
const isEmptyTextNode = (node: Node): boolean => {
  return node.type === 'text' && /\r?\n/.test((node as Text).data) && (node as Text).data.trim() === '';
};

export default isEmptyTextNode;
