import { convertNodeToElement } from '@orrisroot/react-html-parser';
import React from 'react';

export default {
  decodeEntities: true,
  transform: function transform(node, index) {
    // return null to block certain elements
    // don't allow <span> elements
    if (node.type === 'tag' && node.name === 'span') {
      return null;
    }

    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function
    // which will continue to render it and it's children
    if (node.type === 'tag' && node.name === 'ul') {
      node.name = 'ol';
      return convertNodeToElement(node, index, transform);
    }

    // return an <i> element for every <b>
    if (node.type === 'tag' && node.name === 'b') {
      return <i key={index}>I am now in italics, not bold</i>;
    }

    // all links must open in a new window
    if (node.type === 'tag' && node.name === 'a') {
      node.attribs.target = '_blank';
      return convertNodeToElement(node, index, transform);
    }
  },
};
