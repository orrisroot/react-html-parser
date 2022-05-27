import React from 'react';
import { ElementTypeFuncion, Node, Text } from '../interfaces';

/**
 * Converts a text node to a React text element
 *
 * @param {Node} node The text node
 * @returns {React.ReactNode} The text
 */
const TextElementType: ElementTypeFuncion = (node: Node): React.ReactNode => {
  const node_ = node as Text;

  // React will accept plain text for rendering so just return the node data
  return node_.data;
};

export default TextElementType;
