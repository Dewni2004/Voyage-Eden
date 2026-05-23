import React, { useState } from 'react';

import img1 from '../../assets/Office Image 1.jpg';
import img2 from '../../assets/Office Image 2.jpg';
import img3 from '../../assets/Office Image 3.jpg';
import img4 from '../../assets/Office Image 4.jpg';
import img5 from '../../assets/Office Image 5.jpg';
import img6 from '../../assets/Office Image 6.jpg';
import img7 from '../../assets/Office Image 7.jpg';
import img8 from '../../assets/Office Image 8.jpg';
import img9 from '../../assets/Office Image 9.jpg';
import img10 from '../../assets/Office- staff.jpg';
import img11 from '../../assets/Guides.jpg';

const items = [
  { type: 'image', src: img1 },
  { type: 'image', src: img2 },
  { type: 'image', src: img3 },
  { type: 'image', src: img4 },
  { type: 'image', src: img5 },
  { type: 'image', src: img6 },
  { type: 'image', src: img7 },
  { type: 'image', src: img8 },
  { type: 'image', src: img9 },
  { type: 'image', src: img10 },
  { type: 'image', src: img11, objectPosition: 'object-top' }
];

const OfficeGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-luxury text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Derrière les décors
          </p>
          <h2 className="text-primary text-4xl md:text-5xl font-serif font-bold">
            Notre Bureau et Notre Équipe
          </h2>
          <p className="text-gray-500 mt-6 max-w-2xl mx-auto font-medium">
            Rencontrez les visages passionnés et découvrez le cœur de nos opérations au Sri Lanka. 
            Nous travaillons sans relâche pour rendre vos voyages inoubliables.
          </p>
        </div>

        {/* Layout Container: Video and Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-8">
          {/* Cinematic Featured Video */}
          <div className="w-full aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100">
            <iframe 
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/xWWDVeWWAdA?rel=0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Image Tile Grid */}
          <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-3 md:gap-4 w-full aspect-square sm:aspect-[4/3] lg:aspect-video">
            {items.slice(0, 7).map((item, idx) => {
              const gridClasses = [
                "col-start-1 col-span-2 row-start-1 row-span-2", // 0: Large
                "col-start-3 col-span-2 row-start-1 row-span-1", // 1: Wide
                "col-start-3 col-span-1 row-start-2 row-span-2", // 2: Tall
                "col-start-4 col-span-1 row-start-2 row-span-1", // 3: Small
                "col-start-4 col-span-1 row-start-3 row-span-1", // 4: Small
                "col-start-1 col-span-1 row-start-3 row-span-1", // 5: Small
                "col-start-2 col-span-1 row-start-3 row-span-1", // 6: Small
              ];

              return (
                <div 
                  key={idx} 
                  className={`w-full h-full overflow-hidden rounded-[1rem] relative group shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${gridClasses[idx]}`}
                  onClick={() => setSelectedImage(item.src)}
                >
                  <img 
                    src={item.src} 
                    alt={`Office view ${idx + 1}`} 
                    loading="lazy"
                    className={`w-full h-full object-cover ${item.objectPosition || 'object-center'} group-hover:scale-110 transition-transform duration-700`}
                  />
                  {/* Subtle hover overlay indicating clickability */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg className="w-8 h-8 text-white drop-shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged office view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};

export default OfficeGallery;
