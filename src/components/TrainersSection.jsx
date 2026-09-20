export const TrainersSection = ({ trainersList = [] }) => {
  return (
    <section id="trainers" className="py-20 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-red-500 uppercase">
            CERTIFIED MASTER COACHES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            MEET OUR EXPERT STAFF
          </h2>
          <p className="text-slate-400 text-sm">
            Certified strength coaches, powerlifting champions, and combat directors dedicated to your transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainersList.map((staff) => (
            <div
              key={staff.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all overflow-hidden group shadow-xl flex flex-col justify-between"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-amber-400 text-[10px] font-black border border-amber-500/30">
                  {staff.exp} EXP
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                    {staff.name}
                  </h3>
                  <p className="text-xs font-bold text-red-500">{staff.role}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{staff.cert}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {staff.specialties.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
