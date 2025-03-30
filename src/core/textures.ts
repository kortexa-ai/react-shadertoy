/**
 * Texture handling functions for ShaderToy
 * 
 * NOTE: This file contains the texture loading logic, but it's currently not being used
 * due to React Native compatibility issues. It's kept here for future implementation.
 */

import type { Texture, Wrapping, MagnificationTextureFilter, MinificationTextureFilter } from 'three';
import { TextureLoader, DataTexture, RGBAFormat, UnsignedByteType } from 'three';

/**
 * Create a simple checkered grid texture for testing
 * @param size Size of the texture (width and height)
 * @param gridSize Number of cells in the grid
 * @param color1 First color as [r, g, b, a] (values 0-255)
 * @param color2 Second color as [r, g, b, a] (values 0-255)
 * @returns A new DataTexture
 */
export function createCheckerTexture(
  size: number = 256,
  gridSize: number = 8,
  color1: number[] = [255, 255, 255, 255],
  color2: number[] = [0, 0, 0, 255]
): Texture {
  // Create data buffer
  const data = new Uint8Array(size * size * 4);
  const cellSize = size / gridSize;
  
  // Fill the texture with checkered pattern
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;
      
      // Determine which color to use based on position
      const cellX = Math.floor(x / cellSize);
      const cellY = Math.floor(y / cellSize);
      const isColor1 = (cellX + cellY) % 2 === 0;
      
      const color = isColor1 ? color1 : color2;
      
      // Set RGBA values
      data[index] = color[0];     // R
      data[index + 1] = color[1]; // G
      data[index + 2] = color[2]; // B
      data[index + 3] = color[3]; // A
    }
  }
  
  // Create texture
  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType);
  texture.needsUpdate = true;
  
  return texture;
}

// Interface for texture properties
export interface TextureProps {
  url: string;                            // URL of the texture
  wrapS?: Wrapping;                       // Wrapping mode for S (horizontal)
  wrapT?: Wrapping;                       // Wrapping mode for T (vertical)
  minFilter?: MinificationTextureFilter;  // Minification filter
  magFilter?: MagnificationTextureFilter; // Magnification filter
  flipY?: boolean;                        // Whether to flip the texture vertically
}

/**
 * Load a single texture from URL
 */
export function loadTexture(texture: TextureProps): Promise<Texture | null> {
  return new Promise<Texture | null>((resolve) => {
    if (!texture.url) {
      resolve(null);
      return;
    }
    
    // Create a texture loader
    const loader = new TextureLoader();
    
    // Load the texture
    loader.load(
      texture.url,
      // On success
      (loadedTexture) => {
        // Apply texture properties
        if (texture.wrapS) loadedTexture.wrapS = texture.wrapS;
        if (texture.wrapT) loadedTexture.wrapT = texture.wrapT;
        if (texture.minFilter) loadedTexture.minFilter = texture.minFilter;
        if (texture.magFilter) loadedTexture.magFilter = texture.magFilter;
        if (texture.flipY !== undefined) loadedTexture.flipY = texture.flipY;
        
        resolve(loadedTexture);
      },
      // On progress - not handling
      undefined,
      // On error
      () => {
        console.warn(`Failed to load texture: ${texture.url}`);
        resolve(null);
      }
    );
  });
}

/**
 * Load multiple textures and return them as an array
 */
export function loadTextures(textures: TextureProps[]): Promise<(Texture | null)[]> {
  if (!textures || textures.length === 0) {
    return Promise.resolve([]);
  }
  
  // Create promises for each texture
  const texturePromises = textures.map(texture => loadTexture(texture));
  
  // Wait for all textures to load
  return Promise.all(texturePromises);
}

/**
 * Create texture uniforms for a shader
 */
export function createTextureUniforms(
  loadedTextures: (Texture | null)[],
  shaderCode: string,
  channelPrefix: string = 'iChannel',
  resolutionUniform: string = 'iChannelResolution'
): Record<string, unknown> {
  const uniformsObj: Record<string, unknown> = {};
  
  if (loadedTextures.length === 0) {
    return uniformsObj;
  }
  
  // Add individual texture channels
  loadedTextures.forEach((texture, index) => {
    const channelName = `${channelPrefix}${index}`;
    if (shaderCode.includes(channelName)) {
      uniformsObj[channelName] = { value: texture };
    }
  });
  
  // Add channel resolution information
  if (shaderCode.includes(resolutionUniform)) {
    const resolutions: number[] = [];
    loadedTextures.forEach((texture, index) => {
      if (texture) {
        // Get the image dimensions
        resolutions[index * 3] = texture.image.width;
        resolutions[index * 3 + 1] = texture.image.height;
        resolutions[index * 3 + 2] = 1; // Depth is 1 for 2D textures
      } else {
        // Placeholder values for missing textures
        resolutions[index * 3] = 0;
        resolutions[index * 3 + 1] = 0;
        resolutions[index * 3 + 2] = 0;
      }
    });
    uniformsObj[resolutionUniform] = { value: resolutions };
  }
  
  return uniformsObj;
}

/**
 * Clean up textures by disposing them
 */
export function disposeTextures(textures: (Texture | null)[]) {
  textures.forEach(texture => {
    if (texture) texture.dispose();
  });
}