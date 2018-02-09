import React from 'react';

export default function HTMLComponent({
  elementType,
  children,
  ...passThroughProps
}: React.HTMLProps<any> & { elementType: string }) {
  // img elements and the like will complain if we pass anything as children
  // So if we have an empty array, we throw it away
  const sanitisedChildren =
    (Array.isArray(children) && children.length) === 0 ? undefined : children;
  return React.createElement(elementType, passThroughProps, sanitisedChildren);
}

export function htmlComponentForType(
  type: string,
): React.StatelessComponent<React.HTMLProps<any>> {
  return (props: React.HTMLProps<any>) => (
    <HTMLComponent elementType={type} {...props} />
  );
}
