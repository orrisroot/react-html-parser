/// <reference types="vite/client" />

declare module '@orrisroot/react-html-parser' {
  import type React from 'react';
  import type { Element as DomElement, AnyNode as DomNode, Text as DomText } from 'domhandler';

  export interface Transform {
    (node: DomNode, index: number | string, transform?: Transform): React.ReactNode | null | undefined;
  }

  export interface Options {
    decodeEntities?: boolean;
    transform?: Transform;
  }

  export function convertNodeToElement(
    node: DomNode,
    index: number | string,
    transform?: Transform,
  ): React.ReactNode;

  export default function HtmlParser(html: string, options?: Options): React.ReactNode[];
}
