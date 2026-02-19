function About({ onAddLead, onBackToLogin }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eceff4]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="animate-float absolute -left-24 top-24 size-[320px] rounded-full bg-brand-blue/15 blur-3xl" />
        <span
          className="animate-float absolute -right-24 bottom-10 size-[300px] rounded-full bg-brand-orange/20 blur-3xl"
          style={{ animationDelay: '-3s' }}
        />
      </div>

      <header className="relative z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 w-[94vw] max-w-[1320px] items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-sora text-3xl font-extrabold tracking-[-0.05em] text-brand-blue">MP</div>
            <div className="leading-none">
              <div className="text-sm font-bold text-brand-blue">Developers</div>
              <div className="text-[10px] tracking-[0.2em] text-brand-orange">TRUST FOREVER</div>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-[1.06rem] md:flex">
            <a className="font-semibold text-slate-700" href="#">Dashboard</a>
            <a className="text-slate-600 hover:text-brand-blue" href="#">Lead Activities</a>
            <a className="text-slate-600 hover:text-brand-blue" href="#">Application Form</a>
            <a className="text-slate-600 hover:text-brand-blue" href="#">More</a>
            <button
              type="button"
              onClick={onBackToLogin}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-slate-600 transition hover:text-brand-blue"
            >
              Welcome Silambarasan R
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-[94vw] max-w-[1320px] py-8">
        <section className="animate-rise overflow-hidden rounded-xl bg-gradient-to-r from-[#6366f1] via-[#7e67eb] to-[#a855f7] px-5 py-8 text-center text-white shadow-[0_30px_65px_-35px_#5b61d9] md:px-8 md:py-10">
          <h1 className="font-sora text-[clamp(1.8rem,2.6vw,3rem)] font-semibold">Welcome Silambarasan R (Test Company)</h1>
          <p className="mt-3 text-[1.45rem] text-white/90">Vendor Code: SILAMB0077</p>
          <p className="mx-auto mt-4 max-w-[840px] text-[1.05rem] leading-relaxed text-white/90 md:text-[1.15rem]">
            Thank you for being a valued channel partner. We are committed to your success. Together, we will achieve
            great results in the real estate market.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <div className="animate-fade-slide rounded-lg bg-white px-10 py-7 text-brand-blue shadow-lg">
              <div className="mx-auto mb-2 grid size-10 place-items-center rounded-lg border-2 border-brand-blue text-xl">+</div>
              <div className="text-[1.02rem] font-medium">Add Leads</div>
            </div>
            <div className="animate-fade-slide rounded-lg bg-white px-10 py-7 text-brand-blue shadow-lg [animation-delay:160ms]">
              <div className="mx-auto mb-2 grid size-10 place-items-center rounded-lg border-2 border-brand-blue text-xl">Rs</div>
              <div className="text-[1.02rem] font-medium">Track Lead Activities</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onAddLead}
            className="mt-8 rounded-md bg-slate-700 px-12 py-2.5 text-[1.35rem] font-semibold text-white transition hover:bg-brand-blue"
          >
            Add Lead
          </button>
        </section>

        <section className="animate-rise mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_-35px_#334155] [animation-delay:160ms]">
          <div className="flex items-center justify-between bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-5 py-3">
            <h2 className="font-sora text-[1.9rem] text-white">Collaterals</h2>
            <a href="#" className="text-[1.05rem] text-white/90 hover:text-white">View All</a>
          </div>
          <div className="p-4">
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[1.45rem] text-slate-700">MP Amber</div>
              <div className="px-4 py-3 text-[1.45rem] text-slate-700">MP BODHI</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About
