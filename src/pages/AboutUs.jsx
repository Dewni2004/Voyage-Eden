import React from 'react';
import teamPhoto from '../assets/team-photo.png';
import beachSunset from '../assets/beach-sunset.png';
import familyBeach from '../assets/family-beach.png';
import teamMember from '../assets/team-member.png';
import officeTeam1 from '../assets/team-office-1.png';
import officeTeam2 from '../assets/team-office-2.png';
import guide1 from '../assets/guide-1.png';
import guide2 from '../assets/guide-2.png';

const AboutUs = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={teamPhoto} 
            alt="Eden Travels Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg mb-4">
            Get To Know Us
          </h1>
          <div className="w-24 h-1 bg-luxury mx-auto rounded-full shadow-lg"></div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <h2 className="text-primary text-4xl font-bold mb-8">Who We Are</h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-12">
                <p>
                  We are a multicultural team based in Kandy and Kurunegala, in the heart of Sri Lanka, specializing in personalized travel experiences that showcase the authentic beauty of our island nation.
                </p>
                <p>
                  Proudly operating under the well-established Sri Lanka Viajes Eden Group of Companies, we uphold the same passion, professionalism, and commitment to excellence. All our operations are based in Sri Lanka, supported by a dedicated local team of travel specialists, experienced guides, and professional chauffeurs.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Years Experience", value: "13+" },
                  { label: "Local Experts", value: "100%" },
                  { label: "Star Reviews", value: "4.9" },
                ].map((stat, index) => (
                  <div key={index} className="bg-[#b4bdc9]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="text-primary text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-primary font-semibold text-lg leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Overlapping Images */}
            <div className="lg:w-1/2 relative h-[500px] md:h-[600px] w-full">
              {/* Top Image */}
              <div className="absolute top-0 left-0 w-4/5 h-[350px] z-10 transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src={beachSunset} 
                  alt="Sri Lanka Beach Sunset" 
                  className="w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white"
                />
              </div>
              
              {/* Bottom Image */}
              <div className="absolute bottom-0 right-0 w-3/4 h-[350px] z-20 transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src={familyBeach} 
                  alt="Family on Beach" 
                  className="w-full h-full object-cover rounded-[40px] shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary text-4xl font-bold mb-4">What Sets Us Apart?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our diverse team brings together the best of local knowledge and international service standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "No Compulsory Purchases",
                desc: "Your time in Sri Lanka should be about discovery, not sales pitches. We focus purely on creating meaningful experiences that showcase the real Sri Lanka.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )
              },
              {
                title: "Connected to Local Life",
                desc: "Being based right here in Kandy keeps us plugged into Sri Lanka's pulse. We stay current with local festivals and authentic cultural experiences with our Superior category hotels.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                title: "International Driving Standards",
                desc: "Our drivers are specially trained to meet European safety and comfort expectations, providing smooth, predictable service.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                )
              },
              {
                title: "Proven Track Record",
                desc: "Our reputation speaks through the voices of those who've traveled with us. Browse our client testimonials to hear directly from fellow travelers.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8 shadow-lg shadow-primary/30 group-hover:bg-luxury transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-primary text-xl font-bold mb-4 leading-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founders & Representatives Section */}
      <section className="py-24 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-primary text-4xl font-bold mb-4">Meet the Founders & Representatives</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="flex flex-col items-center text-center group">
                <div className="relative mb-8 p-1.5 rounded-full border-[6px] border-primary transition-transform duration-500 group-hover:scale-105 group-hover:border-luxury shadow-xl shadow-primary/20">
                  <div className="w-48 h-48 rounded-full overflow-hidden">
                    <img 
                      src={teamMember} 
                      alt="Nethmi - Travel Consultant" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-primary text-2xl font-bold mb-1">Nethmi</h3>
                <p className="text-primary/70 font-semibold mb-4">Travel Consultant</p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[250px]">
                  Our energetic travel agent who goes the extra mile to curate exciting, well-organized trips, making sure every detail is perfectly planned.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team at the Office Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary text-4xl font-bold mb-4">Our Team at the Office</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The dedicated professionals who make your dream trip a reality behind the scenes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-[#f8fbff] p-8 rounded-[32px] border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-white group-hover:border-luxury transition-colors duration-300">
                  <img 
                    src={index % 3 === 0 ? officeTeam1 : (index % 3 === 1 ? officeTeam2 : teamMember)} 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-primary text-xl font-bold mb-1">Manjula</h3>
                <p className="text-primary/70 font-semibold text-sm mb-4">Travel Consultant</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Your time in Sri Lanka should be about discovery, not sales pitches. We focus purely on creating meaningful experiences that showcase the real Sri Lanka.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Guides & Drivers Section */}
      <section className="py-24 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary text-4xl font-bold mb-4">Our Guides & Drivers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your company on the road. Local experts who turn every tour into an authentic experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-8 shadow-xl border-4 border-white group-hover:border-luxury transition-all duration-300 transform group-hover:scale-105">
                  <img 
                    src={index % 2 === 0 ? guide1 : guide2} 
                    alt="Guide / Driver" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-primary text-2xl font-bold mb-1">Nethmi</h3>
                <p className="text-primary/70 font-semibold mb-4">Travel Consultant</p>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[250px]">
                  Our energetic travel agent who goes the extra mile to curate exciting, well-organized trips, making sure every detail is perfectly planned.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
