export const ClassesSection = ({ classesList = [], selectedCategory, setSelectedCategory }) => {
  const filteredClasses = selectedCategory === 'All'
    ? classesList
    : classesList.filter((c) => c.category === selectedCategory);

  return (
    <section id="classes" className="py-20 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-red-500 uppercase block mb-1">
              HIGH INTENSITY PROGRAMMING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              FEATURED GYM CLASSES
            </h2>
          </div>

          <div className="w-full md:w-auto max-w-full flex items-center gap-2 overflow-x-auto pb-2 pt-1 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {['All', 'Strength', 'Crossfit', 'Combat'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all uppercase whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  {item.intensity}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block">
                    {item.category} • {item.duration}
                  </span>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
                  <a
                    href="#contact"
                    className="px-4 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition-all"
                  >
                    BOOK PASS
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
