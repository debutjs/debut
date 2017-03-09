function MyComponent({ text }) {
  return <span>{ text }</span>;
}

const component = debut.createComponentFromReact(
  <div>
    <MyComponent text="Hello" name="one" />, <MyComponent text="world" name="two" />
  </div>
);

const actions = debut.createActions(
  debut.action(debut.findComponents(component, 'one'), () => ({ text: 'Goodbye' })),
  debut.action(debut.findComponents(component, 'two'), () => ({ text: 'Monkey' })),
  [
    debut.action(debut.findComponents(component, 'one'), () => ({ text: 'Change' })),
    debut.action(debut.findComponents(component, 'two'), () => ({ text: 'Together' })),
  ]
);

ReactDOM.render(<debut.Presentation actions={actions} root={component} />, document.getElementById('root'))
