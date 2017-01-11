import { Component, pushStateToComponent } from 'src/view/component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


interface StateReducer<P> {
  state$: BehaviorSubject<P>,
  reducer: (oldState: P) => P,
}

type Action = Array<StateReducer<any>>;

export interface ActionHistoryItem<P> {
  state$: BehaviorSubject<P>,
  oldState: P,
};

type ActionHistory = ActionHistoryItem<any>[];

export class ActionQueueOutOfBoundsError extends Error { }

export function createStateReducer<P>(stateReducer: StateReducer<P>): StateReducer<P> {
  return stateReducer;
}

export function createActionHistoryItem<P>(actionHistoryItem: ActionHistoryItem<P>) : ActionHistoryItem<P> {
  return actionHistoryItem;
}

export default class ActionQueue {
  private actions: Action[] = [];
  private actionHistory: ActionHistory[] = [];
  private actionIndex = 0;

  constructor(actions: Action[]) {
    this.actions = actions;
  }

  get length() {
    return this.actions.length;
  }

  next() {
    const action = this.actions[this.actionIndex];

    if (!action) {
      throw new ActionQueueOutOfBoundsError('ActionQueue is at end.');
    }

    this.actionHistory.push(
      action.map(({ state$ }) => ({ state$, oldState: state$.getValue() }))
    );

    action.forEach(({ state$, reducer }) => state$.next(reducer(state$.getValue())));

    this.actionIndex += 1;
  }

  previous() {
    const actionHistory = this.actionHistory.pop();

    if (!actionHistory) {
      throw new ActionQueueOutOfBoundsError('ActionQueue is at beginning.');
    }

    actionHistory.forEach(({ state$, oldState }) => state$.next(oldState));
  }
}

