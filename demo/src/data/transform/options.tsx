import type { Transform } from '@orrisroot/react-html-parser';
import { convertNodeToElement } from '@orrisroot/react-html-parser';
import type { Element as DomElement, Node as DomNode } from 'domhandler';

const isTag = (node: DomNode): node is DomElement => node.type === 'tag';

const transform: Transform = (node, index) => {
  if (isTag(node)) {
    // return null to block certain elements
    // don't allow <span> elements
    if (node.name === 'span') {
      return null;
    }

    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.name === 'ul') {
      node.name = 'ol';
      return convertNodeToElement(node, index, transform);
    }

    // return an <i> element for every <b>
    // a key must be included for all elements
    if (node.name === 'b') {
      return <i key={index}>I am now in italics, not bold</i>;
    }

    // all links must open in a new window
    if (node.name === 'a') {
      node.attribs.target = '_blank';
      return convertNodeToElement(node, index, transform);
    }
  }
};

const options = {
  decodeEntities: true,
  transform,
};

export default options;
