import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as React from 'react';

export interface ComponentDefinition<P> {
  viewComponent: React.ComponentType<P>;
  initialState: P;
  children?: AllComponents[];
  name?: string[];
};

export interface Component<P> {
  state$: BehaviorSubject<P>;
  viewComponent: React.ComponentType<P>;
  children: AllComponents[];
  name: string[];
}

export interface DebutComponentProps {
  name?: string;
}

export type AllComponents = Component<any> | string;

export function createComponent<P>(definition: ComponentDefinition<P>): Component<P> {
  return {
    state$: new BehaviorSubject(definition.initialState),
    viewComponent: definition.viewComponent,
    children: definition.children || [],
    name: definition.name || [],
  };
}

export function pushStateToComponent<P>(component: Component<P>, state: P) {
  component.state$.next(state);
}
