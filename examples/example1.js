/// <reference path="types/index.d.ts" />
function MyComponent({ text }) {
    return React.createElement("span", null, text);
}
const component = debut.createComponentFromReact(React.createElement("div", null,
    React.createElement(MyComponent, { text: "Hello", name: "one" }),
    ", ",
    React.createElement(MyComponent, { text: "world" })));
const actionQueue = new debut.ActionQueue([
    [{ state$: debut.findComponent(component, 'one')[0].state$, reducer: () => ({ text: 'Goodbye' }) }],
]);
ReactDOM.render(React.createElement(debut.Presentation, {
    actionQueue,
    root: component,
}), document.getElementById('root'));
