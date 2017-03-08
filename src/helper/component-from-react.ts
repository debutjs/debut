import { htmlComponentForType } from 'src/components/HTMLComponent';
import { Component, DebutComponentProps, createComponent } from 'src/view/component';

function getDebutComponentTypeFromReactElement(element: React.ReactElement<any>) {
  if (typeof element.type === 'string') {
    return htmlComponentForType(element.type);
  }

  return element.type;
}

function isReactElement(test: any): test is React.ReactElement<any> {
  return (test.type !== undefined)
}

export default function createComponentFromReact(component: React.ReactElement<{ children?: (JSX.Element | string | number)[] } & DebutComponentProps>): Component<any> {
  const { name, ...props } = component.props;
  return createComponent({
    viewComponent: getDebutComponentTypeFromReactElement(component),
    initialState: props,
    children: (component.props.children || []).map(child => {
      if ((typeof child === 'number') || (typeof child === 'string')) {
        return `${child}`;
      }

      return createComponentFromReact(child);
    }),
    name: name,
  });
}
