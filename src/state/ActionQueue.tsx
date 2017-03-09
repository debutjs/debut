import { Component, pushStateToComponent } from 'src/view/component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface StateReducer<P> {
  state$: BehaviorSubject<P>,
  reducer: (oldState: P) => P,
}

export type Action = StateReducer<any>[];

interface ActionHistoryItem<P> {
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
  actions: Action[] = [];
  actionHistory: ActionHistory[] = [];
  actionIndex = 0;
  changes: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(actions: Action[]) {
    this.actions = actions;
  }

  get length() {
    return this.actions.length;
  }

  /**
   * Go to a particular action index
   */
  goTo(actionIndex: number) {
    while ((this.actionIndex < actionIndex) && (this.actionIndex < this.actions.length)) {
      this.goNext();
    }

    while ((this.actionIndex > actionIndex) && (this.actionIndex > 0)) {
      this.goPrevious();
    }
  }

  goNext() {
    const action = this.actions[this.actionIndex];

    if (!action) {
      throw new ActionQueueOutOfBoundsError('ActionQueue is at end.');
    }

    this.actionHistory.push(
      action.map(({ state$ }) => ({ state$, oldState: state$.getValue() }))
    );

    action.forEach(({ state$, reducer }) => state$.next(reducer(state$.getValue())));

    this.actionIndex += 1;

    this.sendChanges();
  }

  goPrevious() {
    const actionHistory = this.actionHistory.pop();

    if (!actionHistory) {
      throw new ActionQueueOutOfBoundsError('ActionQueue is at beginning.');
    }

    actionHistory.forEach(({ state$, oldState }) => state$.next(oldState));

    this.actionIndex -= 1;

    this.sendChanges();
  }

  goNextSafe() {
    if (this.actionIndex >= this.actions.length) {
      return;
    }

    this.goNext();
  }

  goPreviousSafe() {
    if (this.actionIndex <= 0) {
      return;
    }

    this.goPrevious();
  }

  observe() {
    return this.changes.asObservable();
  }

  sendChanges() {
    this.changes.next(this.actionIndex);
  }
}

