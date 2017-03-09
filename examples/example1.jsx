function MyComponent({ text }) {
  return <span>{ text }</span>;
}

const component = debut.createComponentFromReact(
  <debut.Slider name="slide">
    <div><MyComponent text="Hello" name="one" />, <MyComponent text="world" name="two" /></div>
    <div>
      <debut.Transform x={30} style={{ transition: '1s' }} name="mover">Hello!</debut.Transform>
    </div>
  </debut.Slider>
);

const actions = debut.createActions(
  debut.action(debut.findComponents(component, 'one'), () => ({ text: 'Goodbye' })),
  debut.action(debut.findComponents(component, 'two'), () => ({ text: 'Monkey' })),
  [
    debut.action(debut.findComponents(component, 'one'), () => ({ text: 'Change' })),
    debut.action(debut.findComponents(component, 'two'), () => ({ text: 'Together' })),
  ],
  debut.action(debut.findComponents(component, 'slide'), debut.Slider.advance()),
  debut.action(debut.findComponents(component, 'mover'), debut.Transform.move({ x: 50, y: 20 })),
);

ReactDOM.render(<debut.Presentation actions={actions} root={component} />, document.getElementById('root'));
