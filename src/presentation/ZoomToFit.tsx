import './ZoomToFit.css';
import * as React from 'react';
import Measure from 'react-measure';

type Dimensions = {
  width: number,
  height: number,
};

type Props = {
  innerDimensions: Dimensions,
  children?: JSX.Element[];
}

function dimensionsToScaleFactor({ width: innerWidth, height: innerHeight }: Dimensions, { width: outerWidth, height: outerHeight }: Dimensions) {
  const innerAspect = innerWidth / innerHeight;
  const outerAspect = outerWidth / outerHeight;

  if (innerAspect < outerAspect) {
    return outerHeight / innerHeight;
  }

  return outerWidth / innerWidth;
}

export default function ZoomToFit({ innerDimensions, children }: Props) {
  return (
    <Measure>
      {outerDimensions => (
        <div className="debut-ZoomToFit">
          <Measure>
            <div style={{transform: `scale(${dimensionsToScaleFactor(innerDimensions, outerDimensions)})`}} className="debut-ZoomToFit__toFit">
              {children}
            </div>
          </Measure>
        </div>
      )}
    </Measure>
  );
}
