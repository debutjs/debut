import * as React from 'react';

import ActionQueue, { ActionQueueOutOfBoundsError, createActionHistoryItem } from '../ActionQueue';
import { createComponent } from 'src/view/component';

function createActionQueueAndComponent() {
  const component = createComponent({
    viewComponent: () => (<div>Hello</div>),
    initialState: { x: 5, y: 5 }
  });

  const actionQueue = new ActionQueue([
    [ { state$: component.state$, reducer: ({ x, y }) => ({ x: x + 1, y }) } ],
    [ { state$: component.state$, reducer: ({ x, y }) => ({ x, y: y - 1 }) } ],
  ]);

  return { component, actionQueue };
}

describe('ActionQueue', () => {
  it('proceeds correctly', () => {
    const { component, actionQueue } = createActionQueueAndComponent();

    actionQueue.goNext();

    expect(component.state$.getValue()).toEqual({ x: 6, y: 5 });

    actionQueue.goNext();

    expect(component.state$.getValue()).toEqual({ x: 6, y: 4 });
  });

  it('reverses correctly', () => {
    const { component, actionQueue } = createActionQueueAndComponent();

    actionQueue.goNext();
    actionQueue.goNext();
    actionQueue.goPrevious();

    expect(component.state$.getValue()).toEqual({ x: 6, y: 5 });

    actionQueue.goPrevious();

    expect(component.state$.getValue()).toEqual({ x: 5, y: 5 });
  });

  it('throws exceptions when it proceeds too far', () => {
    const { actionQueue } = createActionQueueAndComponent();

    actionQueue.goNext();
    actionQueue.goNext();

    expect(() => {  
      actionQueue.goNext();
    }).toThrowError(ActionQueueOutOfBoundsError);
  });

  it('throws exceptions when it reverses too far', () => {
    const { actionQueue } = createActionQueueAndComponent();

    expect(() => {
      actionQueue.goPrevious();
    }).toThrowError(ActionQueueOutOfBoundsError);
  });
});
