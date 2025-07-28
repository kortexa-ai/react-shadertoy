/**
 * Shadertoy Built-in Uniforms
 */
export const UNIFORM_TIME = "iTime";
export const UNIFORM_TIMEDELTA = "iTimeDelta";
export const UNIFORM_DATE = "iDate";
export const UNIFORM_FRAME = "iFrame";
export const UNIFORM_MOUSE = "iMouse";
export const UNIFORM_RESOLUTION = "iResolution";
export const UNIFORM_CHANNEL = "iChannel";
export const UNIFORM_CHANNELRESOLUTION = "iChannelResolution";
export const UNIFORM_DEVICEORIENTATION = "iDeviceOrientation";

export const BASIC_VS = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const BASIC_FS = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;
    vec3 col = vec3(1,1,1);
    fragColor = vec4(col,1.0);
}
`;

// Precision values for GLSL
export const PRECISIONS = ["lowp", "mediump", "highp"];

// Fragment shader wrappers
export const SHADERTOY_COMMON_FUNCTIONS = `
// HSV to RGB conversion
vec3 hsv(float h, float s, float v) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
  return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
}
`;

export const FS_MAIN_IMAGE_WRAPPER = `
void main(void) {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}
`;

export const FS_DIRECT_WRAPPER = `
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
