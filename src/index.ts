import * as htmlparser2 from 'htmlparser2';
import HtmlParser from './HtmlParser';

export { default as convertNodeToElement } from './convertNodeToElement';
export { default as processNodes } from './processNodes';
// expose htmlparser2 so it can be used if required
export { htmlparser2 };

export default HtmlParser;
