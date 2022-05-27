import * as htmlparser2 from 'htmlparser2';
import React from 'react';
import { Node, Options } from './interfaces';
import processNodes from './processNodes';

/**
 * Parses a HTML string and returns a list of React components generated from it
 *
 * @param {string} html The HTML to convert into React component
 * @param {Options} options Options to pass
 * @returns {React.ReactNode[]} List of top level React elements
 */
const HtmlParser = (html: string, options?: Options): React.ReactNode[] => {
  const decodeEntities = options?.decodeEntities ?? true;
  const transform = options?.transform;
  const defaultPreprocessNodes = (nodes: Node[]) => nodes;
  const preprocessNodes = options?.preprocessNodes ?? defaultPreprocessNodes;
  const nodes = preprocessNodes(htmlparser2.parseDOM(html, { decodeEntities }));
  return processNodes(nodes, transform);
};

export default HtmlParser;
