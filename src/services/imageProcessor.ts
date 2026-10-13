/**
 * BG Remove AI - In-Browser AI Background Removal Service
 * Uses WebAssembly & ONNX Runtime Web via @imgly/background-removal
 * with graceful client-side canvas edge segmentation fallback.
 */

import { removeBackground } from '@imgly/background-removal';
import { BackgroundSettings, ProcessorEngine } from '../types';

export interface ProgressCallback {
  (percentage: number, statusText: string): void;
}

/**
 * Remove image background using real in-browser AI model (IS-Net ONNX)
 * with automatic fallback if WebAssembly or network is constrained.
 */
export async function processImageBackground(
  imageSource: File | Blob | string,
  preferredEngine: ProcessorEngine = 'neural_ai',
  onProgress?: ProgressCallback
): Promise<{ blob: Blob; engineUsed: ProcessorEngine; width: number; height: number }> {
  const imgDims = await getImageDimensions(imageSource);

  if (preferredEngine === 'smart_canvas') {
    onProgress?.(30, 'Analyzing image contrast and edge contours...');
    const fallbackBlob = await smartCanvasSegmentation(imageSource, onProgress);
    onProgress?.(100, 'Background removed successfully!');
    return {
      blob: fallbackBlob,
      engineUsed: 'smart_canvas',
      width: imgDims.width,
      height: imgDims.height,
    };
  }

  // Attempt real neural AI background removal with IS-Net model
  try {
    onProgress?.(15, 'Initializing browser neural AI engine (IS-Net)...');

    const resultBlob = await removeBackground(imageSource, {
      model: 'isnet_quint8', // Quantized model for fast web execution & lower memory
      debug: false,
      progress: (key: string, current: number, total: number) => {
        let pct = 20;
        let msg = 'Processing with AI model...';

        if (key.includes('fetch') || key.includes('download')) {
          const ratio = total > 0 ? current / total : 0.5;
          pct = Math.min(65, Math.round(15 + ratio * 50));
          msg = `Downloading AI model weights (${Math.round((current / (1024 * 1024)) * 10) / 10}MB)...`;
        } else if (key.includes('compute') || key.includes('inference')) {
          pct = 75;
          msg = 'Running neural segmentation on image tensors...';
        } else if (key.includes('post') || key.includes('alpha')) {
          pct = 90;
          msg = 'Refining alpha edges and anti-aliasing...';
        }
        onProgress?.(pct, msg);
      },
    });

    onProgress?.(100, 'Background removed successfully with AI!');
    return {
      blob: resultBlob,
      engineUsed: 'neural_ai',
      width: imgDims.width,
      height: imgDims.height,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('AI engine encountered error, falling back to smart canvas segmentation:', errorMsg);

    onProgress?.(40, 'Switching to high-speed client-side canvas engine...');
    const fallbackBlob = await smartCanvasSegmentation(imageSource, onProgress);
    onProgress?.(100, 'Background removed using client edge engine!');
    return {
      blob: fallbackBlob,
      engineUsed: 'smart_canvas',
      width: imgDims.width,
      height: imgDims.height,
    };
  }
}

/**
 * Helper to inspect image width & height from any image source
 */
export async function getImageDimensions(source: File | Blob | string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = typeof source === 'string' ? source : URL.createObjectURL(source);

    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;
      if (typeof source !== 'string') {
        URL.revokeObjectURL(url);
      }
      resolve({ width, height });
    };

    img.onerror = () => {
      if (typeof source !== 'string') {
        URL.revokeObjectURL(url);
      }
      reject(new Error('Failed to load image for dimension inspection'));
    };

    img.src = url;
  });
}

/**
 * Intelligent client-side edge-preserving background segmentation
 * Analyzes perimeter color distributions, edge saliency, and produces transparent alpha.
 */
