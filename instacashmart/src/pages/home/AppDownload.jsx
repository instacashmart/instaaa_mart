export function AppDownload() {
  return (
    <section className="reveal max-w-7xl mx-3 sm:mx-4 xl:mx-auto mt-6 rounded-2xl py-10 bg-dark-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-400 bg-brand-900/60 border border-brand-500/30 px-3 py-1 rounded-full">
              Anytime, Anywhere Selling
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-3 leading-tight">
              Sell Faster with the InstaCashMart Mobile App!
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Run automated hardware diagnostics directly through our smart app
              camera & sensors. Get live technician GPS tracking and an extra{" "}
              <strong>₹500 first-time seller credit</strong>.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-3 rounded-2xl transition"
              >
                <i className="fa-brands fa-apple text-3xl" />
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider block text-slate-400">
                    Download on
                  </span>
                  <span className="text-xs font-bold block text-white">
                    Apple App Store
                  </span>
                </div>
              </button>
              <button
                type="button"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-3 rounded-2xl transition"
              >
                <i className="fa-brands fa-google-play text-2xl text-brand-400" />
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider block text-slate-400">
                    Get it on
                  </span>
                  <span className="text-xs font-bold block text-white">
                    Google Play Store
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-64 bg-slate-800 border-4 border-slate-700 rounded-3xl p-4 shadow-2xl relative text-center">
              <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto mb-4" />
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700/60 mb-3">
                <i className="fa-solid fa-qrcode text-6xl text-brand-400 my-2" />
                <p className="text-[10px] text-slate-400">
                  Scan QR to install app
                </p>
              </div>
              <div className="bg-brand-500/20 text-brand-300 border border-brand-500/30 p-2.5 rounded-xl text-xs font-bold">
                ⚡ Instant 2-Hr Pickup Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
