import { highlight } from 'lowlight';
import * as React from 'react';

import {
  AcceptedChildren,
  extractRangesAndTextFromReactComponents,
  stringifyReactComponents,
  ComponentWithRange,
} from './react-to-ranges';
import {
  getRangeFromParsedAsts,
  lowlightAstToReactComponent,
} from './parse-highlight';

export function highlightReactComponents(
  components: AcceptedChildren,
  language: string,
): React.ReactNode[] {
  if (components == null) {
    return [];
  }

  const componentRanges = extractRangesAndTextFromReactComponents(components);
  const highlightedAst = highlight(language, componentRanges.text);

  let currentStart = 0;

  function interpretRanges(
    ranges: (ComponentWithRange | number)[],
  ): React.ReactNode[] {
    return ranges.map(item => {
      if (typeof item === 'number') {
        currentStart += item;
        return getRangeFromParsedAsts(
          currentStart - item,
          item,
          highlightedAst.value,
        ).map(lowlightAstToReactComponent);
      }

      let { children, ...props } = item.props;

      return React.createElement(
        item.type,
        props,
        ...interpretRanges(item.children),
      );
    });
  }

  return interpretRanges(componentRanges.ranges);
}

export { AcceptedChildren, stringifyReactComponents };
