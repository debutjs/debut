import ActionQueue, { Action } from 'src/state/ActionQueue';
import ViewComponent from 'src/view/ViewComponent';
import { Component } from 'src/view/component';
import * as React from 'react';

interface Props {
  actionQueue: ActionQueue,
  root: Component<any>,
}

function handleKeyPress(actionQueue: ActionQueue) {
  return (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        actionQueue.goPreviousSafe();
        break;
      case 'ArrowRight':
        actionQueue.goNextSafe();
        break;
    }
  }
}

export default function Presentation({ actionQueue, root }: Props) {
  return (
    <div tabIndex={0} onKeyDown={handleKeyPress(actionQueue)}>
      <ViewComponent {...root} />
    </div>
  );
}
