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
    PRECISIONS,
    SHADERTOY_COMMON_FUNCTIONS,
    FS_MAIN_IMAGE_WRAPPER,
    FS_DIRECT_WRAPPER,
} from './constants';

// Helper function to initialize uninitialized variables of a given type
const initializeVariables = (
    body: string,
    type: string,
    initializer: string
): string => {
    return body.replace(
        new RegExp(`(${type}\\s+([a-zA-Z_]\\w*(?:\\s*,\\s*[a-zA-Z_]\\w*(?:\\s*=\\s*[^;]+?)?)*)\\s*;)`, 'g'),
        (_decl: string, _fullDecl: string, varList: string): string => {
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
export const processShader = (
    shaderCode: string,
    precision: string,
    devicePixelRatio: number,
    channels: number,
): string => {
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
            const varNameMatch = condition.match(/(\w+)\s*(\+\+|\-\-|<|>|<=|>=|==|!=)/); // eslint-disable-line no-useless-escape
            if (varNameMatch && !condition.includes('=')) {
                const varName = varNameMatch[1];
                return `for(float ${varName}=0.;${condition};${increment})`;
            }
            return match;
        }
    );

    // Fix mat2(cos(...+vec4(...))) to preserve Shadertoy behavior
    processedCode = processedCode.replace(
        /mat2\s*\(\s*cos\s*\(\s*([^)]+)\+vec4\s*\(([^)]+)\)\s*\)\s*\)\s*(\*?\s*[0-9.]+)?/g,
        (_match, expr, vec4Args, scale) => {
            const angleExpr = `${expr}+vec4(${vec4Args})`;
            const scaleFactor = scale ? scale.trim() : '';
            return `mat2(cos(${angleExpr})${scaleFactor})`; // Keep Shadertoy's vec4 matrix construction
        }
    );

    // Clamp all exp calls, multiple passes for nesting
    processedCode = processedCode.replace(
        /exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,
        (_match, arg) => `exp(clamp(${arg}, -87.0, 87.0))`
    );
    processedCode = processedCode.replace(
        /exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,
        (_match, arg) => `exp(clamp(${arg}, -87.0, 87.0))`
    );

    // Initialize out vec4 fragColor if not assigned before use
    const injections = [];
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
        (_match: string, signature: string, body: string): string => {
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
    for (let i = 0; i < channels; i++) {
        if (finalCode.includes(`${UNIFORM_CHANNEL}${i}`)) {
            uniformsToAdd.push(`uniform sampler2D ${UNIFORM_CHANNEL}${i};`);
        }
    }
    if (finalCode.includes(UNIFORM_CHANNELRESOLUTION) && channels > 0) {
        uniformsToAdd.push(`uniform vec3 ${UNIFORM_CHANNELRESOLUTION}[${channels}];`);
    }

    if (uniformsToAdd.length > 0) {
        const uniformsText = uniformsToAdd.join('\n') + '\n\n';
        const indexAfterPrecision = precisionString.length + dprString.length;
        finalCode = finalCode.substring(0, indexAfterPrecision) + uniformsText + finalCode.substring(indexAfterPrecision);
    }

    return finalCode;
};
