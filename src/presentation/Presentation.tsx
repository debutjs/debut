import ActionQueue, { Action } from 'src/state/ActionQueue';
import ViewComponent from 'src/view/ViewComponent';
import { Component } from 'src/view/component';
import * as React from 'react';

import './Presentation.css';
import ZoomToFit from './ZoomToFit';

interface Props {
  actions: ActionQueue;
  root: Component<any>;
  size?: {
    width: number;
    height: number;
  };
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
  };
}

export default function Presentation({
  actions,
  root,
  size = { width: 1600, height: 900 },
}: Props) {
  return (
    <div
      tabIndex={0}
      className="debut-Presentation"
      onKeyDown={handleKeyPress(actions)}
    >
      <ZoomToFit innerDimensions={size}>
        <div className="debut-Presentation__inner" style={size}>
          <ViewComponent component={root} />
        </div>
      </ZoomToFit>
    </div>
  );
}
