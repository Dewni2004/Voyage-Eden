import { Jimp } from 'jimp';

async function findBounds() {
  try {
    const image = await Jimp.read('./src/assets/French-t.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    let flowerMinX = width, flowerMaxX = 0, flowerMinY = height, flowerMaxY = 0;
    let lineMinX = width, lineMaxX = 0, lineMinY = height, lineMaxY = 0;
    
    image.scan(0, 0, width, height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];
      
      // Orange pixel detection
      if (a > 30 && r > 200 && g > 70 && g < 120 && b < 70) {
        // If it's in the top 60% of the image, it's the flower
        if (y < height * 0.6) {
          if (x < flowerMinX) flowerMinX = x;
          if (x > flowerMaxX) flowerMaxX = x;
          if (y < flowerMinY) flowerMinY = y;
          if (y > flowerMaxY) flowerMaxY = y;
        } else {
          // It's the horizontal line at the bottom
          if (x < lineMinX) lineMinX = x;
          if (x > lineMaxX) lineMaxX = x;
          if (y < lineMinY) lineMinY = y;
          if (y > lineMaxY) lineMaxY = y;
        }
      }
    });
    
    console.log('Flower bounds:');
    console.log(`  X: ${flowerMinX} to ${flowerMaxX}`);
    console.log(`  Y: ${flowerMinY} to ${flowerMaxY}`);
    
    console.log('Line bounds:');
    console.log(`  X: ${lineMinX} to ${lineMaxX}`);
    console.log(`  Y: ${lineMinY} to ${lineMaxY}`);
    
  } catch (err) {
    console.error(err);
  }
}

findBounds();
