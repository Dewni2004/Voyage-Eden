import { Jimp } from 'jimp';

async function main() {
  try {
    const image = await Jimp.read('e:/Office Sites/Voyage Eden/src/assets/New_Map.png');
    console.log('Width:', image.width);
    console.log('Height:', image.height);
    console.log('Aspect Ratio:', image.width / image.height);
  } catch (err) {
    console.error(err);
  }
}

main();
