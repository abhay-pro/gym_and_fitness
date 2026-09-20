export const EquipmentArena = ({ equipmentList = [] }) => {
  return (
    <section id="equipment" className="py-20 bg-[#120406] border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black tracking-widest text-red-500 uppercase">
            WORLD-CLASS HEAVY MACHINERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            HEAVY Olympic EQUIPMENT
          </h2>
          <p className="text-slate-400 text-sm">
            Engineered for hyper-growth and precision lifting. Equipped with custom Eleiko steel and Hammer Strength racks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipmentList.map((item) => (
            <div
              key={item.id || item.title}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 transition-all overflow-hidden group shadow-xl"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase">
                  {item.count}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
