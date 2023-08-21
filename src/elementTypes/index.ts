/*
 * Map each htmlparser2 element type to a function which will convert that element type to a React element
 * Not all of the element types are supported so the UnsupportedElementType is used for them which will not return any
 * value
 */

import { ElementType } from 'htmlparser2';

import type { ElementTypeFuncion } from '../interfaces';

import StyleElementType from './StyleElementType';
import TagElementType from './TagElementType';
import TextElementType from './TextElementType';
import UnsupportedElementType from './UnsupportedElementType';

const ElementTypes: {
  [key: string]: ElementTypeFuncion;
} = {
  [ElementType.Text]: TextElementType,
  [ElementType.Tag]: TagElementType,
  [ElementType.Style]: StyleElementType,
  [ElementType.Directive]: UnsupportedElementType,
  [ElementType.Comment]: UnsupportedElementType,
  [ElementType.Script]: UnsupportedElementType,
  [ElementType.CDATA]: UnsupportedElementType,
  [ElementType.Doctype]: UnsupportedElementType,
};

export default ElementTypes;
