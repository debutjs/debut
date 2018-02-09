import * as React from 'react';

import { createHighlighter, AcceptedChildren } from './highlight';
import './index.css';

interface Props {
  language: string;
}

export default class SyntaxHighlight extends React.Component<Props> {
  highlight = createHighlighter();

  render() {
    return (
      <pre className="hljs debut-SyntaxHighlight">
        <code children={this.highlight(this.props.children as AcceptedChildren, this.props.language)} />
      </pre>
    );
  }
}
