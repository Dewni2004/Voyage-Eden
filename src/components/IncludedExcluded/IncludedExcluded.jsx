import React from 'react';
import { useTranslation } from 'react-i18next';

const IncludedExcluded = () => {
  const { t } = useTranslation();
  const includedExcludedData = t("includedExcluded", { returnObjects: true });

  const inclusions = Object.keys(includedExcludedData)
    .filter(key => key.startsWith('inc') && key !== 'included')
    .sort((a, b) => parseInt(a.replace('inc', '')) - parseInt(b.replace('inc', '')))
    .map(key => includedExcludedData[key]);

  const exclusions = Object.keys(includedExcludedData)
    .filter(key => key.startsWith('exc') && key !== 'excluded')
    .sort((a, b) => parseInt(a.replace('exc', '')) - parseInt(b.replace('exc', '')))
    .map(key => includedExcludedData[key]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 md:py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">{t("includedExcluded.title")}</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Price Includes */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-black">{t("includedExcluded.included")}</h3>
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
          <h3 className="text-xl font-bold mb-8 text-black">{t("includedExcluded.excluded")}</h3>
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
