import React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Component } from './component';

export default class ViewComponent<P> extends React.Component<Component<P>, { componentState: P }> {
  private subscription: Subscription | null = null;

  constructor(props: Component<P>) {
    super(props);
    this.state = {
      componentState: props.state$.getValue(),
    };
  }

  componentWillMount() {
    this.subscription = this.props.state$.subscribe((componentState) => this.setState({ componentState }));
  }

  componentWillUnmount() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const Component = this.props.component;

    return <Component {...this.state.componentState}>{this.props.children}</Component>
  }
}
