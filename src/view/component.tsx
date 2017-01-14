import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReactComponent } from './react-types';

interface ComponentDefinition<P> {
  viewComponent: ReactComponent<P & { children: ReactComponent<any>[] }>,
  initialState: P,
  children?: Array<Component<any>>,
};

export interface Component<P> {
  state$: BehaviorSubject<P>,
  viewComponent: ReactComponent<P>,
  children: Array<Component<any>>,
}

export function createComponent<P>({ viewComponent, initialState, children = [] } : ComponentDefinition<P>) {
  return {
    state$: new BehaviorSubject(initialState),
    viewComponent,
    children,
  };
}

export function pushStateToComponent<P>(component: Component<P>, state: P) {
  component.state$.next(state);
}
