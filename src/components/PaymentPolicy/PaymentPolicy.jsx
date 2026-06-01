import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentPolicy = () => {
  const { t } = useTranslation();
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">{t("paymentPolicy.title")}</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner space-y-12">
        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">{t("paymentPolicy.paymentMethod")}</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.pay1")}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.pay2")}</span>
            </li>
          </ul>
        </div>

        {/* Booking Terms */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">{t("paymentPolicy.bookingTerms")}</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.term1")}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.term2")}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.term3")}</span>
            </li>
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">{t("paymentPolicy.cancellation")}</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.canc1")}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.canc2")}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.canc3")}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{t("paymentPolicy.canc4")}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PaymentPolicy;
