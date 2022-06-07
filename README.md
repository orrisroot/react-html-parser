# React HTML Parser

A utility for converting HTML strings into [React](https://facebook.github.io/react/) components. Converts standard HTML elements, attributes and inline styles into their React equivalents and provides a simple way to modify and replace the content.

This library has been forked from [react-html-parser](https://github.com/peternewnham/react-html-parser) and rebranded to [@orrisroot/react-html-parser](https://github.com/orrisroot/react-html-parser) for continued maintenance.

[Try the Live Demo](https://orrisroot.github.io/react-html-parser)

[![npm](https://img.shields.io/npm/v/@orrisroot/react-html-parser.svg)](https://www.npmjs.com/package/@orrisroot/react-html-parser)
[![Downloads](https://img.shields.io/npm/dw/@orrisroot/react-html-parser.svg)](https://www.npmjs.com/package/@orrisroot/react-html-parser)

## Install

```bash
npm install react-html-parser
# or
yarn add react-html-parser
```

## Usage

```javascript
import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class HtmlComponent extends React.Component {
  render() {
    const html = '<div>Example HTML string</div>';
    return <div>{ ReactHtmlParser(html) }</div>;
  }
}
```

## Security

It is important to understand that this library should not be used as a direct replacement for using properly sanitized HTML and that it only provides the same level of protection that React does which does not provide 100% protection. All HTML should be properly sanitized using a dedicated sanitisation library (such as [dompurify](https://www.npmjs.com/package/dompurify) for node/js) before being passed to this library to ensure that you are fully protected from [malicious injections](https://en.wikipedia.org/wiki/Cross-site_scripting).

### What doesn't React protect me from?

Whilst React has a [certain level of protection to injection attacks](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks) built into it, it doesn't cover everything, for example:
* xss via iframe src: `<iframe src="javascript:alert('xss')" />`
* xss via link href: `<a href="javascript:alert('xss')">click me</a>`

[Click here](https://codesandbox.io/s/reacthtmlparser-xss-examples-ijgiu?file=/src/App.js) to see these in action and how to protect yourself using [dompurify](https://www.npmjs.com/package/dompurify) in the browser.

### Why doesn't ReactHTMLParser protect me automatically?

Including a sanitizer as part of the library means it is making decisions for you that may not be correct. It is up to you to decide what level of sanitization you need and to act accordingly. Some users may already be sanitizing on the server or others may have specialized requirements that cannot be covered by a generic implementation.

Additionally, HTML sanitization is a hard thing to get right and even the most popular and actively developed sanitizers have [vulnerabilities discovered](https://snyk.io/vuln/npm:dompurify) from time to time. By leaving the sanitization outside of this library it gives users the ability to patch and deploy any fixes needed immediately instead of having to wait for a new version of this library to be released with the fix.

## API

### `function ReactHtmlParser(html, [options])`
Takes an HTML string and returns equivalent React elements

#### Usage
```js
import ReactHtmlParser from 'react-html-parser';
```
#### Arguments
- `html`: The HTML string to parse
- `options`: Options object
  - decodeEntities=true *(boolean)*: Whether to decode html entities (defaults to true)
  - transform *(function)*: Transform function that is applied to every node
  - preprocessNodes *(function)*: Pre-process the nodes generated by `htmlparser2`

#### Transform Function
The transform function will be called for every node that is parsed by the library.

`function transform(node, index)`
##### Arguments
- `node`: The node being parsed. This is the [htmlparser2](https://github.com/fb55/htmlparser2) node object. Full details can be found on their project page but important properties are:
  - `type` (string): The type of node *(tag, text, style etc)*
  - `name` (string): The name of the node
  - `children` (array): Array of children nodes
  - `next` (node): The node's next sibling
  - `prev` (node): The node's previous sibling
  - `parent` (node): The node's parent
  - `data` (string): The text content, if the `type` is text
- `index` (number): The index of the node in relation to it's parent

#### Return Types
`return null`
Returning null will prevent the node and all of it's children from being rendered.
```js
function transform(node) {
  // do not render any <span> tags
  if (node.type === 'tag' && node.name === 'span') {
    return null;
  }
}
```
`return undefined`
If the function does not return anything, or returns undefined, then the default behaviour will occur and the parser will continue was usual.

`return React element`
React elements can be returned directly
```js
import React from 'react';
function transform(node) {
  if (node.type === 'tag' && node.name === 'b') {
    return <div>This was a bold tag</div>;
  }
}
```

#### preprocessNodes Function
Allows pre-processing the nodes generated from the html by `htmlparser2` before being passed to the library and converted to React elements.

`function preprocessNodes(nodes)`
##### Arguments
- `nodes`: The entire node tree generated by `htmlparser2`.

##### Return type
The `preprocessNodes` function should return a valid `htmlparser2` node tree.

### `function convertNodeToElement(node, index, transform)`
Processes a node and returns the React element to be rendered. This function can be used in conjunction with the previously described `transform` function to continue to process a node after modifying it.

#### Usage
```js
import { convertNodeToElement } from 'react-html-parser';
```
#### Arguments
- `node`: The node to process
- `index` (number): The index of the node in relation to it's parent
- `transform`: The transform function as described above

```js
import { convertNodeToElement } from 'react-html-parser';
function transform(node, index) {
  // convert <ul> to <ol>
  if (node.type === 'tag' && node.name === 'ul') {
    node.name = 'ol';
    return convertNodeToElement(node, index, transform);
  }
}
```

### `htmlparser2`
The library exposes the `htmlparser2` library it uses. This allows consumers
to use it without having to add it as a separate dependency.

See https://github.com/fb55/htmlparser2 for full details.
