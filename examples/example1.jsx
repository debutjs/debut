function MyComponent({ text }) {
  return <span>{ text }</span>;
}

const component = debut.createComponentFromReact(
  <debut.Slider name="slide" direction="down">
    <div><MyComponent text="Hello" name="one yes" />, <MyComponent text="world" name="two yes" /></div>
    <div>
      <debut.Transform x={30} style={{ transition: '1s' }} name="mover">Hello!</debut.Transform>
      <img />
    </div>
  </debut.Slider>
);

const actions = debut.actionsForComponent(component, action => [
  action('one', debut.mergeState({ text: 'Goodbye' })),
  action('two', debut.mergeState({ text: 'Monkey' })),
  [
    action('one', debut.mergeState({ text: 'Change' })),
    action('two', debut.mergeState({ text: 'Together' })),
  ],
  action('yes', debut.mergeState({ text: 'Yes' })),
  action('slide', debut.Slider.advance()),
  action('mover', debut.Transform.move({ x: 50, y: 20 })),
]);

ReactDOM.render(<debut.Presentation actions={actions} root={component} />, document.getElementById('root'));
