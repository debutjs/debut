import ActionQueue, { Action } from 'src/state/ActionQueue';

const ACTION_SAVE_KEY = '__debut-action-index';

/**
 * Create an action queue that will keep its position between refreshes
 */
export function createActionQueueWithMemory(actions: Action[]) {
  let initialIndex = 0;

  if (window.localStorage) {
    const testItem = window.localStorage.getItem(ACTION_SAVE_KEY);

    if (testItem != null && !isNaN(parseInt(testItem))) {
      initialIndex = parseInt(testItem);
    }
  }

  const actionQueue: ActionQueue = new ActionQueue(actions);

  actionQueue.goTo(initialIndex);

  actionQueue
    .observe()
    .subscribe(index =>
      window.localStorage.setItem(ACTION_SAVE_KEY, `${index}`),
    );

  return actionQueue;
}
