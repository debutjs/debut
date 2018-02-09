import ActionQueue, { StateReducer, Action } from 'src/state/ActionQueue';
import { Component } from 'src/view/component';
import { findComponents } from './find-component';
import { createActionQueueWithMemory } from './action-queue-memory';

type NestedAction = StateReducer<any> | StateReducer<any>[];
type NestedReducer = NestedAction[] | NestedAction;

function flattenAction(action: NestedAction[]) {
  return action
    .map(action => {
      if (Array.isArray(action)) {
        return action;
      }

      return [action];
    })
    .reduce((previous, current) => previous.concat(current), []);
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
  return actions.map(action => {
    if (Array.isArray(action)) {
      return flattenAction(action);
    }

    return [action];
  });
}

function createActions(...actions: NestedReducer[]) {
  return createActionQueueWithMemory(normalizeActions(actions));
}

function action<P extends object>(
  components: Component<P>[],
  reducer: (old: P) => P,
): Action {
  return components.map(component => ({ state$: component.state$, reducer }));
}

type CreateActionHelper = (
  component: string | Component<any>[],
  reducer: (old: object) => object,
) => Action;

export function actionsForComponent<P>(
  component: Component<P>,
  actionCreator: (action: CreateActionHelper) => Action[],
) {
  const createActionHelper: CreateActionHelper = (
    componentsOrName,
    reducer,
  ) => {
    const components =
      typeof componentsOrName === 'string'
        ? findComponents(component, componentsOrName)
        : componentsOrName;

    return action(components, reducer);
  };

  return createActions(...actionCreator(createActionHelper));
}
