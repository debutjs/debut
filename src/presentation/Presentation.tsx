import ActionQueue, { Action } from 'src/state/ActionQueue';
import ViewComponent from 'src/view/ViewComponent';
import { Component } from 'src/view/component';
import * as React from 'react';

import './Presentation.css';
import ZoomToFit from './ZoomToFit';

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
    <div tabIndex={0} className="debut-Presentation" onKeyDown={handleKeyPress(actionQueue)}>
      <ZoomToFit innerDimensions={{ width: 1600, height: 900 }}>
        <div className="debut-Presentation__inner" style={{ width: 1600, height: 900 }}>
          <ViewComponent component={root} />
        </div>
      </ZoomToFit>
    </div>
  );
}
