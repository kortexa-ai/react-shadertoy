import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShaderPlaneProps {
	fragmentShader?: string;
	vertexShader?: string;
	uniforms?: Record<string, any>;
	position?: [number, number, number];
	scale?: [number, number, number];
}

// Default vertex shader - simple plane
const defaultVertexShader = `
	varying vec2 vUv;
	
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

// Default fragment shader - cyan-black color
const defaultFragmentShader = `
	uniform float time;
	varying vec2 vUv;
	
	void main() {
		// Simple cyan-black color for now
		gl_FragColor = vec4(0.0, 0.8, 0.8, 1.0);
	}
`;

export function ShaderPlane({
	fragmentShader = defaultFragmentShader,
	vertexShader = defaultVertexShader,
	uniforms = {},
	position = [0, 0, -2], // Behind the hands
	scale = [3, 2, 1], // About 2/3 to half the viewport
}: ShaderPlaneProps) {
	const materialRef = useRef<THREE.ShaderMaterial>(null);

	// Create the shader material
	const shaderMaterial = useMemo(() => {
		return new THREE.ShaderMaterial({
			uniforms: {
				time: { value: 0 },
				...Object.fromEntries(
					Object.entries(uniforms).map(([key, value]) => [key, { value }])
				),
			},
			vertexShader,
			fragmentShader,
		});
	}, [vertexShader, fragmentShader, uniforms]);

	// Animate time uniform
	useFrame((state) => {
		if (materialRef.current) {
			materialRef.current.uniforms.time.value = state.clock.elapsedTime;
		}
	});

	return (
		<mesh position={position} scale={scale}>
			<planeGeometry args={[1, 1]} />
			<primitive ref={materialRef} object={shaderMaterial} attach="material" />
		</mesh>
	);
}