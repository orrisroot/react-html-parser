import type React from 'react';

import type { DomNode, DomText, ElementTypeFunction } from '../interfaces';

/**
 * Converts a text node to a React text element
 *
 * @param {DomNode} node The text node
 * @returns {React.ReactNode} The text
 */
const TextElementType: ElementTypeFunction = (node: DomNode): React.ReactNode => {
  const node_ = node as DomText;

  // React will accept plain text for rendering so just return the node data
  return node_.data;
};

export default TextElementType;
