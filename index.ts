/**
 * ShaderToy components for React Native
 *
 * This module provides components for running ShaderToy shaders
 * in React Native using Three.js and React Three Fiber.
 */

import { ShaderToy, ShaderToyProps } from './src/ShaderToy';
import { ShaderToyCanvas, ShaderToyCanvasProps } from './src/native/ShaderToyCanvas';

// Export components
export { ShaderToy, ShaderToyCanvas };
export type { ShaderToyProps, ShaderToyCanvasProps };

// Re-export texture constants
export {
  NearestFilter,
  LinearFilter,
  NearestMipMapNearestFilter,
  LinearMipMapNearestFilter,
  NearestMipMapLinearFilter,
  LinearMipMapLinearFilter,
  ClampToEdgeWrapping,
  MirroredRepeatWrapping,
  RepeatWrapping
} from './src/ShaderToy';
