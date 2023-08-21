import type React from 'react';

import ElementTypes from './elementTypes';
import type { DomNode, Transform } from './interfaces';

/**
 * Converts a htmlparser2 node to a React element
 *
 * @param {DomNode} node The htmlparser2 node to convert
 * @param {number | string} index The index of the current node
 * @param {Transform} transform Transform function to apply to children of the node
 * @returns {React.ReactNode}
 */
const convertNodeToElement = (
  node: DomNode,
  index: number | string,
  transform?: Transform
): React.ReactNode => {
  return ElementTypes[node.type]?.(node, index, transform);
};

export default convertNodeToElement;
