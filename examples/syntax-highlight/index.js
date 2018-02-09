ReactDOM.render(React.createElement(
  debut.SyntaxHighlight,
  { language: 'js' },
  React.createElement(
    'span',
    { style: { display: 'inline-block', transform: 'translatey(-20px)' } },
    '"use ',
    React.createElement(
      'span',
      { style: { display: 'inline-block', transform: 'translateY(20px)' } },
      'str'
    ),
    'ict"'
  ),
  '; \n',
  'function deep() { }'
), document.getElementById('root'));