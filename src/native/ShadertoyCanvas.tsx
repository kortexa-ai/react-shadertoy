/**
 * ShaderToyBackground Component
 *
 * A convenient wrapper that provides a Canvas for the ShaderToy component.
 */
import { Canvas, type CanvasProps } from '@react-three/fiber/native';
import { type ShadertoyProps } from '../core/Shadertoy';
import { Shadertoy } from '@/core/shaderHelpers';

// Props interface with added style property
export interface ShadertoyCanvasProps extends ShadertoyProps {
    style?: any;
    customProps?: Partial<CanvasProps>;
}

/*
Important! Do not remove these from the Canvas element,
or the underlying GLView will not render
style={{
    backgroundColor: 'black',
    shadowColor: 'black',
}}
gl={{
    debug: {
        checkShaderErrors: false,
        onShaderError: null,
    },
}}
*/

/**
 * ShadertoyCanvas Component
 *
 * Wraps the Shadertoy component with a Expo native Canvas, making it ready to use
 * without requiring a separate Canvas setup.
 */
export function ShadertoyCanvas({
    style = {},
    customProps = {},
    ...props
}: ShadertoyCanvasProps) {
    return (
        <Canvas
            orthographic={true}
            gl={{
                debug: {
                    checkShaderErrors: false,
                    onShaderError: null,
                },
                ...customProps.gl,
            }}
            style={{
                borderColor: 'black',
                shadowColor: 'black',
                width: '100%',
                height: '100%',
                ...style,
            }}
            {...customProps}
        >
            <Shadertoy {...props} />
        </Canvas>
    );
}

export default ShadertoyCanvas;