export async function smartCanvasSegmentation(
  source: File | Blob | string,
  onProgress?: ProgressCallback
): Promise<Blob> {
  onProgress?.(45, 'Loading image into canvas rasterizer...');

  const img = await loadImage(source);
  const canvas = document.createElement('canvas');
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;

  // Max dimension limit for canvas processing to ensure fast responsive performance
  const maxDim = 2000;
  let targetW = w;
  let targetH = h;
  if (w > maxDim || h > maxDim) {
    const ratio = Math.min(maxDim / w, maxDim / h);
    targetW = Math.round(w * ratio);
    targetH = Math.round(h * ratio);
  }

  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Canvas 2D context is not supported in this browser.');
  }

  ctx.drawImage(img, 0, 0, targetW, targetH);
  onProgress?.(60, 'Sampling background color distribution...');

  const imageData = ctx.getImageData(0, 0, targetW, targetH);
  const data = imageData.data;

  // 1. Sample perimeter border pixels (corners and edges) to deduce dominant background colors
  const borderSamples: Array<[number, number, number]> = [];
  const step = Math.max(1, Math.floor(Math.min(targetW, targetH) / 60));

  // Top and bottom edges
  for (let x = 0; x < targetW; x += step) {
    const topIdx = (0 * targetW + x) * 4;
    borderSamples.push([data[topIdx], data[topIdx + 1], data[topIdx + 2]]);
    const botIdx = ((targetH - 1) * targetW + x) * 4;
    borderSamples.push([data[botIdx], data[botIdx + 1], data[botIdx + 2]]);
  }
  // Left and right edges
  for (let y = 0; y < targetH; y += step) {
    const leftIdx = (y * targetW + 0) * 4;
    borderSamples.push([data[leftIdx], data[leftIdx + 1], data[leftIdx + 2]]);
    const rightIdx = (y * targetW + (targetW - 1)) * 4;
    borderSamples.push([data[rightIdx], data[rightIdx + 1], data[rightIdx + 2]]);
  }

  // Calculate median / average background color
  let totalR = 0, totalG = 0, totalB = 0;
  for (const [r, g, b] of borderSamples) {
    totalR += r;
    totalG += g;
    totalB += b;
  }
  const avgBgR = totalR / borderSamples.length;
  const avgBgG = totalG / borderSamples.length;
  const avgBgB = totalB / borderSamples.length;

  onProgress?.(80, 'Isolating foreground subject and applying edge alpha...');

  const centerX = targetW / 2;
  const centerY = targetH / 2;
  const maxDistFromCenter = Math.sqrt(centerX * centerX + centerY * centerY);

  // Compute color difference and spatial weighting
  for (let y = 0; y < targetH; y++) {
    for (let x = 0; x < targetW; x++) {
      const idx = (y * targetW + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Euclidean color distance to average background
      const colorDist = Math.sqrt(
        (r - avgBgR) ** 2 + (g - avgBgG) ** 2 + (b - avgBgB) ** 2
      );

      // Distance from closest edge vs center
      const distFromEdgeX = Math.min(x, targetW - 1 - x);
      const distFromEdgeY = Math.min(y, targetH - 1 - y);
      const minEdgeDist = Math.min(distFromEdgeX, distFromEdgeY);
      const edgeWeight = Math.min(1, minEdgeDist / (Math.min(targetW, targetH) * 0.15));

      // Subject center priority
      const distFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const centerFactor = 1 - (distFromCenter / maxDistFromCenter) * 0.4;

      // Color variance check against corner clusters
      let isNearBorderColor = colorDist < 42;
      for (let s = 0; s < Math.min(15, borderSamples.length); s += 3) {
        const [sr, sg, sb] = borderSamples[s];
        const sampleDist = Math.sqrt((r - sr) ** 2 + (g - sg) ** 2 + (b - sb) ** 2);
        if (sampleDist < 28) {
          isNearBorderColor = true;
          break;
        }
      }

      if (isNearBorderColor && edgeWeight < 0.6) {
        // Clear background
        data[idx + 3] = 0;
      } else {
        // Calculate smooth alpha transition
        const threshold = 35 * (1.2 - centerFactor * 0.3);
        if (colorDist < threshold && minEdgeDist < Math.min(targetW, targetH) * 0.25) {
          const alphaRatio = Math.max(0, (colorDist - 20) / (threshold - 20));
          data[idx + 3] = Math.round(alphaRatio * 255);
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to encode result to PNG blob.'));
      }
    }, 'image/png');
  });
}

