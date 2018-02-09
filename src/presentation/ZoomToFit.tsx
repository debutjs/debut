import './ZoomToFit.css';
import * as React from 'react';
import ContainerDimensions, { Dimensions } from 'react-container-dimensions';

type Props = {
  innerDimensions: Dimensions;
};

function dimensionsToScaleFactor(
  { width: innerWidth, height: innerHeight }: Dimensions,
  { width: outerWidth, height: outerHeight }: Dimensions,
) {
  const innerAspect = innerWidth / innerHeight;
  const outerAspect = outerWidth / outerHeight;

  if (innerAspect < outerAspect) {
    return outerHeight / innerHeight;
  }

  return outerWidth / innerWidth;
}

export default class ZoomToFit extends React.PureComponent<Props> {
  renderInside = (outerDimensions: Dimensions) => {
    return (
      <div
        style={{
          transform: `scale(${dimensionsToScaleFactor(
            this.props.innerDimensions,
            outerDimensions,
          )})`,
        }}
        className="debut-ZoomToFit__toFit"
      >
        {this.props.children}
      </div>
    );
  };

  render() {
    return (
      <div className="debut-ZoomToFit">
        <ContainerDimensions>{this.renderInside}</ContainerDimensions>
      </div>
    );
  }
}
