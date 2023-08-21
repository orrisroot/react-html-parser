import React from 'react';

import type { VoidElement } from '../dom/elements/VoidElements';
import VoidElements from '../dom/elements/VoidElements';
import type { DomElement, DomNode, ElementTypeFunction, Transform } from '../interfaces';
import processNodes from '../processNodes';
import generatePropsFromAttributes from '../utils/generatePropsFromAttributes';
import isValidTagOrAttributeName from '../utils/isValidTagOrAttributeName';

/**
 * Converts any element (excluding style - see StyleElementType - and script) to a react element.
 *
 * @param {DomNode} node The tag node
 * @param {number | string} index The index of the React element relative to it's parent
 * @param {Transform} transform The transform function to apply to all children
 * @returns {React.Element} The React tag element
 */
const TagElementType: ElementTypeFunction = (
  node: DomNode,
  index?: number | string,
  transform?: Transform
): React.ReactNode => {
  const node_ = node as DomElement;

  const tagName = node_.name;

  // validate tag name
  if (!isValidTagOrAttributeName(tagName)) {
    return null;
  }

  // generate props
  const props = generatePropsFromAttributes(node_.attribs, index);

  // If the node is not a void element and has children then process them
  let children = null;
  if (!VoidElements.includes(tagName as VoidElement)) {
    children = processNodes(node_.children, transform);
  }

  // create and return the element
  return React.createElement(tagName, props, children);
};

export default TagElementType;
