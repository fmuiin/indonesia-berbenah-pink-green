// utils/tritone.js

/**
 * Convert hex color to RGB object
 * @param {string} hex - hex color string (e.g., "#E44C99")
 * @returns {object} - {r, g, b} values
 */
export function hexToRgb(hex) {
  const raw = hex.replace('#', '');
  const bigint = parseInt(raw, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

/**
 * Linear interpolation between two values
 * @param {number} a - start value
 * @param {number} b - end value
 * @param {number} t - interpolation factor (0-1)
 * @returns {number} - interpolated value
 */
function mixChannel(a, b, t) {
  return Math.round(a + (b - a) * t);
}

/**
 * Apply tritone filter to image data
 * @param {ImageData} imageData - canvas image data
 * @param {object} colors - {shadow, mid, highlight} hex colors
 * @param {number} tMid - mid-tone breakpoint (0-1)
 * @returns {ImageData} - processed image data
 */
export function applyTritoneToImageData(imageData, colors, tMid = 1.0) {
  const { data, width, height } = imageData;
  const s = hexToRgb(colors.shadow);
  const m = hexToRgb(colors.mid);
  const h = hexToRgb(colors.highlight);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate luminance using standard formula
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; // 0..1

    let rr, gg, bb;

    if (lum <= tMid) {
      // Shadow to mid transition
      const t = tMid === 0 ? 0 : lum / tMid;
      rr = mixChannel(s.r, m.r, t);
      gg = mixChannel(s.g, m.g, t);
      bb = mixChannel(s.b, m.b, t);
    } else {
      // Mid to highlight transition
      const t = (lum - tMid) / (1 - tMid);
      rr = mixChannel(m.r, h.r, t);
      gg = mixChannel(m.g, h.g, t);
      bb = mixChannel(m.b, h.b, t);
    }

    data[i] = rr;
    data[i + 1] = gg;
    data[i + 2] = bb;
    // Keep alpha channel as-is
  }

  return imageData;
}

/**
 * Default tritone colors with meaningful names
 */
export const DEFAULT_COLORS = {
  shadow: '#0D1E91',    // Resistance Blue
  mid: '#E44C99',       // Brave Pink
  highlight: '#01A923'  // Hero Green
};

/**
 * Process image with tritone filter
 * @param {HTMLImageElement} img - source image
 * @param {object} colors - tritone colors
 * @param {number} tMid - mid-tone breakpoint
 * @param {number} maxWidth - maximum output width
 * @returns {string} - data URL of processed image
 */
export function processImageWithTritone(img, colors = DEFAULT_COLORS, tMid = 1.0, maxWidth = 1200) {
  // Calculate dimensions
  const scale = Math.min(1, maxWidth / img.width);
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Draw original image
  ctx.drawImage(img, 0, 0, w, h);

  // Get image data and apply tritone filter
  let imageData = ctx.getImageData(0, 0, w, h);
  imageData = applyTritoneToImageData(imageData, colors, tMid);
  ctx.putImageData(imageData, 0, 0);

  // Return as data URL
  return canvas.toDataURL('image/png');
}
