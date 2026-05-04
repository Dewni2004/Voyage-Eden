import PageHero from '../components/UI/PageHero';
import contactBanner from '../assets/Galle-Fort.jpg';

const ContactUs = () => {
  return (
    <div>
      <PageHero 
        title="Contactez-nous"
        description="Nous sommes là pour vous aider à planifier votre voyage de rêve au Sri Lanka. N'hésitez pas à nous contacter."
        image={contactBanner}
      />
      <div className="py-24 bg-[#f8fbff]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Our Offices */}
          <div className="bg-white p-12 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-primary text-2xl font-bold mb-6">Our Offices</h3>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>Kandy: 38/01, Stone House Suites,</p>
              <p>Nittawela Road.</p>
              <p className="pt-4 font-bold text-primary underline decoration-luxury">Kurunegala:</p>
              <p>No. 64, 4th floor,</p>
              <p>Siripathi Complex, Bauddhaloka Rd.</p>
            </div>
          </div>

          {/* Card 2: Direct Contact (Primary Highlight) */}
          <div className="bg-primary p-12 rounded-[40px] shadow-2xl shadow-primary/40 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 z-10 text-white">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-white text-2xl font-bold mb-8">Direct Contact</h3>
            <div className="space-y-6 font-medium">
              <a href="mailto:srilankaedentravels@gmail.com" className="block hover:text-luxury transition-colors underline decoration-luxury/50 underline-offset-4">
                srilankaedentravels@gmail.com
              </a>
              <div className="space-y-3">
                <p className="text-luxury font-bold">+94 37 220 1747 <span className="text-white/70 font-normal">(Office)</span></p>
                <p className="text-luxury font-bold">+94 77 147 0150 <span className="text-white/70 font-normal">(WhatsApp)</span></p>
              </div>
            </div>
          </div>

          {/* Card 3: Global Support */}
          <div className="bg-white p-12 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-primary text-2xl font-bold mb-6">Global Support</h3>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>Timezone: UTC +5:30 (IST)</p>
              <p className="pt-4">Languages: English, Spanish,</p>
              <p>Italian, French.</p>
              <p className="pt-6 text-sm text-primary font-bold bg-luxury/10 py-2 px-4 rounded-full">
                24-hour service for arrived guests.
              </p>
            </div>
          </div>

        </div>

        {/* Form and Info Section */}
        <div className="flex flex-col lg:flex-row gap-12 mt-20 max-w-6xl mx-auto">
          
          {/* Left Column: Contact Form */}
          <div className="lg:w-2/3 bg-white p-12 rounded-[40px] shadow-xl border border-gray-100">
            <h2 className="text-primary text-3xl font-bold mb-4">Send us a Message</h2>
            <p className="text-gray-600 mb-10">Have questions about a customized tour? Drop us a line below and we will get back to you immediately.</p>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Name*</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Phone*</label>
                  <input 
                    type="tel" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Email*</label>
                  <input 
                    type="email" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Write Your Message*</label>
                <textarea 
                  rows="6"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all resize-none"
                ></textarea>
              </div>
              
              <div className="flex justify-end pt-4">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                  Send Your Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Consultant and Reg Info */}
          <div className="lg:w-1/3 space-y-8">
            <h2 className="text-primary text-3xl font-bold ml-2">Meet Your Consultants</h2>
            
            {/* Consultant Card */}
            <div className="bg-gray-100/50 p-10 rounded-[40px] border border-white shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img src="/src/assets/team-member.png" alt="Consultant" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-primary text-2xl font-bold">Nethmi</h3>
                  <p className="text-primary/70 font-semibold text-sm">Travel Consultant</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                Our energetic travel agent who goes the extra mile to curate exciting, well-organized trips, making sure every detail is perfectly planned.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-grow flex items-center justify-center gap-2 bg-[#4ade80] hover:bg-[#22c55e] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-green-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Message
                </button>
                <button className="flex-grow flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-primary/20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Email
                </button>
              </div>
            </div>
            
            {/* Company Registration Card */}
            <div className="bg-primary p-10 rounded-[40px] text-white shadow-2xl shadow-primary/30 border border-primary/50">
              <h3 className="text-2xl font-bold mb-6">Company Registration</h3>
              <div className="space-y-3 font-medium opacity-90">
                <p>SLTDA: SLTDA/SQASTA/02238</p>
                <p>Business Reg: PV 106406</p>
              </div>
            </div>
          </div>

        </div>

        {/* Maps Section */}
        <div className="mt-24 space-y-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Kurunegala Map */}
            <div className="space-y-6">
              <h2 className="text-primary text-3xl font-bold text-center">Our Kurunegala Office</h2>
              <div className="w-full h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.912628469382!2d80.3621453!3d7.474895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3398c8c50e9df%3A0x6b907f9c21b2d9d!2sSiripathi%20Complex!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kurunegala Office Map"
                ></iframe>
              </div>
            </div>

            {/* Kandy Map */}
            <div className="space-y-6">
              <h2 className="text-primary text-3xl font-bold text-center">Our Kandy Office</h2>
              <div className="w-full h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.551717088469!2d80.6277253!3d7.292211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3662c954a938d%3A0x86835a26639d6778!2sStone%20House%20Suites!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kandy Office Map"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContactUs;
