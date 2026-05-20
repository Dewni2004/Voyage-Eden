const { Jimp } = require("jimp");

async function main() {
  const imagePath = "e:\\Eden Travels\\src\\assets\\swipe-hand.png";
  const image = await Jimp.read(imagePath);
  
  image.scan(function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If it's very close to black, make it transparent.
    // Threshold of 35 to handle compression artifacts.
    const maxVal = Math.max(r, g, b);
    if (maxVal < 35) {
      if (maxVal < 12) {
        this.bitmap.data[idx + 3] = 0;
      } else {
        // Soft edge transition
        this.bitmap.data[idx + 3] = Math.round(((maxVal - 12) / 23) * 255);
      }
    } else {
      this.bitmap.data[idx + 3] = 255;
    }
  });

  await image.write("e:\\Eden Travels\\src\\assets\\swipe-hand-transparent.png");
  console.log("Successfully created transparent swipe hand!");
}

main().catch(console.error);
