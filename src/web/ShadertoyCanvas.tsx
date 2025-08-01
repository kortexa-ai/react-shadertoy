/**
 * ShaderToyBackground Component
 *
 * A convenient wrapper that provides a Canvas for the ShaderToy component.
 */
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Shadertoy, type ShadertoyProps } from '../core/Shadertoy';

// Props interface with added style property
export interface ShadertoyCanvasProps extends ShadertoyProps {
    style?: React.CSSProperties;
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
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                ...customProps.gl,
            }}
            style={{
                width: '100%',
                height: '100%',
                ...style,
            }}
            resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
            {...customProps}
        >
            <Shadertoy {...props} />
        </Canvas>
    );
}

export default ShadertoyCanvas;