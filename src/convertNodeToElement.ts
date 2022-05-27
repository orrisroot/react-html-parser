import React from 'react';
import ElementTypes from './elementTypes';
import { Node, Transform } from './interfaces';

/**
 * Converts a htmlparser2 node to a React element
 *
 * @param {Node} node The htmlparser2 node to convert
 * @param {nubmer | string} index The index of the current node
 * @param {Transform} transform Transform function to apply to children of the node
 * @returns {React.ReactNode}
 */
const convertNodeToElement = (node: Node, index: number | string, transform?: Transform): React.ReactNode => {
  return ElementTypes[node.type]?.(node, index, transform);
};

export default convertNodeToElement;