/**
 * Loads image into HTMLImageElement
 */
function loadImage(source: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const url = typeof source === 'string' ? source : URL.createObjectURL(source);

    img.onload = () => {
      if (typeof source !== 'string') {
        URL.revokeObjectURL(url);
      }
      resolve(img);
    };

    img.onerror = (e) => {
      if (typeof source !== 'string') {
        URL.revokeObjectURL(url);
      }
      reject(new Error('Image failed to render into memory.'));
    };

    img.src = url;
  });
}

/**
 * Render final composite image with selected background settings
 * (transparent, solid color, gradient, blurred original backdrop, or custom image)
 */
export async function renderCompositeImage(
  cutoutBlobOrUrl: Blob | string,
  originalBlobOrUrl: Blob | string,
  settings: BackgroundSettings,
  outputFormat: 'image/png' | 'image/jpeg' = 'image/png'
): Promise<Blob> {
  const cutoutImg = await loadImage(cutoutBlobOrUrl);
  const w = cutoutImg.naturalWidth || cutoutImg.width;
  const h = cutoutImg.naturalHeight || cutoutImg.height;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context unavailable.');
  }

  // 1. Draw requested background
  if (settings.type === 'color') {
    ctx.fillStyle = settings.color;
    ctx.fillRect(0, 0, w, h);
  } else if (settings.type === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    if (settings.gradient === 'warm-sunrise') {
      grad.addColorStop(0, '#ff9a9e');
      grad.addColorStop(1, '#fecfef');
    } else if (settings.gradient === 'cool-ocean') {
      grad.addColorStop(0, '#2193b0');
      grad.addColorStop(1, '#6dd5ed');
    } else if (settings.gradient === 'studio-soft') {
      grad.addColorStop(0, '#e2e8f0');
      grad.addColorStop(1, '#ffffff');
    } else if (settings.gradient === 'cyber-dusk') {
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(1, '#9333ea');
    } else {
      grad.addColorStop(0, '#f8fafc');
      grad.addColorStop(1, '#e2e8f0');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  } else if (settings.type === 'blur') {
    // Draw blurred original image as background
    const origImg = await loadImage(originalBlobOrUrl);
    ctx.save();
    ctx.filter = `blur(${Math.max(4, settings.blurAmount)}px)`;
    // Scale slightly up to avoid edge bleeding from blur filter
    ctx.drawImage(origImg, -20, -20, w + 40, h + 40);
    ctx.restore();
  } else if (settings.type === 'custom_image' && settings.customImageUrl) {
    try {
      const backdropImg = await loadImage(settings.customImageUrl);
      // Draw cover fit
      const bgAspect = backdropImg.width / backdropImg.height;
      const targetAspect = w / h;
      let drawW = w;
      let drawH = h;
      let offX = 0;
      let offY = 0;
      if (bgAspect > targetAspect) {
        drawW = h * bgAspect;
        offX = (w - drawW) / 2;
      } else {
        drawH = w / bgAspect;
        offY = (h - drawH) / 2;
      }
      ctx.drawImage(backdropImg, offX, offY, drawW, drawH);
    } catch {
      // Fallback to white if custom image fails to load
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    }
  }

  // 2. Draw the foreground cutout
  ctx.save();
  if (settings.featherRadius > 0) {
    // Subtle shadow or smoothing
    ctx.shadowBlur = settings.featherRadius;
    ctx.shadowColor = 'rgba(0,0,0,0.05)';
  }
  ctx.drawImage(cutoutImg, 0, 0, w, h);
  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create composite image blob.'));
      },
      outputFormat,
      0.95
    );
  });
}
