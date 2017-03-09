function MyComponent(_ref) {
  var text = _ref.text;

  return React.createElement(
    "span",
    null,
    text
  );
}

var component = debut.createComponentFromReact(React.createElement(
  debut.Slider,
  { name: "slide" },
  React.createElement(
    "div",
    null,
    React.createElement(MyComponent, { text: "Hello", name: "one" }),
    ", ",
    React.createElement(MyComponent, { text: "world", name: "two" })
  ),
  React.createElement(
    "div",
    null,
    React.createElement(
      debut.Transform,
      { x: 30, style: { transition: '1s' }, name: "mover" },
      "Hello!"
    )
  )
));

var actions = debut.actionsForComponent(component, function (action) {
  return [action('one', debut.mergeState({ text: 'Goodbye' })), action('two', debut.mergeState({ text: 'Monkey' })), [action('one', debut.mergeState({ text: 'Change' })), action('two', debut.mergeState({ text: 'Together' }))], action('slide', debut.Slider.advance()), action('mover', debut.Transform.move({ x: 50, y: 20 }))];
});

ReactDOM.render(React.createElement(debut.Presentation, { actions: actions, root: component }), document.getElementById('root'));

