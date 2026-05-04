import React from 'react';

const PaymentPolicy = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-primary text-3xl md:text-4xl font-bold mb-10">Payment method and cancellation policy</h2>
      
      <div className="bg-[#f8fbff] rounded-[40px] p-8 md:p-16 border border-gray-100 shadow-inner space-y-12">
        {/* Payment Method */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Payment method:</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Free of charge bank transfer option.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Credit/Debit Card Payment – A 2% card processing fee will apply.</span>
            </li>
          </ul>
        </div>

        {/* Booking Terms */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Booking Terms</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">A 40% deposit is required at the time of booking to confirm your reservation.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">The remaining 60% balance must be paid no later than 30 days before arrival.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Upon receiving the deposit, a confirmation receipt will be issued. An official invoice follows upon full payment.</span>
            </li>
          </ul>
        </div>

        {/* Cancellation Policy */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Cancellation Policy</h3>
          <ul className="space-y-4 ml-4">
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Up to 45 days: 100% of the deposit refunded.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">44 to 31 days: 50% penalty on the deposit.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Within 30 days: Deposit is non-refundable.</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 font-medium text-[15px] leading-relaxed">Note: All cancellations are subject to a $120 per person administrative fee.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PaymentPolicy;
