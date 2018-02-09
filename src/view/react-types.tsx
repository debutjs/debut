import * as React from 'react';

export type FunctionComponent<P> = (props: P) => React.ReactElement<P>;
export type ClassComponent<P, S> = new () => React.Component<P, S>;
export type ReactComponent<P> =
  | React.ComponentClass<P>
  | React.StatelessComponent<P>;
