import { CheckCircle } from 'lucide-react';

export const PricingSection = ({ billingPeriod, setBillingPeriod, pricingList = [] }) => {
  return (
    <section id="pricing" className="py-20 bg-[#120406] border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-red-500 uppercase">
            TRANSPARENT MEMBERSHIPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            SELECT YOUR ARENA PASS
          </h2>

          <div className="inline-flex items-center p-1.5 rounded-xl bg-slate-900 border border-slate-800 mt-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                billingPeriod === 'monthly' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                billingPeriod === 'annual' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              ANNUAL (SAVE 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingList.map((plan) => (
            <div
              key={plan.id || plan.title}
              className={`p-8 rounded-3xl relative flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'p-1 rounded-3xl bg-gradient-to-br from-red-600/60 via-amber-500/30 to-red-600/60 shadow-2xl scale-105'
                  : 'bg-slate-900/80 border border-slate-800'
              }`}
            >
              {plan.popular ? (
                <div className="bg-[#140507] rounded-[calc(1.5rem-4px)] p-7 h-full flex flex-col justify-between relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
                    MOST POPULAR
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-wider mb-2 mt-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl sm:text-5xl font-black text-red-500">
                        {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </span>
                      <span className="text-slate-400 text-sm font-bold">/ month</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.perks.map((perk, kIdx) => (
                        <li key={kIdx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                          <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all bg-gradient-to-r from-red-600 to-amber-500 text-white hover:scale-105"
                  >
                    SELECT MEMBERSHIP
                  </a>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-wider mb-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl sm:text-5xl font-black text-red-500">
                        {billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                      </span>
                      <span className="text-slate-400 text-sm font-bold">/ month</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.perks.map((perk, kIdx) => (
                        <li key={kIdx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                          <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all bg-slate-800 hover:bg-red-600 text-white"
                  >
                    SELECT MEMBERSHIP
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
