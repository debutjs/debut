import React from 'react';
import classnames from 'classnames';

import './Slider.css';
import Transform from './Transform';

export interface Props extends React.HTMLProps<any> {
  slideIndex?: number;
  children?: JSX.Element[];
  className?: string;
}

function Slider({ slideIndex = 0, className = '', children = [], ...passThrough}: Props) {
  return (
    <div className={classnames('debut-Slider', className)} {...passThrough}>
        {children.map((child, index) => <Transform x={`${-(slideIndex - index) * 100}%`} style={{ transition: 'transform 0.5s' }} key={index}>{child}</Transform>)}
    </div>
  );
};

function gotoSlide(slideIndex: number) {
  return (state: Props) => ({ ...state, slideIndex: slideIndex });
}

function advance(amount = 1) {
  return ({ slideIndex = 0, ...state }: Props) => ({ ...state, slideIndex: slideIndex + amount });
}

export default Object.assign(Slider, { gotoSlide, advance });
