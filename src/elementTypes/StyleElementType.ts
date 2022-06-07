import React from 'react';
import { DomElement, DomNode, DomText, ElementTypeFuncion } from '../interfaces';
import generatePropsFromAttributes from '../utils/generatePropsFromAttributes';

/**
 * Converts a <style> element to a React element
 *
 * @param {DomNode} node The style node
 * @param {number | string} index The index of the React element relative to it's parent
 * @returns {React.ReactNode} The React style element
 */
const StyleElementType: ElementTypeFuncion = (node: DomNode, index?: number | string): React.ReactNode => {
  const node_ = node as DomElement;

  // The style element only ever has a single child which is the styles so try and find this to add as
  // a child to the style element that will be created
  let styles;
  if (node_.children.length > 0) {
    styles = (node_.children[0] as DomText).data;
  }

  // generate props
  const props = generatePropsFromAttributes(node_.attribs, index);

  // create and return the element
  return React.createElement('style', props, styles);
};

export default StyleElementType;
