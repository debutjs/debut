declare module 'react-container-dimensions' {
  import { ComponentType } from 'react';

  export interface Dimensions {
    width: number;
    height: number;
  }
  const ContainerDimensions: ComponentType<{
    children: (dimensions: Dimensions) => void;
  }>;

  export default ContainerDimensions;
}
