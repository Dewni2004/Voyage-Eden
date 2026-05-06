import PageHero from '../components/UI/PageHero';
import contactBanner from '../assets/Galle-Fort.jpg';
import nethmiImg from '../assets/Nethmi.webp';

const ContactUs = () => {
  return (
    <div>
      <PageHero 
        title="Contactez-nous"
        description="Nous sommes là pour vous aider à planifier votre voyage de rêve au Sri Lanka. N'hésitez pas à nous contacter."
        image={contactBanner}
      />
      
      <div className="py-16 md:py-24 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Card 1: Nos Bureaux */}
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-primary/30">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-4 md:mb-6">Nos Bureaux</h3>
              <div className="space-y-3 text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                <p>Kandy: Stone House Suites, n° 29, Nittawela Road.</p>
                <p className="pt-4 font-bold text-primary underline decoration-luxury">Kurunegala:</p>
                <p>n° 64, unité 01, complexe Siripathi, Bauddhaloka Rd.</p>
              </div>
            </div>

            {/* Card 2: Contact Direct */}
            <div className="bg-primary p-10 md:p-12 rounded-[40px] shadow-2xl shadow-primary/40 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 z-10 text-white">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-6 md:mb-8">Contact Direct</h3>
              <div className="space-y-6 font-medium text-sm md:text-base">
                <a href="mailto:srilankaedentravels@gmail.com" className="block hover:text-luxury transition-colors underline decoration-luxury/50 underline-offset-4">
                  srilankaedentravels@gmail.com
                </a>
                <div className="space-y-3">
                  <p className="text-luxury font-bold">+94 37 220 1747 <span className="text-white/70 font-normal">(Bureau)</span></p>
                  <p className="text-luxury font-bold">+94 77 147 0150 <span className="text-white/70 font-normal">(WhatsApp)</span></p>
                </div>
              </div>
            </div>

            {/* Card 3: Support Global */}
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-primary/30">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-primary text-xl md:text-2xl font-bold mb-4 md:mb-6">Support Global</h3>
              <div className="space-y-3 text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                <p>Fuseau horaire : UTC +5:30 (IST)</p>
                <p className="pt-4">Langues : Anglais, Espagnol,</p>
                <p>Italien, Français.</p>
                <p className="pt-6 text-[10px] md:text-xs text-primary font-bold bg-luxury/10 py-2 px-4 rounded-full inline-block">
                  Service 24h/24 pour les clients arrivés.
                </p>
              </div>
            </div>
          </div>

          {/* Form and Info Section */}
          <div className="flex flex-col lg:flex-row gap-12 mt-16 md:mt-24 max-w-6xl mx-auto">
            
            {/* Left Column: Contact Form */}
            <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
              <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4">Envoyez-nous un message</h2>
              <p className="text-gray-600 mb-8 md:mb-10 text-sm md:text-base">Vous avez des questions sur un circuit personnalisé ? Écrivez-nous ci-dessous et nous vous répondrons immédiatement.</p>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Nom*</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">Téléphone*</label>
                    <input 
                      type="tel" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">E-mail*</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">Écrivez votre message*</label>
                  <textarea 
                    rows="6"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all resize-none text-sm md:text-base"
                  ></textarea>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-sm md:text-base">
                    Envoyez votre message
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Consultant and Reg Info */}
            <div className="lg:w-1/3 space-y-8">
              <h2 className="text-primary text-2xl md:text-3xl font-bold ml-2">Rencontrez vos conseillers</h2>
              
              {/* Consultant Card */}
              <div className="bg-gray-100/50 p-8 md:p-10 rounded-[40px] border border-white shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img src={nethmiImg} alt="Consultant" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-primary text-xl md:text-2xl font-bold">Nethmi</h3>
                    <p className="text-primary/70 font-semibold text-xs md:text-sm">Conseillère en voyages</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-10">
                  Notre agent de voyage dynamique qui fait tout son possible pour organiser des voyages passionnants et bien organisés, en veillant à ce que chaque détail soit parfaitement planifié.
                </p>
                
                <div className="flex flex-col gap-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#4ade80] hover:bg-[#22c55e] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-green-200">
                    Message WhatsApp
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-primary/20">
                    Envoyer un e-mail
                  </button>
                </div>
              </div>
              
              {/* Company Registration Card */}
              <div className="bg-primary p-8 md:p-10 rounded-[40px] text-white shadow-2xl shadow-primary/30 border border-primary/50">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Enregistrement de la société</h3>
                <div className="space-y-3 font-medium opacity-90 text-sm md:text-base">
                  <p>SLTDA : SLTDA/SQASTA/02238</p>
                  <p>N° d'immatriculation : PV 106406</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maps Section */}
          <div className="mt-24 space-y-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Kurunegala Map */}
              <div className="space-y-6">
                <h2 className="text-primary text-3xl font-bold text-center">Notre bureau de Kurunegala</h2>
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
                <h2 className="text-primary text-3xl font-bold text-center">Notre bureau de Kandy</h2>
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
