import { AllComponents, Component } from 'src/view/component';

export function findComponents(
  component: AllComponents,
  name: string,
): Component<any>[] {
  if (typeof component === 'string') {
    return [];
  }

  const components = component.props.name.includes(name) ? [component] : [];

  return components.concat(
    ...component.props.children.map(component =>
      findComponents(component, name),
    ),
  );
}
