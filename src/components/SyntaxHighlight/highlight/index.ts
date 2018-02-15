import { highlight, lowlight } from 'lowlight';

import {
  reconcileRangesWithHighlightedAst,
  stringifyReactComponents,
} from './highlight';

import {
  extractRangesAndTextFromReactComponents,
  AcceptedChildren,
} from './react-to-ranges';

function createLowlightHighlighter() {
  let currentHighlight: {
    forLanguage: string;
    forText: string;
    ast: lowlight.HighlightResult;
  } | null = null;

  return (language: string, value: string) => {
    if (
      !currentHighlight ||
      currentHighlight.forLanguage !== language ||
      currentHighlight.forText !== value
    ) {
      currentHighlight = {
        forLanguage: language,
        forText: value,
        ast: highlight(language, value),
      };
    }

    return currentHighlight.ast;
  };
}

/**
 * Creates a memoized highlight function, so inputs that correspond to the same
 * text have the same input.
 */
export function createHighlighter() {
  let currentHighlight: {
    forChildren: AcceptedChildren;
    node: React.ReactNode;
  } | null = null;

  const lowlightHighlighter = createLowlightHighlighter();

  return (children: AcceptedChildren, language: string) => {
    if (!currentHighlight || currentHighlight.forChildren !== children) {
      const ranges = extractRangesAndTextFromReactComponents(children);

      currentHighlight = {
        forChildren: children,
        node: reconcileRangesWithHighlightedAst(
          ranges,
          lowlightHighlighter(language, ranges.text),
        ),
      };
    }

    return currentHighlight.node;
  };
}

export { AcceptedChildren };
