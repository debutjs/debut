import React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Component } from './component';

type Props<P> = {
  component: Component<P>,
};

export default class ViewComponent<P> extends React.Component<Props<P>, { componentState: P }> {
  private subscription: Subscription | null = null;

  constructor(props: Props<P>) {
    super(props);
    this.state = {
      componentState: props.component.state$.getValue(),
    };
  }

  componentWillMount() {
    this.subscription = this.props.component.state$.subscribe((componentState) => this.setState({ componentState }));
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const Component = this.props.component.viewComponent;

    const renderedChildren = this.props.component.children.map(component => <ViewComponent component={component} />);

    return <Component {...this.state.componentState}>{renderedChildren}</Component>
  }
}
