import React from 'react';

export default function HTMLComponent({ elementType, children, ...passThroughProps }: React.HTMLProps<any> & { elementType: string }) {
  return React.createElement(elementType, passThroughProps, children);
}

export function htmlComponentForType(type: string): React.StatelessComponent<React.HTMLProps<any>> {
  return (props: React.HTMLProps<any>) =>
    <HTMLComponent elementType={type} {...props} />
}
