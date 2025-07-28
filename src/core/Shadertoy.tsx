/**
 * Shadertoy Component
 *
 * Core component that renders Shadertoy shaders.
 * This component requires a React Three Fiber Canvas parent to work.
 *
 * === Implementation Notes ===
 *
 * This component is a work in progress with several features that still need implementation:
 *
 * 1. Touch/Mouse Interaction: Need to implement handlers to update the iMouse uniform
 * 2. Texture Support: The logic is in textures.ts but disabled due to React Native compatibility issues
 * 3. Device Orientation: Need to connect to device sensors
 * 4. Video/Webcam Textures: Need to handle animated texture sources
 *
 * See TODO comments throughout the code for more specific details on each item.
 */

import { useRef, useState, useEffect } from 'react';
import { ShaderMaterial, Color, type Texture, type Mesh, type OrthographicCamera as ThreeOrthographicCamera } from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { processShader } from './shaderHelpers';

// Import texture definitions and utilities
import type { TextureProps } from './textures';
import { createCheckerTexture, createTextureUniforms } from './textures';

// Register ShaderMaterial with React Three Fiber
extend({ ShaderMaterial });

import {
  UNIFORM_TIME,
  UNIFORM_TIMEDELTA,
  UNIFORM_DATE,
  UNIFORM_FRAME,
  UNIFORM_MOUSE,
  UNIFORM_RESOLUTION,
  UNIFORM_CHANNEL,
  UNIFORM_CHANNELRESOLUTION,
  UNIFORM_DEVICEORIENTATION,
} from './constants';

const BASIC_VS = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BASIC_FS = `
uniform float ${UNIFORM_TIME};
uniform vec2 ${UNIFORM_RESOLUTION};

void main() {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 uv = gl_FragCoord.xy/${UNIFORM_RESOLUTION}.xy;
    vec3 col = vec3(1,1,1);
    gl_FragColor = vec4(col,1.0);
}
`;

interface Uniform {
  type: string;
  value: number | number[];
}

export interface ShadertoyProps {
  fs?: string;
  vs?: string;
  textures?: TextureProps[];
  uniforms?: Record<string, Uniform>;
  clearColor?: [number, number, number, number] | null;
  precision?: string;
  width?: number;
  height?: number;
  devicePixelRatio?: number;
}

