const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_.\-\d]*$/;

const nameCache = {};

export default function isValidTagOrAttributeName(tagName) {
  if(tagName === 'constructor') {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(nameCache, tagName)) {
    nameCache[tagName] = VALID_TAG_REGEX.test(tagName);
  }
  return nameCache[tagName];
}
