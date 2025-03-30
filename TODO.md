# ShaderToy Component TODOs and Known Issues

## Known Issues

1. **Touch/Mouse Interaction**
   - Touch events are not yet implemented for React Native
   - The iMouse uniform receives position values but they're not updated from actual touch events
   - Need to implement proper touch handling that matches ShaderToy's conventions

2. **Texture Loading**
   - Texture loading functionality is incomplete
   - Need to implement proper loading of external textures for iChannel uniforms
   - Need to handle texture errors and loading states

3. **Performance**
   - Some complex ShaderToy shaders may cause performance issues on mobile devices
   - No automatic detection or fallback for low-performance devices

4. **Device Orientation**
   - iDeviceOrientation uniform is declared but not properly implemented
   - Need to connect to React Native's device orientation sensors

## Future Improvements

1. **Render-to-Texture Support**
   - Implement multi-pass rendering similar to ShaderToy's buffer system
   - Allow shaders to render to textures that can be consumed by other shaders

2. **Sound Support**
   - Add support for audio input and audio generation
   - Implement the audio-related ShaderToy uniforms

3. **WebCam/Camera Support**
   - Add support for device camera as an input texture
   - Implement proper permission handling for camera access

4. **Interactive Controls**
   - Add UI controls for shader parameters
   - Create a system for exposing shader uniforms as interactive controls

5. **Error Handling**
   - Improve shader compilation error reporting
   - Add fallback shaders for when compilation fails

6. **Optimization Features**
   - Add resolution scaling for performance control
   - Implement frame rate limiting options

7. **Preset System**
   - Create a system for saving and loading shader presets
   - Allow for easy sharing of configurations

8. **Touch Gesture Support**
   - Implement pinch-to-zoom, rotate, and other touch gestures
   - Map these to custom uniforms for shader interaction

## Implementation Notes

### Texture Loading Approach
For texture loading, consider using React Native's Image component or a library like react-native-fast-image to preload textures and then pass them to the shader as iChannel uniforms.

### Touch Event Handling
For touch events, need to:
1. Map touch coordinates to ShaderToy's coordinate system (origin at bottom-left)
2. Track touch start position for iMouse.zw values
3. Implement multi-touch support if desired

### Performance Considerations
To improve performance:
1. Allow for dynamic resolution scaling
2. Implement a frame skip mechanism for complex shaders
3. Consider fallback to simpler shaders on low-end devices

### Ideal Directory Structure
```
/components
  /shadertoy
    /ShaderToyBackground.tsx  // Main component
    /ShaderToyScene.tsx       // Inner scene component
    /TextureLoader.tsx        // Texture loading utilities
    /TouchHandler.tsx         // Touch event handling
    /utils/                   // Utility functions
      shader-processor.ts     // Shader processing utilities
      uniform-helpers.ts      // Uniform creation and updating
    /types/                   // TypeScript type definitions
    /examples/                // Example shaders
    /presets/                 // Preset configurations
```