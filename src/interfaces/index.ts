import { Element, Node, Text } from 'domhandler';
import React from 'react';

export { Element, Node, Text };

export interface Attributes {
  [key: string]: string;
}

export interface Props {
  [key: string]: string | number | boolean | Props;
}

export interface Transform {
  (node: Node, index: number | string, transform?: Transform): React.ReactNode;
}

export interface Options {
  decodeEntities?: boolean;
  transform?: Transform;
  preprocessNodes?(nodes: Node[]): Node[];
}

export interface ElementTypeFuncion {
  (node: Node, index?: number | string, transform?: Transform): React.ReactNode;
}
