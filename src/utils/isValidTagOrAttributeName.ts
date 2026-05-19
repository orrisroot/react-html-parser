const VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_.\-\d]*$/;

const nameCache: { [key: string]: boolean } = {};

const isValidTagOrAttributeName = (tagName: string) => {
  if (tagName === 'constructor') {
    return false;
  }

  if (!Object.hasOwn(nameCache, tagName)) {
    nameCache[tagName] = VALID_TAG_REGEX.test(tagName);
  }
  return nameCache[tagName];
};

export default isValidTagOrAttributeName;
