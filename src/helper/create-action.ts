import ActionQueue, { StateReducer, Action } from 'src/state/ActionQueue';
import { Component } from 'src/view/component';

type NestedAction = StateReducer<any> | StateReducer<any>[];
type NestedReducer = (StateReducer<any> | StateReducer<any>[])[] | NestedAction;

function flattenAction(action: NestedAction[]) {
  return action.map(action => {
    if (Array.isArray(action)) {
      return action;
    }

    return [action];
  }).reduce((previous, current) => previous.concat(current), []);
}

/**
 * Takes an array of actions or arrays of actions:
 * 
 * [
 *   [Reducer],
 *   [[Recuder, Reducer], Reducer],
 *   Reducer,
 * ]
 * 
 * And returns an array of _just_ actions
 * 
 * [
 *   [Reducer],
 *   [Reducer, Reducer, Reducer],
 *   [Reducer],
 * ]
 */
function normalizeActions(actions: NestedReducer[]) {
  return actions.map((action) => {
    if (Array.isArray(action)) {
      return flattenAction(action);
    }

    return [action];
  })
}

export function createActions(...actions: NestedReducer[]) {
  return new ActionQueue(normalizeActions(actions));
}

export function action<P extends object>(components: Component<P>[], reducer: (old: P) => P): Action {
  return components.map(component => ({ state$: component.state$, reducer }));
}
