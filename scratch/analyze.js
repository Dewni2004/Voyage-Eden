import { Jimp } from 'jimp';

async function analyze() {
  try {
    const image = await Jimp.read('e:/Office Sites/Voyage Eden/src/assets/hero-image.jpg');
    console.log(`Image size: ${image.width}x${image.height}`);
    
    // Check pixel colors at various coordinates
    const samples = [
      { x: 100, y: 50 },
      { x: 500, y: 100 },
      { x: 960, y: 150 },
      { x: 1500, y: 200 },
      { x: 100, y: 600 },
      { x: 960, y: 700 }
    ];
    
    for (const s of samples) {
      const color = image.getPixelColor(s.x, s.y);
      console.log(`Pixel at (${s.x}, ${s.y}): hex=#${color.toString(16).padStart(8, '0')}`);
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
  }
}

analyze();
