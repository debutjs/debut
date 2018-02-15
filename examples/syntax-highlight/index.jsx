class Example extends React.Component {
  constructor() {
    super();
    this.state = { };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ done: true })}, 2000);
  }

  render() {
    return (
      <debut.SyntaxHighlight language="js">
        {debut.SyntaxHighlight.format(f => [
          f`"use strict";`,
        ])}
      </debut.SyntaxHighlight>
    )
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root'),
);