export function Shadertoy({
  fs = BASIC_FS,
  vs = BASIC_VS,
  textures = [],
  uniforms = {},
  clearColor = null,
  precision = "highp",
  width,
  height,
  devicePixelRatio = 1,
}: ShadertoyProps) {
  const { size, scene, gl } = useThree();
  const shaderRef = useRef<ShaderMaterial>(null);

  const frameCountRef = useRef(0);
  const [startTime] = useState(Date.now() / 1000);
  const lastFrameTimeRef = useRef(0);
  const [mousePosition] = useState([0, 0, 0, 0]);
  const [loadedTextures, setLoadedTextures] = useState<(Texture | null)[]>([]);

  useEffect(() => {
    const checkerTexture = createCheckerTexture(
      256,
      8,
      [255, 0, 0, 255],
      [0, 255, 255, 255]
    );
    setLoadedTextures([checkerTexture]);

    return () => {
      loadedTextures.forEach(texture => texture?.dispose());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Create uniforms once using useRef to prevent recreation on resize
  const shaderUniformsRef = useRef<Record<string, { value: number | number[] | Texture | null }> | null>(null);

  // Initialize uniforms only once
  if (!shaderUniformsRef.current) {
    const uniformsObj: Record<string, { value: number | number[] | Texture | null }> = {
      [UNIFORM_TIME]: { value: 0.0 },
      [UNIFORM_RESOLUTION]: { value: [0, 0] },
    };

    if (fs.includes(UNIFORM_TIMEDELTA)) uniformsObj[UNIFORM_TIMEDELTA] = { value: 0.0 };
    if (fs.includes(UNIFORM_DATE)) uniformsObj[UNIFORM_DATE] = { value: [0, 0, 0, 0] };
    if (fs.includes(UNIFORM_FRAME)) uniformsObj[UNIFORM_FRAME] = { value: 0 };
    if (fs.includes(UNIFORM_MOUSE)) uniformsObj[UNIFORM_MOUSE] = { value: [0, 0, 0, 0] };
    if (fs.includes(UNIFORM_DEVICEORIENTATION)) uniformsObj[UNIFORM_DEVICEORIENTATION] = { value: [0, 0, 0, 0] };

    const textureUniforms = createTextureUniforms(loadedTextures, fs, UNIFORM_CHANNEL, UNIFORM_CHANNELRESOLUTION);
    Object.assign(uniformsObj, textureUniforms);

    if (uniforms) {
      Object.keys(uniforms).forEach(name => {
        if (fs.includes(name)) {
          uniformsObj[name] = { value: uniforms[name].value };
        }
      });
    }

    shaderUniformsRef.current = uniformsObj;
  }

  // Store size in ref to avoid dependency issues
  const sizeRef = useRef({ width: 0, height: 0 });
  sizeRef.current = { width: width || size.width, height: height || size.height };

  // Update uniforms and camera every frame
  useFrame(() => {
    if (!shaderRef.current || !cameraRef.current) return;

    const currentTime = Date.now() / 1000 - startTime;
    const delta = lastFrameTimeRef.current ? currentTime - lastFrameTimeRef.current : 0;
    lastFrameTimeRef.current = currentTime;

    const uniforms = shaderRef.current.uniforms;
    const currentWidth = sizeRef.current.width;
    const currentHeight = sizeRef.current.height;
    const aspect = currentWidth / currentHeight;

    // Update camera bounds to match aspect ratio
    if (aspect > 1) {
      cameraRef.current.left = -aspect;
      cameraRef.current.right = aspect;
      cameraRef.current.top = 1;
      cameraRef.current.bottom = -1;
    } else {
      cameraRef.current.left = -1;
      cameraRef.current.right = 1;
      cameraRef.current.top = 1 / aspect;
      cameraRef.current.bottom = -1 / aspect;
    }
    cameraRef.current.updateProjectionMatrix();

    // Update mesh geometry scale to match new aspect ratio
    if (meshRef.current) {
      const newScaleX = aspect > 1 ? aspect : 1;
      const newScaleY = aspect > 1 ? 1 : 1 / aspect;
      meshRef.current.scale.set(newScaleX, newScaleY, 1);
    }

    // Update uniforms
    if (uniforms[UNIFORM_TIME]) uniforms[UNIFORM_TIME].value = currentTime;
    if (uniforms[UNIFORM_TIMEDELTA]) uniforms[UNIFORM_TIMEDELTA].value = delta;
    if (uniforms[UNIFORM_RESOLUTION]) {
      uniforms[UNIFORM_RESOLUTION].value = [currentWidth * devicePixelRatio, currentHeight * devicePixelRatio];
    }
    if (uniforms[UNIFORM_FRAME]) {
      uniforms[UNIFORM_FRAME].value = frameCountRef.current;
      frameCountRef.current += 1;
    }
    if (uniforms[UNIFORM_MOUSE]) uniforms[UNIFORM_MOUSE].value = mousePosition;
    if (uniforms[UNIFORM_DATE]) {
      const d = new Date();
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const seconds = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001;
      uniforms[UNIFORM_DATE].value = [year, month, day, seconds];
    }
  });

  useEffect(() => {
    if (!scene || !gl) return;

    if (clearColor) {
      scene.background = new Color(clearColor[0], clearColor[1], clearColor[2]);
      gl.setClearAlpha(clearColor[3]);
    } else {
      scene.background = null;
      gl.setClearAlpha(0);
    }

    return () => {
      if (scene) scene.background = null;
      if (gl) gl.setClearAlpha(1);
    };
  }, [scene, gl, clearColor]);

  useEffect(() => {
    if (!shaderRef.current) return;

    try {
      const processedFS = processShader(fs, precision, devicePixelRatio, textures.length);
      shaderRef.current.fragmentShader = processedFS;
      shaderRef.current.vertexShader = vs;
      shaderRef.current.needsUpdate = true;
    } catch (error) {
      console.error('Shader processing error:', error);
    }
  }, [fs, vs, precision, devicePixelRatio, textures.length]);

  // Note: React Three Fiber automatically handles gl.setSize() via ResizeObserver
  // No manual intervention needed for viewport updates

  const cameraRef = useRef<ThreeOrthographicCamera>(null);

  const meshRef = useRef<Mesh>(null);

  return (
    <Suspense fallback={null}>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 5]}
        near={0.1}
        far={1000}
        left={-1}
        right={1}
        top={1}
        bottom={-1}
      />
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vs}
          fragmentShader={fs}
          uniforms={shaderUniformsRef.current}
        />
      </mesh>
    </Suspense>
  );
}

export const NearestFilter = 9728;
export const LinearFilter = 9729;
export const NearestMipMapNearestFilter = 9984;
export const LinearMipMapNearestFilter = 9985;
export const NearestMipMapLinearFilter = 9986;
export const LinearMipMapLinearFilter = 9987;
export const ClampToEdgeWrapping = 33071;
export const MirroredRepeatWrapping = 33648;
export const RepeatWrapping = 10497;

export default Shadertoy;