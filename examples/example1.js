function MyComponent(_ref) {
  var text = _ref.text;

  return React.createElement(
    "span",
    null,
    text
  );
}

var component = debut.createComponentFromReact(React.createElement(
  "div",
  null,
  React.createElement(MyComponent, { text: "Hello", name: "one" }),
  ", ",
  React.createElement(MyComponent, { text: "world", name: "two" })
));

var actions = debut.createActions(debut.action(debut.findComponents(component, 'one'), function () {
  return { text: 'Goodbye' };
}), debut.action(debut.findComponents(component, 'two'), function () {
  return { text: 'Monkey' };
}), [debut.action(debut.findComponents(component, 'one'), function () {
  return { text: 'Change' };
}), debut.action(debut.findComponents(component, 'two'), function () {
  return { text: 'Together' };
})]);

ReactDOM.render(React.createElement(debut.Presentation, { actions: actions, root: component }), document.getElementById('root'));

