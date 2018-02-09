import {
  highlightReactComponents,
  AcceptedChildren,
  stringifyReactComponents,
} from './highlight';

/**
 * Creates a memoized highlight function, so inputs that correspond to the same
 * text have the same input.
 */
export function createHighlighter() {
  let currentHighlight: {
    forChildren: AcceptedChildren;
    forText: string;
    node: React.ReactNode;
  } | null = null;

  return (children: AcceptedChildren, language: string) => {
    let forText: string | undefined;

    if (
      !currentHighlight ||
      (currentHighlight.forChildren !== children &&
        currentHighlight.forText !==
          (forText = stringifyReactComponents(children)))
    ) {
      currentHighlight = {
        forChildren: children,
        forText: forText!,
        node: highlightReactComponents(children, language),
      };
    }

    return currentHighlight.node;
  };
}

export { AcceptedChildren };
