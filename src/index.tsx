import * as React from 'react';

import { createComponent } from './view/component';

import * as componentImport from './view/component';
export const component = componentImport;

export { default as ActionQueue } from './state/ActionQueue';
export { default as ViewComponent } from './view/ViewComponent';

createComponent({ 
  component: ({  }) => <div>Hi {}</div>, 
  initialState: { },
  children: [ ],
});