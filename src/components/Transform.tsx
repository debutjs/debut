import React from 'react';

export interface Props extends React.HTMLProps<any> {
  x?: number | string;
  y?: number | string;
  style?: object;
}

function numberToPixels(number: string | number): string {
  if (typeof number === 'number') {
    return `${number}px`;
  }

  return number;
}

function transformStyle({ x, y }: { x: string | number, y: string | number }) {
  return `translate(${numberToPixels(x)}, ${numberToPixels(y)})`;
}

function move ({ x, y }: { x?: number | string, y?: number | string }) {
  return (state: Props) => ({ ...state, x, y });
}

function Transform({ x = 0, y = 0, style = { }, ...passThrough}: Props) {
  return <div style={{...style, transform: transformStyle({ x, y })}} {...passThrough}/>
};

export default Object.assign(Transform, { move });
