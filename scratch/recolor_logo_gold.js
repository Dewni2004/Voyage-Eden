import { Jimp } from 'jimp';

// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

// HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

async function recolorLogo() {
  try {
    // Read the clean original French-t.png
    const image = await Jimp.read('./src/assets/French-t.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    image.scan(0, 0, width, height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];

      if (a > 20) {
        const [h, s, l] = rgbToHsl(r, g, b);
        
        // Detect orange color (hue around 11 degrees) for flower and line
        if (h >= 0 && h <= 30 && s > 40 && l > 20 && l < 85) {
          // Shift to gold: hue 45, sat 65%, light 52% (relative adjustment)
          const newH = 45;
          const newS = Math.min(100, s * 0.75);
          const newL = Math.min(100, l * 0.9);
          
          const [nr, ng, nb] = hslToRgb(newH, newS, newL);
          this.bitmap.data[idx + 0] = nr;
          this.bitmap.data[idx + 1] = ng;
          this.bitmap.data[idx + 2] = nb;
        } else {
          // It's blue or gray text, change it to white
          this.bitmap.data[idx + 0] = 255;
          this.bitmap.data[idx + 1] = 255;
          this.bitmap.data[idx + 2] = 255;
        }
      }
    });

    // Write output as the white text version with gold flower
    await image.write('./src/assets/French-t-white-text.png');
    console.log('Successfully created French-t-white-text.png with white text and gold flower/line');

  } catch (err) {
    console.error('Error processing images:', err);
  }
}

recolorLogo();
