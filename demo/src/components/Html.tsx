import ReactHtmlParser from '@orrisroot/react-html-parser';

import data, { ExampleKey } from '../data';

interface HtmlProps {
  html: string;
  selectedExample: ExampleKey;
}

export default function Html(props: HtmlProps) {
  const { html, selectedExample } = props;
  const options = data[selectedExample].options;
  return <div id="html">{ReactHtmlParser(html, options)}</div>;
}
