import { useState } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Shadertoy } from "../../../index";
// import { ShadertoyCanvas } from "../../../index";

// Example shaders
const SIMPLE_SHADER = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec3 col = vec3(uv.x, uv.y, 0.5 + 0.5 * sin(iTime));
    fragColor = vec4(col, 1.0);
}
`;

const ANIMATED_CIRCLES = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float d = length(uv);
    float r = 0.3 + 0.2 * sin(iTime * 2.0);

    float circle = smoothstep(r + 0.02, r, d);
    float ring = smoothstep(r + 0.1, r + 0.08, d) - smoothstep(r + 0.02, r, d);

    vec3 color = vec3(0.2, 0.4, 0.8) * circle;
    color += vec3(0.8, 0.2, 0.4) * ring;

    // Add some sparkle
    float sparkle = sin(uv.x * 10.0 + iTime) * sin(uv.y * 10.0 + iTime);
    color += 0.1 * sparkle * sparkle;

    fragColor = vec4(color, 1.0);
}
`;

const PLASMA = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float time = iTime * 0.5;

    float v = 0.0;
    v += sin((uv.x + time));
    v += sin((uv.y + time) / 2.0);
    v += sin((uv.x + uv.y + time) / 2.0);

    vec2 c = uv + vec2(sin(time / 3.0), cos(time / 2.0));
    v += sin(sqrt(c.x * c.x + c.y * c.y + 1.0) + time);

    v = v / 4.0;

    vec3 col = vec3(sin(v * 3.14159), sin(v * 3.14159 + 2.0), sin(v * 3.14159 + 4.0));
    col = col * 0.5 + 0.5;

    fragColor = vec4(col, 1.0);
}
`;

const shaderExamples = [
    { name: "Animated Circles", code: ANIMATED_CIRCLES },
    { name: "Plasma", code: PLASMA },
    { name: "Simple UV", code: SIMPLE_SHADER },
];

function ShaderDemo() {
    const [currentShaderIndex, setCurrentShaderIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [startTime] = useState(Date.now());

    const currentShader = shaderExamples[currentShaderIndex];

    const handleTogglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        // Force re-render by updating key
        window.location.reload();
    };

    const handleNextShader = () => {
        setCurrentShaderIndex((prev) => (prev + 1) % shaderExamples.length);
    };

    return (
        <div className="card-container">
            <h2 className="card-title">React Shadertoy Demo</h2>

            <div className="shader-info">
                <h3>{currentShader.name}</h3>
                <p>
                    Shader {currentShaderIndex + 1} of {shaderExamples.length}
                </p>
            </div>

            <div className="shader-view-container">
                <Canvas
                    orthographic={true}
                    resize={{
                        scroll: true,
                        debounce: { scroll: 50, resize: 0 },
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Shadertoy fs={currentShader.code} />
                </Canvas>

                {/* <ShadertoyCanvas
                    fs={currentShader.code}
                    style={{
                        border: "2px solid #333",
                        borderRadius: "8px",
                    }}
                /> */}
            </div>

            <div className="button-row">
                <button
                    onClick={handleTogglePlayback}
                    title={isPlaying ? "Pause Shader" : "Play Shader"}
                >
                    {isPlaying ? <Pause /> : <Play />}
                </button>

                <button onClick={handleNextShader} title="Next Shader">
                    <SkipForward />
                </button>

                <button onClick={handleReset} title="Reset Timer">
                    <RotateCcw />
                </button>
            </div>
        </div>
    );
}

export default ShaderDemo;
