import { AllComponents, Component } from 'src/view/component';

export function findComponents(component: AllComponents, name: string): Component<any>[] {
  if (typeof component === 'string') {
    return [];
  }

  let components = component.name.includes(name) ? [component] : [];
  
  return components.concat(...(component.children.map(component => findComponents(component, name))));
}
