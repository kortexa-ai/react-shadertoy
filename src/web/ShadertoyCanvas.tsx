/**
 * ShaderToyBackground Component
 *
 * A convenient wrapper that provides a Canvas for the ShaderToy component.
 */
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Shadertoy, type ShadertoyProps } from '../core/Shadertoy';

// Props interface with added style property
export interface ShadertoyCanvasProps extends ShadertoyProps {
    style?: any;
    customProps?: Partial<CanvasProps>;
}

/**
 * ShadertoyCanvas Component
 *
 * Wraps the Shadertoy component with a Canvas, making it ready to use
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
                ...customProps.gl,
            }}
            style={{
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