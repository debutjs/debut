import * as React from 'react';

import { createComponent } from './view/component';

import * as component from './view/component';
export { component };

export { default as createComponentFromReact } from './helper/component-from-react';
export { default as mergeState } from './helper/merge-state';
export * from './helper/find-component';
export * from './helper/create-action';

export { default as ActionQueue } from './state/ActionQueue';
export { default as ViewComponent } from './view/ViewComponent';
export { default as Presentation } from './presentation/Presentation';

export * from './components';
