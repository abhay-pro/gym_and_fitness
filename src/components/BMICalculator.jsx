export const BMICalculator = ({ heightCm, setHeightCm, weightKg, setWeightKg, calculatedBMI }) => {
  return (
    <section id="bmi" className="py-16 sm:py-20 bg-[#120406] border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">
              REAL-TIME FITNESS ENGINE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white">
              INTERACTIVE BMI & MACRO CALCULATOR
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Tune your daily protein targets and monitor your athletic body mass index in real-time.
            </p>

            <div className="space-y-6 pt-2">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span className="text-slate-400">HEIGHT</span>
                  <span className="text-red-400 font-mono text-base">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 touch-pan-x"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span className="text-slate-400">WEIGHT</span>
                  <span className="text-amber-400 font-mono text-base">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 touch-pan-x"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-1 rounded-3xl bg-gradient-to-br from-red-600/40 via-red-900/20 to-amber-500/30 shadow-2xl">
            <div className="bg-[#140507] rounded-[calc(1.5rem-4px)] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    YOUR BMI INDEX
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-red-500 font-mono">{calculatedBMI}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    BODY STATUS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase">
                    {calculatedBMI < 18.5
                      ? 'Underweight'
                      : calculatedBMI < 25
                      ? 'Optimal Athletic Zone'
                      : calculatedBMI < 30
                      ? 'Overweight'
                      : 'Obese'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide">RECOMMENDED DAILY PROTEIN</h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">HYPERTROPHY TARGET</span>
                  <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">{(weightKg * 2.2).toFixed(0)}g / day</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
