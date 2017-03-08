import { AllComponents, Component } from 'src/view/component';

export function findComponent(component: AllComponents, name: string): Component<any> | null {
  const components = findComponents(component, name);

  if (components.length === 0) {
    return null;
  }

  return components[0];
}

export function findComponents(component: AllComponents, name: string): Component<any>[] {
  if (typeof component === 'string') {
    return [];
  }

  let components = component.name ? [component] : [];
  
  return components.concat(...(component.children.map(component => findComponents(component, name))));
}
