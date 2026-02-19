function Login({ onSignIn }) {
  return (
    <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto] overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,62,175,0.12),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(240,128,40,0.12),transparent_34%)]" />
        <span className="animate-pulse absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/40 to-transparent" />
        <span
          className="animate-bounce absolute -left-20 top-20 size-[300px] rounded-full bg-[#78a9ff]/35 blur-[2px]"
          style={{ animationDuration: '2.2s' }}
        />
        <span
          className="animate-bounce absolute -right-20 -top-10 size-[340px] rounded-full bg-[#ffcf9f]/35 blur-[2px]"
          style={{ animationDelay: '-0.8s', animationDuration: '3s' }}
        />
        <span
          className="animate-bounce absolute bottom-[-110px] right-[16%] size-[260px] rounded-full bg-[#9b8dff]/35 blur-[2px]"
          style={{ animationDelay: '-1.6s', animationDuration: '2.6s' }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between border-b border-slate-200 px-5 py-4 backdrop-blur md:px-14 md:py-5">
        <div className="flex items-center gap-3">
          <div className="font-sora text-3xl leading-none font-extrabold tracking-[-0.04em] text-brand-blue">MP</div>
          <div className="grid leading-none">
            <strong className="text-sm text-brand-blue">Developers</strong>
            <span className="text-[11px] tracking-[0.2em] text-brand-orange">TRUST FOREVER</span>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Register as Channel Partner
          </button>
          <button
            type="button"
            className="rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Log in
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-[94vw] max-w-[1320px] gap-9 py-5 lg:grid-cols-[minmax(350px,540px)_1fr] lg:items-center">
        <section className="animate-rise relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/90 via-white/85 to-[#eef3ff]/85 p-4 shadow-[0_30px_70px_-35px_#1d2f68] backdrop-blur-xl md:p-7 lg:order-2 lg:ml-auto lg:w-full">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-14 -top-20 size-44 rounded-full bg-[#8fb7ff]/30 blur-2xl [animation:float_11s_ease-in-out_infinite]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 size-44 rounded-full bg-[#ffc997]/35 blur-2xl [animation:float_13s_ease-in-out_infinite]"
            style={{ animationDelay: '-2s' }}
          />
          <p className="text-[0.98rem] font-bold tracking-[0.03em] text-sky-600">Welcome to MP Developers</p>
          <h1 className="font-sora mt-2 bg-gradient-to-r from-slate-900 via-brand-blue to-slate-900 bg-clip-text text-[clamp(1.5rem,2.3vw,2rem)] leading-tight font-bold text-transparent">
            Build bold partnerships with confidence.
          </h1>
          <p className="mb-6 mt-2 max-w-[48ch] text-[1.02rem] leading-relaxed text-slate-600">
            We value your partnership and are excited to provide the resources you need for successful collaboration.
          </p>

          <form
            className="grid gap-2.5"
            onSubmit={(e) => {
              e.preventDefault()
              onSignIn?.()
            }}
          >
            <label htmlFor="email" className="text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />

            <label htmlFor="password" className="text-[0.94rem] font-semibold tracking-[0.01em] text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-3 text-[0.98rem] shadow-[0_8px_20px_-18px_#1e3a8a] outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />

            <label className="mt-1 inline-flex items-center gap-2 text-[0.95rem] text-slate-700" htmlFor="stay-logged">
              <input id="stay-logged" type="checkbox" className="size-4 accent-sky-600" />
              <span>Keep me logged in</span>
            </label>

            <button
              className="group relative mt-2 overflow-hidden rounded-xl bg-[#1e40af] px-3 py-3 text-base font-bold text-white shadow-[0_18px_35px_-20px_#1d4ed8] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-[0_24px_45px_-20px_#1d4ed8]"
              type="submit"
            >
              <span className="pointer-events-none absolute -left-10 top-0 h-full w-8 -skew-x-12 bg-white/35 opacity-0 transition group-hover:left-[110%] group-hover:opacity-100 group-hover:duration-700" />
              Sign In
            </button>

            <div className="mt-3 grid gap-1">
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Login with OTP instead
              </a>
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Forgot your password?
              </a>
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Didn&apos;t receive confirmation instructions?
              </a>
              <a href="#" className="text-[0.95rem] text-brand-blue/80 transition hover:text-brand-blue font-bold">
                Didn&apos;t receive unlock instructions?
              </a>
            </div>

            <p className="mt-4 text-[0.95rem] text-brand-blue/80 font-bold">
              Don&apos;t have account ?{' '}
              <a href="#" className="font-bold text-brand-orange transition hover:text-brand-blue">
                Sign Up
              </a>
            </p>
          </form>
        </section>

        <section aria-hidden="true" className="animate-fade-slide grid min-h-[320px] place-items-center lg:order-1 lg:min-h-[520px]">
          <div className="select-none text-center">
            <div className="flex items-end justify-center gap-2 leading-none md:gap-3">
              <span className="animate-rise font-sora text-[clamp(6.8rem,22vw,15rem)] font-bold tracking-[-0.06em] text-brand-blue [animation-delay:120ms]">
                m
              </span>
              <span className="animate-rise font-sora translate-y-1 text-[clamp(6.2rem,20vw,13rem)] font-bold tracking-[-0.06em] text-brand-orange [animation-delay:220ms]">
                P
              </span>
            </div>
            <div className="animate-rise font-sora mt-1 text-[clamp(2.1rem,6vw,5.4rem)] leading-[0.95] font-extrabold tracking-[-0.01em] text-[#3441a0] [animation-delay:320ms]">
              Developers
            </div>
            <div className="animate-rise font-sora mt-3 flex justify-center gap-4 text-[clamp(0.95rem,1.6vw,1.7rem)] font-bold tracking-[0.16em] md:gap-6 md:tracking-[0.22em] [animation-delay:420ms]">
              <span className="text-[#3342a8]">TRUST</span>
              <span className="text-brand-orange">FOREVER</span>
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="relative z-10 flex flex-col gap-2 border-t border-slate-200 px-5 py-3 text-[0.88rem] text-slate-500 md:flex-row md:justify-between md:px-14 md:text-[0.95rem]">
        <span>MP Developers is registered &amp; is available on https://rera.tn.gov.in.</span>
        <span>English | Powered by Sell.do</span>
      </footer> */}
    </div>
  )
}

export default Login
