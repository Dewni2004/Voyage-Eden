const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: '../src/components/TourCards/TourCards.jsx',
    target: 'py-12 md:py-24',
    replace: 'py-10 md:py-16'
  },
  {
    file: '../src/components/WhyChooseUs/WhyChooseUs.jsx',
    target: 'py-12 md:py-24',
    replace: 'py-10 md:py-16'
  },
  {
    file: '../src/components/Destinations/Destinations.jsx',
    target: 'py-12 md:py-24',
    replace: 'py-10 md:py-16'
  },
  {
    file: '../src/components/Reviews/Reviews.jsx',
    target: 'py-12 md:py-24',
    replace: 'py-10 md:py-16'
  },
  {
    file: '../src/components/PopularItineraries/PopularItineraries.jsx',
    target: 'py-12 md:py-24',
    replace: 'py-10 md:py-16'
  },
  {
    file: '../src/components/TrustSection/TrustSection.jsx',
    target: 'py-8 md:py-20',
    replace: 'py-8 md:py-12'
  },
  
  // Pages
  {
    file: '../src/pages/AboutUs.jsx',
    target: 'py-16 md:py-24',
    replace: 'py-12 md:py-16'
  },
  {
    file: '../src/pages/ContactUs.jsx',
    target: 'py-16 md:py-24',
    replace: 'py-12 md:py-16'
  },
  {
    file: '../src/pages/TravelGuide.jsx',
    target: 'py-24 bg-[#f8fbff]',
    replace: 'py-16 bg-[#f8fbff]'
  },
  {
    file: '../src/pages/Reviews.jsx',
    target: 'py-24 max-w-7xl mx-auto px-6 relative',
    replace: 'py-16 max-w-7xl mx-auto px-6 relative'
  },
  {
    file: '../src/pages/Reviews.jsx',
    target: 'py-24 bg-gray-50',
    replace: 'py-16 bg-gray-50'
  },
  {
    file: '../src/pages/Reviews.jsx',
    target: 'py-32 max-w-7xl mx-auto px-6',
    replace: 'py-20 max-w-7xl mx-auto px-6'
  }
];

replacements.forEach(r => {
  const filePath = path.join(__dirname, r.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(r.target)) {
      content = content.split(r.target).join(r.replace);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${r.file}: Replaced "${r.target}" with "${r.replace}"`);
    } else {
      console.log(`Skipped ${r.file}: Target "${r.target}" not found.`);
    }
  } else {
    console.error(`File not found: ${filePath}`);
  }
});
