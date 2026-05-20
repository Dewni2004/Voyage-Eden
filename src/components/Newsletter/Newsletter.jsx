import React, { useState } from 'react';
import { subscribeToNewsletter } from '../../services/contentService';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[200px] flex items-center shadow-xl">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=1600" 
              alt="Sri Lanka" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/60"></div>
          </div>

          <div className="relative z-10 w-full p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-[2rem] shadow-xl">
              {/* Text Side */}
              <div className="text-center lg:text-left text-white">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-80">Newsletter</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-1 tracking-tight drop-shadow-md">
                  Abonnez-vous à la newsletter
                </h2>
                <p className="opacity-80 text-xs font-light italic">
                  Pour recevoir nos meilleures offres mensuelles
                </p>
              </div>

              {/* Form Side */}
              <div className="w-full max-w-sm">
                <form 
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-2 bg-white/20 backdrop-blur-xl p-1.5 rounded-[1.5rem] border border-white/30 shadow-lg"
                >
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail..." 
                    className="flex-1 bg-transparent border-none px-5 py-3 text-white placeholder:text-white/60 outline-none text-xs font-medium"
                    required
                    disabled={status === 'loading'}
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-2 rounded-[1.2rem] btn-premium-white whitespace-nowrap disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {status === 'loading' ? 'Chargement...' : "S'abonner"}
                  </button>
                </form>
                {status === 'success' && (
                  <p className="text-green-300 text-[10px] mt-2 ml-4 font-bold animate-pulse">Merci ! Vous êtes maintenant abonné.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-300 text-[10px] mt-2 ml-4 font-bold">Une erreur est survenue. Veuillez réessayer.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
