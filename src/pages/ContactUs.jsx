import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import PageHero from '../components/UI/PageHero';
import officeStaff2 from '../assets/Office - staff 2.jpg';
import nethmiImg from '../assets/Nethmi.webp';
import marcoImg from '../assets/Marco.webp';
import anaImg from '../assets/Ana.webp';

const ContactUs = () => {
  const form = useRef();
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ type: '', text: '' });

  const email1 = t('footer.email1', 'srilankavoyageeden@gmail.com');
  const email2 = t('footer.email2', '');
  const contactEmails = [email1, email2].filter(Boolean).join(',');

  const consultantName = t("contactUs.consultants.name", "Nethmi");
  const consultantRole = t("contactUs.consultants.role", "Travel Advisor");
  const consultantDesc = t("contactUs.consultants.desc", "Our dynamic travel agent...");
  const whatsappNum = t("contactUs.consultants.whatsappNum", "94771470150");

  let consultantImg = nethmiImg;
  if (consultantName === "Marco") {
    consultantImg = marcoImg;
  } else if (consultantName === "Ana") {
    consultantImg = anaImg;
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessageStatus({ type: '', text: '' });

    // IMPORTANT: replace these with your actual IDs from emailjs.com
    const SERVICE_ID = "service_xxxxxx"; 
    const TEMPLATE_ID = "template_xxxxxx";
    const PUBLIC_KEY = "xxxxxxxxxxxx";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setMessageStatus({ 
            type: 'success', 
            text: 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.' 
          });
          form.current.reset();
      }, (error) => {
          setMessageStatus({ 
            type: 'error', 
            text: "Désolé, une erreur s'est produite. Veuillez réessayer ou nous contacter via WhatsApp." 
          });
          console.error('EmailJS Error:', error);
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div>
      <PageHero
        title={t("contactUs.heroTitle")}
        description={t("contactUs.heroDesc")}
        image={officeStaff2}
        overlayOpacity="bg-black/60"
        bgPosition="object-[center_20%]"
      />

      <div className="py-12 md:py-16 bg-[#f8fbff]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[90rem] mx-auto">

            {[
              {
                id: 'registro',
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h3m-6 0a3 3 0 003-3v-1m-3 4a3 3 0 01-3-3v-1" />
                  </svg>
                )
              },
              {
                id: 'direccion',
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )
              },
              {
                id: 'email',
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                id: 'telefono',
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                )
              }
            ].map((card, index) => (
              <div key={index} className="bg-white p-10 md:p-12 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-primary/30">
                  {card.icon}
                </div>
                <h3 className="text-primary text-xl md:text-2xl font-bold mb-4 md:mb-6 uppercase">{t(`contactUs.cards.${card.id}.title`)}</h3>
                <div className="space-y-3 text-gray-600 font-medium leading-relaxed text-sm md:text-base">
                  {[1, 2, 3, 4].map(num => {
                    const lineKey = `contactUs.cards.${card.id}.line${num}`;
                    const lineVal = t(lineKey);
                    return lineVal && lineVal !== lineKey ? <p key={num}>{lineVal}</p> : null;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Form and Info Section */}
          <div className="flex flex-col lg:flex-row gap-12 mt-16 md:mt-24 max-w-6xl mx-auto">

            {/* Left Column: Contact Form */}
            <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
              <h2 className="text-primary text-2xl md:text-3xl font-bold mb-4">{t("contactUs.form.title")}</h2>
              <p className="text-gray-600 mb-8 md:mb-10 text-sm md:text-base">{t("contactUs.form.desc")}</p>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {messageStatus.text && (
                  <div className={`p-4 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-500 ${messageStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {messageStatus.text}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">{t("contactUs.form.name")}</label>
                  <input
                    name="user_name"
                    type="text"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">{t("contactUs.form.phone")}</label>
                      <input
                        name="user_phone"
                        type="tel"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                      />
                    </div>
                    <div className="flex items-center ml-1 mt-3">
                      <input
                        type="checkbox"
                        id="whatsappAuth"
                        name="whatsapp_auth"
                        className="w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer flex-shrink-0"
                      />
                      <label htmlFor="whatsappAuth" className="ml-2 text-sm text-gray-600 cursor-pointer select-none whitespace-nowrap">
                        {t("contactUs.form.whatsappContact")}
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">{t("contactUs.form.email")}</label>
                    <input
                      name="user_email"
                      type="email"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary ml-1">{t("contactUs.form.messageLabel")}</label>
                  <textarea
                    name="message"
                    rows="6"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-luxury/50 transition-all resize-none text-sm md:text-base"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full md:w-auto btn-premium-primary py-3.5 px-10 rounded-2xl text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        {t("contactUs.form.sending")}
                      </>
                    ) : t("contactUs.form.submitBtn")}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Consultant and Reg Info */}
            <div className="lg:w-1/3 space-y-8">
              <h2 className="text-primary text-2xl md:text-3xl font-bold ml-2">{t("contactUs.consultants.title")}</h2>

              {/* Consultant Card */}
              <div className="bg-gray-100/50 p-8 md:p-10 rounded-[40px] border border-white shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img src={consultantImg} alt="Consultant" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-primary text-xl md:text-2xl font-bold">{consultantName}</h3>
                    <p className="text-primary/70 font-semibold text-xs md:text-sm">{consultantRole}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-10">
                  {consultantDesc}
                </p>

                <div className="flex flex-col gap-4">
                  <a 
                    href={`https://wa.me/${whatsappNum}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white border border-[#25D366] hover:border-[#20ba59] transition-all duration-300 transform active:scale-95 py-3 px-4 sm:py-3.5 sm:px-6 rounded-2xl font-bold text-sm sm:text-base"
                  >
                    {t("contactUs.consultants.whatsapp")}
                  </a>
                  <a 
                    href={`mailto:${contactEmails}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#1a355c] text-white border border-primary hover:border-[#1a355c] transition-all duration-300 transform active:scale-95 py-3 px-4 sm:py-3.5 sm:px-6 rounded-2xl font-bold text-sm sm:text-base"
                  >
                    {t("contactUs.consultants.email")}
                  </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200/50">
                  {[
                    { name: 'whatsapp', bg: 'bg-[#25D366]', hoverText: 'group-hover:text-[#25D366]', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z', url: `https://wa.me/${whatsappNum}` },
                    { name: 'facebook', bg: 'bg-[#1877F2]', hoverText: 'group-hover:text-[#1877F2]', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', url: t('socials.facebook', 'https://www.facebook.com/profile.php?id=61583714273975') },
                    { name: 'instagram', bg: 'bg-[#E4405F]', hoverText: 'group-hover:text-[#E4405F]', path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', url: t('socials.instagram', 'https://www.instagram.com/srilankavoyageeden?igsh=MWNwM2pnbXJ5N2w2OA==') },
                    { name: 'tiktok', bg: 'bg-[#000000]', hoverText: 'group-hover:text-[#000000]', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.23-1.29 4.83 4.83 0 0 1-1.29-3.23h-3.86v13.52a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.36 0 .71.07 1.04.2v-4.05a6.76 6.76 0 0 0-1.04-.08 6.76 6.76 0 0 0-6.76 6.76 6.76 6.76 0 0 0 6.76 6.76 6.76 6.76 0 0 0 6.76-6.76V7.12a8.68 8.68 0 0 0 5.2 1.63V4.89c-.66 0-1.3-.18-1.88-.53a4.79 4.79 0 0 1-1.88-1.78Z', url: t('socials.tiktok', 'https://www.tiktok.com/@srilankavoyageeden?_r=1&_t=ZS-96VdMCj41Bo') },
                    { name: 'youtube', bg: 'bg-[#FF0000]', hoverText: 'group-hover:text-[#FF0000]', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', url: t('socials.youtube', 'https://www.youtube.com/@SriLankaVoyageEden') }
                  ].map((icon) => (
                    <a 
                      key={icon.name} 
                      href={icon.url} 
                      target={icon.url !== '#' ? "_blank" : undefined}
                      rel={icon.url !== '#' ? "noopener noreferrer" : undefined}
                      className={`w-10 h-10 ${icon.bg} hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 group shadow-md`}
                    >
                      <svg 
                        className={`w-5 h-5 text-white transition-colors duration-300 ${icon.hoverText}`} 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d={icon.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Registration Card */}
              <div className="bg-primary p-8 md:p-10 rounded-[40px] text-white shadow-2xl shadow-primary/30 border border-primary/50">
                <h3 className="text-xl md:text-2xl font-bold mb-6">{t("contactUs.registration.title")}</h3>
                <div className="space-y-3 font-medium opacity-90 text-sm md:text-base">
                  <p>{t("contactUs.registration.sltda")}</p>
                  <p>{t("contactUs.registration.regNo")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maps Section */}
          <div className="mt-24 space-y-16 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Kurunegala Map */}
              <div className="space-y-6">
                <h2 className="text-primary text-3xl font-bold text-center">{t("contactUs.mapKurunegala")}</h2>
                <div className="w-full h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1717.815548545442!2d80.35759254140284!3d7.482394977206857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNo.%2064%2C%204th%20floor%2C%20Unit%2001%2C%20Siripathi%20Complex%2C%20Bauddaloka%20Rd%2C%20Kurunegala%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1778821295527!5m2!1sen!2slk"
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
                <h2 className="text-primary text-3xl font-bold text-center">{t("contactUs.mapKandy")}</h2>
                <div className="w-full h-[400px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.347146777132!2d80.63299187365601!3d7.314843613464585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368bb2537d1f7%3A0x4209f9e5c6dab6c4!2sSri%20Lanka%20Viajes%20Eden!5e0!3m2!1sen!2slk!4v1778821110221!5m2!1sen!2slk"
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
