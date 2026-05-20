const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '../src/pages/Reviews.jsx'),
  path.join(__dirname, '../src/components/TrustSection/TrustSection.jsx')
];

const targetGoogle = 'className="flex items-center justify-center gap-1.5 bg-[#1e406f] hover:bg-[#152e50] text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md text-xs"';
const replaceGoogle = 'className="flex items-center justify-center gap-1.5 bg-white border border-[#1e406f] hover:bg-[#1e406f]/5 text-[#1e406f] font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs"';

const targetVideo = 'className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md text-xs"';
const replaceVideo = 'className="flex items-center justify-center gap-1.5 bg-white border border-red-600 hover:bg-red-50 text-red-600 font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs"';

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    let countG = 0;
    let countV = 0;
    
    if (content.includes(targetGoogle)) {
      content = content.split(targetGoogle).join(replaceGoogle);
      countG++;
    }
    
    if (content.includes(targetVideo)) {
      content = content.split(targetVideo).join(replaceVideo);
      countV++;
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${path.basename(file)}: Google replaced? ${countG > 0}, Video replaced? ${countV > 0}`);
  } else {
    console.error(`File not found: ${file}`);
  }
});
