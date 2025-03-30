/**
 * ShaderToy Component
 *
 * Core component that renders ShaderToy shaders.
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

import React, { useRef, useState, useEffect } from 'react';
import { ShaderMaterial, Color, Texture } from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber/native';
import { OrthographicCamera } from '@react-three/drei/native';

// Import texture definitions and utilities
import type { TextureProps } from './textures';
import { createTextureUniforms } from './textures';

// Register ShaderMaterial with React Three Fiber
extend({ ShaderMaterial });

/**
 * ShaderToy Built-in Uniforms
 */
const UNIFORM_TIME = "iTime";
const UNIFORM_TIMEDELTA = "iTimeDelta";
const UNIFORM_DATE = "iDate";
const UNIFORM_FRAME = "iFrame";
const UNIFORM_MOUSE = "iMouse";
const UNIFORM_RESOLUTION = "iResolution";
const UNIFORM_CHANNEL = "iChannel";
const UNIFORM_CHANNELRESOLUTION = "iChannelResolution";
const UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";

// Precision values for GLSL
const PRECISIONS = ["lowp", "mediump", "highp"];

// Fragment shader wrappers
const SHADERTOY_COMMON_FUNCTIONS = `
// HSV to RGB conversion
vec3 hsv(float h, float s, float v) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
  return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
}
`;

const FS_MAIN_IMAGE_WRAPPER = `
void main(void) {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}
`;

const FS_DIRECT_WRAPPER = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 FC = fragCoord;
  vec2 r = iResolution.xy;
  float t = iTime;
  vec4 o = vec4(0.0, 0.0, 0.0, 1.0);
  // ------------------------------
  // processed direct shader code
  // ------------------------------
%SHADER_CODE%
  // ------------------------------
  fragColor = o;
}
`;

const BASIC_VS = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const BASIC_FS = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;
    vec3 col = vec3(1,1,1);
    fragColor = vec4(col,1.0);
}
`;

interface Uniform {
  type: string;
  value: number | number[];
}

export interface ShaderToyProps {
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

export function ShaderToy({
  fs = BASIC_FS,
  vs = BASIC_VS,
  textures = [],
  uniforms = {},
  clearColor = null,
  precision = "highp",
  width,
  height,
  devicePixelRatio = 1,
}: ShaderToyProps) {
  const { size: { width: useWidth, height: useHeight }, scene, gl } = useThree();
  const actualWidth = width || useWidth;
  const actualHeight = height || useHeight;
  const shaderRef = useRef<ShaderMaterial>(null);

  const [frameCount, setFrameCount] = useState(0);
  const [startTime] = useState(Date.now() / 1000);
  const lastFrameTimeRef = useRef(0);
  const [mousePosition] = useState([0, 0, 0, 0]);
  const [loadedTextures, setLoadedTextures] = useState<(Texture | null)[]>([]);

  useEffect(() => {
    import('./textures').then(({ createCheckerTexture }) => {
      const checkerTexture = createCheckerTexture(
        256,
        8,
        [255, 0, 0, 255],
        [0, 255, 255, 255]
      );
      setLoadedTextures([checkerTexture]);
    });
    return () => {
      loadedTextures.forEach(texture => texture?.dispose());
    };
  }, []);

  // Helper function to initialize uninitialized variables of a given type
  const initializeVariables = (
    body: string,
    type: string,
    initializer: string
  ): string => {
    return body.replace(
      new RegExp(`(${type}\\s+([a-zA-Z_]\\w*(?:\\s*,\\s*[a-zA-Z_]\\w*(?:\\s*=\\s*[^;]+?)?)*)\\s*;)`, 'g'),
      (decl: string, fullDecl: string, varList: string): string => {
        console.log(`Found uninitialized ${type} variables`);
        const vars: string[] = [];
        let currentVar: string = '';
        let parenDepth: number = 0;
        let inInitializer: boolean = false;

        for (let i = 0; i < varList.length; i++) {
          const char = varList[i];
          if (char === '(') parenDepth++;
          if (char === ')') parenDepth--;
          if (char === '=' && parenDepth === 0) inInitializer = true;

          if (char === ',' && parenDepth === 0 && !inInitializer) {
            const trimmed = currentVar.trim();
            vars.push(trimmed.includes('=') ? trimmed : `${trimmed}=${initializer}`);
            currentVar = '';
            inInitializer = false;
          } else {
            currentVar += char;
          }
        }
        if (currentVar) {
          const trimmed = currentVar.trim();
          vars.push(trimmed.includes('=') ? trimmed : `${trimmed}=${initializer}`);
        }

        return `${type} ${vars.join(', ')};`;
      }
    );
  };

  /**
   * Process shader code for compatibility with Three.js
   *
   * This function prepares the shader code for use with WebGL/Three.js by:
   * 1. Setting the GLSL precision
   * 2. Detecting the shader format (with main, with mainImage, or direct format)
   * 3. Adding necessary wrappers around the code
   * 4. Adding uniform declarations
   */
  const processShader = (shaderCode: string): string => {
    const isValidPrecision = PRECISIONS.includes(precision);
    const precisionString = `precision ${isValidPrecision ? precision : "highp"} float;\n`;
    const dprString = `#define DPR ${devicePixelRatio.toFixed(1)}\n`;


    // Check if shader is in direct format
    const hasMain = shaderCode.includes("void main(");
    const hasMainImage = shaderCode.includes("void mainImage(");
    const isLikelyDirectFormat = !hasMain && !hasMainImage;

    let wrappedCode = shaderCode;
    if (isLikelyDirectFormat) {
      wrappedCode = FS_DIRECT_WRAPPER.replace('%SHADER_CODE%', shaderCode);
    }

    let processedCode = wrappedCode;

    // Fix uninitialized loop variables with float declaration
    processedCode = processedCode.replace(
      /for\s*\(\s*float\s+(\w+)\s*;\s*([^;]+);([^)]+)\)/g,
      (match, varName, condition, increment) => {
        if (!condition.includes('=')) {
          return `for(float ${varName}=0.;${condition};${increment})`;
        }
        return match;
      }
    );

    // Fix uninitialized loop variables without float declaration
    processedCode = processedCode.replace(
      /for\s*\(\s*;\s*([^;]+);([^)]+)\)/g,
      (match, condition, increment) => {
        const varNameMatch = condition.match(/(\w+)\s*(\+\+|\-\-|<|>|<=|>=|==|!=)/);
        if (varNameMatch && !condition.includes('=')) {
          const varName = varNameMatch[1];
          return `for(float ${varName}=0.;${condition};${increment})`;
        }
        return match;
      }
    );

