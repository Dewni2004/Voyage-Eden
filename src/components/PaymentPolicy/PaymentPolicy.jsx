import React from 'react';
import { useTranslation } from 'react-i18next';

const PaymentPolicy = () => {
  const { t } = useTranslation();
  const policyData = t("paymentPolicy", { returnObjects: true });

  const getItems = (prefix) => {
    return Object.keys(policyData)
      .filter(key => key.startsWith(prefix))
      .sort((a, b) => parseInt(a.replace(prefix, '')) - parseInt(b.replace(prefix, '')))
      .map(key => policyData[key])
      .filter(val => val && val.trim() !== '');
  };

  const payItems = getItems('pay');
  const termItems = getItems('term');
  const cancItems = getItems('canc');
  const cancNoteItems = getItems('cancNote');

  // Since cancItems might include cancNote1 because cancNote starts with canc, we need to be more precise:
  // Actually, we can just use regex:
  const getExactItems = (prefix) => {
    return Object.keys(policyData)
      .filter(key => new RegExp(`^${prefix}\\d+$`).test(key))
      .sort((a, b) => parseInt(a.replace(prefix, '')) - parseInt(b.replace(prefix, '')))
      .map(key => policyData[key])
      .filter(val => val && val.trim() !== '');
  };

  const paymentItems = getExactItems('pay');
  const bookingTermItems = getExactItems('term');
  const cancellationItems = getExactItems('canc');
  const cancellationNoteItems = getExactItems('cancNote');

  const renderSection = (titleKey, items) => {
    const title = policyData[titleKey];
    if (!title || !items || items.length === 0) return null;

    return (
      <div>
        <h3 className="text-xl font-bold mb-6 text-black">{title}</h3>
        <ul className="space-y-4 ml-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">{t("paymentPolicy.title")}</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner space-y-12">
        {renderSection('paymentMethod', paymentItems)}
        {renderSection('bookingTerms', bookingTermItems)}
        {renderSection('cancellation', cancellationItems)}
        {renderSection('cancellationNote', cancellationNoteItems)}
      </div>
    </section>
  );
};

export default PaymentPolicy;
