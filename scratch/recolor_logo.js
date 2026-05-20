import pkg from 'jimp';
const Jimp = pkg.default || pkg;

const inputPath = './src/assets/French-t.png';
const outputPath = './src/assets/French-t-white-text.png';

async function processImage() {
  try {
    const image = await Jimp.read(inputPath);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];
      
      // If the pixel is not transparent
      if (a > 30) {
        // If it's blue text (B is larger than R, or it's a shade of blue/gray)
        if (b > r || (r < 100 && g < 100 && b < 100)) {
          // Change to white
          this.bitmap.data[idx + 0] = 255;
          this.bitmap.data[idx + 1] = 255;
          this.bitmap.data[idx + 2] = 255;
        }
        // Otherwise, it's orange (lotus), leave it alone
      }
    });
    
    await image.writeAsync(outputPath);
    console.log('Successfully created recolored logo at:', outputPath);
  } catch (err) {
    console.error('Error processing image:', err);
  }
}

processImage();
