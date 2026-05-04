import React from 'react';

const IncludedExcluded = () => {
  const inclusions = [
    "Hotel accommodation (according to selected package)",
    "Breakfast & dinner at hotels",
    "Private air-conditioned vehicle",
    "Professional driver-guide",
    "Airport transfers",
    "Gasoline, road tax, government taxes, parking, and vehicle insurance"
  ];

  const exclusions = [
    "International flights",
    "Entrance fees to attractions",
    "Optional excursions & Personal expenses",
    "Tips, Alcoholic beverages or soft drinks",
    "Sri Lanka visa fees"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">What's Included & Excluded</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Price Includes */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-black">Price Includes</h3>
          <ul className="space-y-5">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#769d7a] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-700 font-medium text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Excludes */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-black">Price Excludes</h3>
          <ul className="space-y-5">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-[#b02a30] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <span className="text-gray-700 font-medium text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IncludedExcluded;
