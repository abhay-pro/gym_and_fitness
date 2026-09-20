import { MapPin, Phone, Mail, Lock, RefreshCw, Send, CheckCircle, Loader2 } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const ContactFormSection = ({
  formData,
  setFormData,
  captchaProblem,
  generateCaptcha,
  cooldownTime,
  formErrors,
  submitSuccess,
  setSubmitSuccess,
  isSubmitting,
  handleFormSubmit
}) => {
  return (
    <section id="contact" className="py-16 sm:py-20 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">
              SECURE REGISTRATION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white">
              CLAIM YOUR FREE DAY PASS
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Step into {APP_CONFIG.shortName} today. Our multi-layer security system guarantees confidential data protection.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 shrink-0" />
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-white">LOCATION</h5>
                  <p className="text-[11px] sm:text-xs text-slate-400">{APP_CONFIG.contact.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-white">CALL DESK</h5>
                  <p className="text-[11px] sm:text-xs text-slate-400">{APP_CONFIG.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0" />
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-white">EMAIL SUPPORT</h5>
                  <p className="text-[11px] sm:text-xs text-slate-400">{APP_CONFIG.contact.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-1 rounded-3xl bg-gradient-to-br from-red-600/40 via-red-900/20 to-amber-500/30 shadow-2xl">
            <div className="bg-[#140507] rounded-[calc(1.5rem-4px)] p-6 sm:p-10">
              {submitSuccess ? (
                <div className="text-center py-8 sm:py-12 space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">PASS CONFIRMED!</h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Welcome, <strong className="text-red-400">{submitSuccess.name}</strong>. Your API reference code is{' '}
                    <span className="text-amber-400 font-mono font-bold block sm:inline mt-1 sm:mt-0">{submitSuccess.refId}</span>. Show this at our front desk.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase transition-all"
                  >
                    REGISTER ANOTHER PASS
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="websiteHoneypot"
                    value={formData.websiteHoneypot}
                    onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base sm:text-sm focus:border-red-500 outline-none transition-colors"
                      />
                      {formErrors.fullName && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.fullName}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base sm:text-sm focus:border-red-500 outline-none transition-colors"
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base sm:text-sm focus:border-red-500 outline-none transition-colors"
                    />
                    {formErrors.phone && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.phone}</span>}
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" /> HUMAN VERIFICATION
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] p-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Refresh
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-black text-amber-400 font-mono">
                        {captchaProblem.num1} + {captchaProblem.num2} =
                      </span>
                      <input
                        type="number"
                        value={formData.userCaptchaAnswer}
                        onChange={(e) => setFormData({ ...formData, userCaptchaAnswer: e.target.value })}
                        placeholder="?"
                        className="w-20 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-base sm:text-sm text-center font-bold focus:border-red-500 outline-none"
                      />
                    </div>
                    {formErrors.userCaptchaAnswer && (
                      <span className="text-[10px] text-red-500 block">{formErrors.userCaptchaAnswer}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cooldownTime > 0}
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : cooldownTime > 0 ? (
                      `PLEASE WAIT (${cooldownTime}s)`
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> CLAIM FREE DAY PASS
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
