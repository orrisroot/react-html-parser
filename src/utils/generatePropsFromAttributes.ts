import { Attributes, Props } from '../interfaces';
import htmlAttributesToReact from './htmlAttributesToReact';
import inlineStyleToObject from './inlineStyleToObject';

/**
 * Generates props for a React element from an object of HTML attributes
 *
 * @param {Attributes} attributes The HTML attributes
 * @param {number | string} index The key to give the react element
 */
const generatePropsFromAttributes = (attributes: Attributes, index?: number | string): Props => {
  // generate props
  const props: Props = Object.assign({}, htmlAttributesToReact(attributes), { key: index ?? 1 });

  // if there is an inline/string style prop then convert it to a React style object
  // otherwise, it is invalid and omitted
  if (typeof props.style === 'string') {
    props.style = inlineStyleToObject(props.style);
  } else {
    delete props.style;
  }

  return props;
};

export default generatePropsFromAttributes;
