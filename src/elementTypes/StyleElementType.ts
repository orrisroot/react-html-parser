import React from 'react';
import { Element, ElementTypeFuncion, Node, Text } from '../interfaces';
import generatePropsFromAttributes from '../utils/generatePropsFromAttributes';

/**
 * Converts a <style> element to a React element
 *
 * @param {Node} node The style node
 * @param {number | string} index The index of the React element relative to it's parent
 * @returns {RReact.ReactNode} The React style element
 */
const StyleElementType: ElementTypeFuncion = (node: Node, index?: number | string): React.ReactNode => {
  const node_ = node as Element;

  // The style element only ever has a single child which is the styles so try and find this to add as
  // a child to the style element that will be created
  let styles;
  if (node_.children.length > 0) {
    styles = (node_.children[0] as Text).data;
  }

  // generate props
  const props = generatePropsFromAttributes(node_.attribs, index);

  // create and return the element
  return React.createElement("style", props, styles);
};

export default StyleElementType;
