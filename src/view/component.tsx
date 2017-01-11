import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReactComponent } from './react-types';

interface ComponentDefinition<P> {
  component: ReactComponent<P & { children: ReactComponent<any>[] }>,
  initialState: P,
  children?: Array<Component<any>>,
};

export interface Component<P> {
  state$: BehaviorSubject<P>,
  component: ReactComponent<P>,
  children: Array<Component<any>>,
}

export function createComponent<P>({ component, initialState, children = [] } : ComponentDefinition<P>) {
  return {
    state$: new BehaviorSubject(initialState),
    component,
    children,
  };
}

export function pushStateToComponent<P>(component: Component<P>, state: P) {
  component.state$.next(state);
}
