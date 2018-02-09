import React from 'react';
import classnames from 'classnames';

import './Slider.css';
import Transform from './Transform';

type Direction = 'up' | 'down' | 'left' | 'right';

export interface Props extends React.HTMLProps<any> {
  slideIndex?: number;
  children?: JSX.Element[];
  className?: string;
  direction?: Direction;
}

function slideTransformForDirection(direction: Direction, slideIndex: number) {
  const percentage = `${(direction === 'up' || direction === 'left' ? -1 : 1) *
    slideIndex *
    100}%`;
  switch (direction) {
    case 'up':
    case 'down':
      return { y: percentage };
    case 'left':
    case 'right':
      return { x: percentage };
  }
}

function slideChild(child: JSX.Element, index: number, direction: Direction) {
  return (
    <Transform
      {...slideTransformForDirection(direction, -index)}
      className="debut-Slider__slide"
      key={index}
    >
      {child}
    </Transform>
  );
}

function Slider({
  slideIndex = 0,
  direction = 'left',
  className = '',
  children = [],
  ...passThrough
}: Props) {
  return (
    <div className={classnames('debut-Slider', className)} {...passThrough}>
      <Transform
        {...slideTransformForDirection(direction, slideIndex)}
        style={{ transition: 'transform 0.5s' }}
        className="debut-Slider__inner"
      >
        {children.map((child, index) => slideChild(child, index, direction))}
      </Transform>
    </div>
  );
}

function gotoSlide(slideIndex: number) {
  return (state: Props) => ({ ...state, slideIndex: slideIndex });
}

function advance(amount = 1) {
  return ({ slideIndex = 0, ...state }: Props) => ({
    ...state,
    slideIndex: slideIndex + amount,
  });
}

export default Object.assign(Slider, { gotoSlide, advance });
