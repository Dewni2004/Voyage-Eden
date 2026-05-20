import { Jimp } from 'jimp';

async function analyze() {
  try {
    const image = await Jimp.read('./src/assets/French-t.png');
    console.log('Image width:', image.bitmap.width, 'height:', image.bitmap.height);
    
    const colors = new Set();
    const colorCounts = {};
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];
      
      if (a > 30) {
        const hex = `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }
    });
    
    const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    console.log('Top 30 colors (hex and pixel count):');
    sortedColors.slice(0, 30).forEach(([hex, count]) => {
      console.log(`#${hex}: ${count}`);
    });
    
  } catch (err) {
    console.error(err);
  }
}

analyze();
