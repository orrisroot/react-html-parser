import type { ElementTypeFuncion } from '../interfaces';

/**
 * Handles an unsupported element type by returning null so nothing is rendered
 * @returns {React.ReactNode}
 */
const UnsupportedElementType: ElementTypeFuncion = (): React.ReactNode => {
  // do nothing because the element type is unsupported
  // comment, directive, script, cdata, doctype are all currently unsupported
  return null;
};

export default UnsupportedElementType;
