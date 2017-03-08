/// <reference path="types/index.d.ts" />

function MyComponent({ text }: { text: string } & debut.component.DebutComponentProps) {
  return <span>{ text }</span>;
}

const component = debut.createComponentFromReact(
  <div>
    <MyComponent text="Hello" name="one" />, <MyComponent text="world" />
  </div>
);

const actionQueue = new debut.ActionQueue([
  [{ state$: debut.findComponent(component, 'one').state$, reducer: () => ({ text: 'Goodbye' }) }],
]);

ReactDOM.render(React.createElement(debut.Presentation, {
  actionQueue,
  root: component,
}), document.getElementById('root'));
