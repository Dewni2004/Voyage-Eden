import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      id: 1,
      title: t('why.t1'),
      description: t('why.d1'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      id: 2,
      title: t('why.t2'),
      description: t('why.d2'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: t('why.t3'),
      description: t('why.d3'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: t('why.t4'),
      description: t('why.d4'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="mb-4">{t('why.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group bg-white p-4 sm:p-10 rounded-2xl sm:rounded-[1.75rem] border border-primary/20 shadow-[0_15px_35px_-5px_rgba(30,64,111,0.06)] text-center flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/5 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:bg-primary/10">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                      <div className="scale-75 sm:scale-100 flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-primary mb-2 sm:mb-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed font-light text-[12px] sm:text-[15px] mt-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
