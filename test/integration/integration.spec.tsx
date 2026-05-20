import HtmlParser, { convertNodeToElement, type DomNode, htmlparser2, type Options } from 'index';
import ReactDOMServer from 'react-dom/server';
import { describe, expect, it } from 'vitest';

const reactVersion = Number.parseInt(require('react/package.json').version.match(/^(\d+)\./)[1], 10);

function HtmlParserComponent({ html, options }: { html: string; options?: Record<string, unknown> }) {
  return <div>{HtmlParser(html, options)}</div>;
}

const test = (html: string, override: string | null = null, options: Options = {}) => {
  const actual = ReactDOMServer.renderToStaticMarkup(<HtmlParserComponent html={html} options={options} />);
  const expected = `<div>${(override === null && html) || override}</div>`;
  expect(actual).toBe(expected);
};

describe('Integration tests: ', () => {
  it('should render a simple element', () => {
    test('<div>test</div>');
  });

  it('should render multiple sibling elements', () => {
    test('<div>test1</div><span>test2</span><footer>test3</footer>');
  });

  it('should render nested elements', () => {
    test('<div><span>test1</span><div><ul><li>test2</li><li>test3</li></ul></div></div>');
  });

  it('should handle bad html', () => {
    test(
      '<div class=test>test<ul><li>test1<li>test2</ul><span>test</span></div>',
      '<div class="test">test<ul><li>test1</li><li>test2</li></ul><span>test</span></div>',
    );
  });

  it('should ignore doctype', () => {
    test('<!doctype html><div>test</div>', '<div>test</div>');
  });

  it('should ignore comments', () => {
    test('<div>test1</div><!-- comment --><div>test2</div>', '<div>test1</div><div>test2</div>');
  });

  it('should ignore script tags', () => {
    test('<script>alert(1)</script>', '');
  });

  it('should ignore event handlers', () => {
    test('<a href="#" onclick="alert(1)">test</a>', '<a href="#">test</a>');
  });

  it('should handle attributes', () => {
    test('<div class="test" id="test" aria-test="test" data-test="test">test</div>');
  });

  it('should handle inline styles', () => {
    // react 16 drops trailing semi commas from inline styles so we have to test for both
    const trailingSemiComma = reactVersion === 15 ? ';' : '';

    test(`<div style="border-radius:1px;background:red${trailingSemiComma}">test</div>`);
  });

  it('should ignore inline styles that are empty strings', () => {
    test('<div style="">test</div>', '<div>test</div>');
  });

  it('should not allow nesting of void elements', () => {
    test('<img><p>test</p></img>', '<img/><p>test</p>');
  });

  it('should convert boolean attribute values', () => {
    test('<input disabled>', '<input disabled=""/>');
    test('<input disabled="">', '<input disabled=""/>');
    test('<input disabled="disabled">', '<input disabled=""/>');
  });

  it('should decode html entities by default', () => {
    test('<span>&excl;</span>', '<span>!</span>');
  });

  it('should not decode html entities when the option is disabled', () => {
    test('<span>&excl;</span>', '<span>&amp;excl;</span>', {
      decodeEntities: false,
    });
  });

  describe('transform function', () => {
    it('should use the response when it is not undefined', () => {
      test('<span>test</span><div>another</div>', '<p>transformed</p><p>transformed</p>', {
        transform(_node: DomNode, index: number) {
          return <p key={index}>transformed</p>;
        },
      });
    });

    it('should not render elements and children when returning null', () => {
      test('<p>test<span>inner test<b>bold child</b></span></p>', '<p>test</p>', {
        transform(node: DomNode) {
          if (node.type === 'tag' && node.name === 'span') {
            return null;
          }
        },
      });
    });

    it('should allow modifying nodes', () => {
      test('<a href="/test">test link</a>', '<a href="/changed">test link</a>', {
        transform(node: DomNode, index: number) {
          node.attribs.href = '/changed';
          return convertNodeToElement(node, index);
        },
      });
    });

    it('should allow passing the transform function down to children', () => {
      const transform = (node: DomNode, index: number) => {
        if (node.type === 'tag') {
          if (node.name === 'ul') {
            node.attribs.class = 'test';
            return convertNodeToElement(node, index, transform);
          }
        }
        if (node.type === 'text') {
          return node.data.replace(/list/, 'changed');
        }
      };
      test('<ul><li>list 1</li><li>list 2</li></ul>', '<ul class="test"><li>changed 1</li><li>changed 2</li></ul>', {
        transform,
      });
    });
  });

  it('should not render invalid tags', () => {
    test('<div>test<test</div>', '<div>test</div>');
  });

  it('should not render invalid attributes', () => {
    test('<div test<="test" class="test">content</div>', '<div class="test">content</div>');
  });

  it('should preprocess nodes correctly', () => {
    test('<div>preprocess test</div>', '<div>preprocess test</div><div>preprocess test</div>', {
      preprocessNodes(nodes: DomNode[]) {
        return [...nodes, ...nodes];
      },
    });
  });

  it('should expose htmlparser2', () => {
    expect(htmlparser2).toBeDefined();
  });
});
