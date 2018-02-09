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
        <span style={{ display: 'inline-block', transform: this.state.done ? 'translatey(-20px)' : 'none' }}>
          {`"use `}<span style={{ display: 'inline-block', transform: 'translateY(20px)' }}>str</span>ict"
        </span>{`; \n`}
        {`function ${this.state.done ? 'peep' : 'deep'}() { }`}
      </debut.SyntaxHighlight>
    )
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('root'),
);
