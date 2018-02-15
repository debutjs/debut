import React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Component, ComponentProps } from './component';

export default class ViewComponent<P> extends React.Component<
  ComponentProps<P>,
  { componentState: P }
> {
  private subscription: Subscription | null = null;

  constructor(props: ComponentProps<P>) {
    super(props);
    this.state = {
      componentState: props.state$.getValue(),
    };
  }

  componentWillMount() {
    this.subscription = this.props.state$.subscribe(componentState =>
      this.setState({ componentState }),
    );
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    return React.createElement(
      this.props.viewComponent,
      this.state.componentState,
      ...this.props.children,
    );
  }
}
