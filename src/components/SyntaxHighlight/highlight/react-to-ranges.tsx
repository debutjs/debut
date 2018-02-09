export interface ComponentWithRange {
  type: React.ReactType;
  props: { children?: any };
  children: (ComponentWithRange | number)[];
}

interface ExtractedRanges {
  text: string;
  ranges: (ComponentWithRange | number)[];
}

interface NecessaryReactComponent {
  type: any;
  props: { children?: (NecessaryReactComponent | string)[] };
}

type AcceptedChild = NecessaryReactComponent | string;
export type AcceptedChildren = AcceptedChild | AcceptedChild[] | null | undefined;

function normalizeArray<T>(array: T | T[] | null | undefined) {
  return array ?
    (Array.isArray(array) ? array : [array]) :
    [];
}

export function extractRangesAndTextFromReactComponents(components: AcceptedChildren, startOfRange = 0): ExtractedRanges {
  let rangeAt = startOfRange;
  let text = '';
  let ranges: (ComponentWithRange | number)[] = [];

  const normalizedChildren = normalizeArray(components);

  for (const component of normalizedChildren) {
    if (typeof component === 'string') {
      text = text + component;
      rangeAt = rangeAt + component.length;
      ranges.push(component.length);
    } else {
      const { ranges: innerRanges, text: innerText } = extractRangesAndTextFromReactComponents(component.props.children, rangeAt);
      text = text + innerText;
      rangeAt = rangeAt + innerText.length;
      ranges.push({
        type: component.type,
        props: component.props,
        children: innerRanges,
      });
    }
  }

  return {
    text,
    ranges,
  };
}

export function stringifyReactComponents(components: AcceptedChildren): string {
  if (typeof components === 'string') {
    return components;
  }

  return normalizeArray(components).map(stringifyReactComponents).join('');
}