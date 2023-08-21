import { Element as DomElement, Node as DomNode, Text as DomText } from 'domhandler';
import type React from 'react';

export { DomElement, DomNode, DomText };

export interface Attributes {
  [key: string]: string;
}

export interface Props {
  [key: string]: string | number | boolean | Props;
}

export interface Transform {
  (node: DomNode, index: number | string, transform?: Transform): React.ReactNode;
}

export interface Options {
  decodeEntities?: boolean;
  transform?: Transform;
  preprocessNodes?(nodes: DomNode[]): DomNode[];
}

export interface ElementTypeFunction {
  (node: DomNode, index?: number | string, transform?: Transform): React.ReactNode;
}
