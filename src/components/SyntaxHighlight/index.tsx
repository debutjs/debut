import * as React from 'react';

import { createHighlighter, AcceptedChildren } from './highlight';
import './index.css';

interface Props {
  language: string;
}

export default class SyntaxHighlight extends React.Component<Props> {
  private highlight = createHighlighter();

  /**
   * A template tag to help with formatting text, e.g.
   *
   * format(f => [
   *   f`function cool${<span>()</span>}`,
   *   f`cool()`,
   * ])
   */
  static format(
    callback: (
      f: (
        strings: TemplateStringsArray,
        ...inputs: React.ReactNode[]
      ) => React.ReactNode,
    ) => React.ReactNode[],
  ): React.ReactFragment {
    function interweaveWithNewlines<T>(elements: T[]): (T | string)[] {
      const newElements: (T | string)[] = [];

      elements.forEach((element, index) => {
        newElements.push(element);
        if (index < elements.length - 1) {
          newElements.push('\n');
        }
      });

      return newElements;
    }

    return (
      <React.Fragment
        children={interweaveWithNewlines(
          callback((strings, ...inputs) => {
            if (strings.length === 0) {
              return null;
            }

            const children: React.ReactNode[] = [];
            inputs.forEach((input, index) => {
              children.push(strings[index], input);
            });
            children.push(strings[strings.length - 1]);

            return <React.Fragment children={children} />;
          }),
        )}
      />
    );
  }

  render() {
    return (
      <pre className="hljs debut-SyntaxHighlight">
        <code
          children={this.highlight(
            this.props.children as AcceptedChildren,
            this.props.language,
          )}
        />
      </pre>
    );
  }
}
