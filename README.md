## Description

React-shadertoy is a lightweight component for using Shadertoy shaders in React and React Native applications. It provides two components - a `Shadertoy` component for embedding Shadertoy shaders on a plane in your own scene, and a `ShadertoyCanvas` component for showing Shadertoy shaders in their own canvas in your DOM tree.

## Installation

```bash
npm install @kortexa-ai/react-shadertoy
```

## Usage

```tsx
import { Shadertoy } from "@kortexa-ai/react-shadertoy";
```

### Shadertoy

The `Shadertoy` component is a React component that embeds a Shadertoy shader in a plane in your own scene. It takes a `fs` prop, which is the shader code to be embedded. You can also pass `vs` prop for an optional vertex shader.

```tsx
import { Shadertoy } from "@kortexa-ai/react-shadertoy";

function App() {
    return (
        <Canvas>
            <Shadertoy fs={SHADER_CODE} />
        </Canvas>
    );
}
```

### ShadertoyCanvas

\*\* NOTE: This component is currently disabled.

The `ShadertoyCanvas` component is a React component that embeds a Shadertoy shader in a canvas in your DOM tree. It takes a `fs` prop, which is the shader code to be embedded.

```tsx
import { ShadertoyCanvas } from "@kortexa-ai/react-shadertoy";

function App() {
    return <ShadertoyCanvas fs={SHADER_CODE} />;
}
```

## Develop

React-shadertoy supports both React 18, and React 19, as well as Expo v52 / React Native v0.76. because some of these have conflicting dependencies, you have to npm install with `--legacy-peer-deps`.

```bash
npm install --legacy-peer-deps
npm run build
```

## Troubleshooting

Don't forget to deduplicate Three.js and @react-three/fiber in your vite config:

```ts
resolve: {
    dedupe: [
        "react",
        "react-dom",
        "three",
        "@react-three/fiber",
        "@kortexa-ai/react-shadertoy"
    ]
}
```

---

© 2025 kortexa.ai