    // Fix mat2(cos(...+vec4(...))) to preserve ShaderToy behavior
    processedCode = processedCode.replace(
      /mat2\s*\(\s*cos\s*\(\s*([^)]+)\+vec4\s*\(([^)]+)\)\s*\)\s*\)\s*(\*?\s*[0-9.]+)?/g,
      (match, expr, vec4Args, scale) => {
        const angleExpr = `${expr}+vec4(${vec4Args})`;
        const scaleFactor = scale ? scale.trim() : '';
        return `mat2(cos(${angleExpr})${scaleFactor})`; // Keep ShaderToy's vec4 matrix construction
      }
    );

    // Clamp all exp calls, multiple passes for nesting
    processedCode = processedCode.replace(
      /exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,
      (match, arg) => `exp(clamp(${arg}, -87.0, 87.0))`
    );
    processedCode = processedCode.replace(
      /exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,
      (match, arg) => `exp(clamp(${arg}, -87.0, 87.0))`
    );

    // Initialize out vec4 fragColor if not assigned before use
    let injections = [];
    if (processedCode.includes("out vec4 fragColor") && !processedCode.match(/\bfragColor\s*=/)) {
      injections.push("fragColor = vec4(0.);");
    }

    // Inject r and t if iResolution or iTime aren't used
    if (!processedCode.includes("iResolution")) {
      injections.push("vec2 r = iResolution.xy;");
    }
    if (!processedCode.includes("iTime")) {
      injections.push("float t = iTime;");
    }

    if (injections.length > 0) {
      processedCode = processedCode.replace(
        /void mainImage\s*\(\s*out vec4 fragColor[^)]*\)\s*{/,
        `$& ${injections.join(" ")}`
      );
    }

    // Initialize uninitialized float, vec2, vec3, and vec4 variables inside mainImage
    processedCode = processedCode.replace(
      /(void mainImage\s*\(\s*out vec4 fragColor[^)]*\)\s*{)([\s\S]*?)}/,
      (match: string, signature: string, body: string): string => {
        let updatedBody: string = body;
        // Process float declarations
        updatedBody = initializeVariables(updatedBody, 'float', '0.');
        // Process vec2 declarations
        updatedBody = initializeVariables(updatedBody, 'vec2', 'vec2(0.)');
        // Process vec3 declarations
        updatedBody = initializeVariables(updatedBody, 'vec3', 'vec3(0.)');
        // Process vec4 declarations
        updatedBody = initializeVariables(updatedBody, 'vec4', 'vec4(0.)');
        return `${signature}${updatedBody}}`;
      }
    );

    let finalCode = "";
    if (hasMain) {
      finalCode = precisionString + dprString + SHADERTOY_COMMON_FUNCTIONS + processedCode;
    } else if (hasMainImage) {
      finalCode = precisionString + dprString + SHADERTOY_COMMON_FUNCTIONS + processedCode + FS_MAIN_IMAGE_WRAPPER;
    } else {
      finalCode = precisionString + dprString + SHADERTOY_COMMON_FUNCTIONS + processedCode + FS_MAIN_IMAGE_WRAPPER;
    }

    finalCode = finalCode.replace(/texture\(/g, "texture2D(");

    const uniformsToAdd = [
      `uniform float ${UNIFORM_TIME};`,
      `uniform vec2 ${UNIFORM_RESOLUTION};`,
    ];
    if (finalCode.includes(UNIFORM_TIMEDELTA)) uniformsToAdd.push(`uniform float ${UNIFORM_TIMEDELTA};`);
    if (finalCode.includes(UNIFORM_FRAME)) uniformsToAdd.push(`uniform int ${UNIFORM_FRAME};`);
    if (finalCode.includes(UNIFORM_MOUSE)) uniformsToAdd.push(`uniform vec4 ${UNIFORM_MOUSE};`);
    if (finalCode.includes(UNIFORM_DATE)) uniformsToAdd.push(`uniform vec4 ${UNIFORM_DATE};`);
    if (finalCode.includes(UNIFORM_DEVICEORIENTATION)) uniformsToAdd.push(`uniform vec4 ${UNIFORM_DEVICEORIENTATION};`);
    for (let i = 0; i < textures.length; i++) {
      if (finalCode.includes(`${UNIFORM_CHANNEL}${i}`)) {
        uniformsToAdd.push(`uniform sampler2D ${UNIFORM_CHANNEL}${i};`);
      }
    }
    if (finalCode.includes(UNIFORM_CHANNELRESOLUTION) && textures.length > 0) {
      uniformsToAdd.push(`uniform vec3 ${UNIFORM_CHANNELRESOLUTION}[${textures.length}];`);
    }

    if (uniformsToAdd.length > 0) {
      const uniformsText = uniformsToAdd.join('\n') + '\n\n';
      const indexAfterPrecision = precisionString.length + dprString.length;
      finalCode = finalCode.substring(0, indexAfterPrecision) + uniformsText + finalCode.substring(indexAfterPrecision);
    }

    return finalCode;
  };

  const createUniforms = () => {
    const uniformsObj: Record<string, any> = {
      [UNIFORM_TIME]: { value: 0.0 },
      [UNIFORM_RESOLUTION]: { value: [actualWidth * devicePixelRatio, actualHeight * devicePixelRatio] },
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

    return uniformsObj;
  };

  const aspect = actualWidth / actualHeight;
  const planeWidth = aspect > 1 ? 2 * aspect : 2;
  const planeHeight = aspect > 1 ? 2 : 2 / aspect;

  useFrame(() => {
    if (!shaderRef.current) return;

    const currentTime = Date.now() / 1000 - startTime;
    const delta = lastFrameTimeRef.current ? currentTime - lastFrameTimeRef.current : 0;
    lastFrameTimeRef.current = currentTime;

    const material = shaderRef.current;
    const uniforms = material.uniforms;

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const seconds = d.getHours() * 60 * 60 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001;

    if (uniforms[UNIFORM_TIME]) uniforms[UNIFORM_TIME].value = currentTime;
    if (uniforms[UNIFORM_TIMEDELTA]) uniforms[UNIFORM_TIMEDELTA].value = delta;
    if (uniforms[UNIFORM_DATE]) uniforms[UNIFORM_DATE].value = [year, month, day, seconds];
    if (uniforms[UNIFORM_FRAME]) {
      uniforms[UNIFORM_FRAME].value = frameCount;
      setFrameCount(prev => prev + 1);
    }
    if (uniforms[UNIFORM_RESOLUTION]) uniforms[UNIFORM_RESOLUTION].value = [actualWidth * devicePixelRatio, actualHeight * devicePixelRatio];
    if (uniforms[UNIFORM_MOUSE]) uniforms[UNIFORM_MOUSE].value = mousePosition;
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

    const processedFS = processShader(fs);
    console.log('Processed Fragment Shader:\n', processedFS);

    shaderRef.current.fragmentShader = processedFS;
    shaderRef.current.vertexShader = vs;
    shaderRef.current.needsUpdate = true;
  }, [fs, vs, precision, devicePixelRatio, textures.length]);

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 5]}
        near={0.1}
        far={1000}
        left={-planeWidth / 2}
        right={planeWidth / 2}
        top={planeHeight / 2}
        bottom={-planeHeight / 2}
      />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vs}
          fragmentShader={fs}
          uniforms={createUniforms()}
        />
      </mesh>
    </>
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

export default ShaderToy;