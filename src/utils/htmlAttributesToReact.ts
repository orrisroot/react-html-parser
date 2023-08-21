import BooleanAttributes from '../dom/attributes/BooleanAttributes';
import EventAttributes from '../dom/attributes/EventAttributes';
import type { ReactAttribute } from '../dom/attributes/ReactAttributes';
import ReactAttributes from '../dom/attributes/ReactAttributes';
import type { Attributes } from '../interfaces';

import isValidTagOrAttributeName from './isValidTagOrAttributeName';

/**
 * Returns the parsed attribute value taking into account things like boolean attributes
 *
 * @param {string} attribute The name of the attribute
 * @param {string} value The value of the attribute from the HTML
 * @returns {string} The parsed attribute value
 */
const getParsedAttributeValue = (attribute: string, value: string): string => {
  // if the attribute is a boolean then it's value should be the same as it's name
  // e.g. disabled="disabled"
  const lowerBooleanAttributes = BooleanAttributes.map((attr) => attr.toLowerCase());
  if (lowerBooleanAttributes.includes(attribute.toLowerCase())) {
    value = attribute;
  }

  return value;
};

/**
 * Takes an object of standard HTML property names and converts them to their React counterpart. If the react
 * version does not exist for an attribute then just use it as it is
 *
 * @param {Attributes} attributes The HTML attributes to convert
 * @returns {Attributes} The React attributes
 */
const htmlAttributesToReact = (attributes: Attributes): Attributes => {
  return Object.keys(attributes)
    .filter((attr) => isValidTagOrAttributeName(attr))
    .filter((attr) => !(EventAttributes as ReadonlyArray<string>).includes(attr))
    .reduce((mappedAttributes: Attributes, attribute) => {
      // lowercase the attribute name and find it in the react attribute map
      const lowerCaseAttribute = attribute.toLowerCase();

      // format the attribute name
      const name = ReactAttributes[lowerCaseAttribute as ReactAttribute] || lowerCaseAttribute;

      // add the parsed attribute value to the mapped attributes
      mappedAttributes[name] = getParsedAttributeValue(name, attributes[attribute]);

      return mappedAttributes;
    }, {});
};

export default htmlAttributesToReact;
