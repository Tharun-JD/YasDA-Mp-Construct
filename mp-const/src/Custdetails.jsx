function Field({ label, required = false, placeholder = '', value = '', type = 'text' }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[0.98rem] text-slate-700 outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
      />
    </label>
  )
}

function Custdetails({ onClose }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#eef2ff] px-3 py-4 md:px-6 md:py-6">
      <div className="pointer-events-none absolute inset-0">
        <span className="animate-float absolute left-[-140px] top-[-100px] size-[320px] rounded-full bg-[#87a9ff]/30 blur-2xl" />
        <span
          className="animate-float absolute bottom-[-120px] right-[-130px] size-[360px] rounded-full bg-[#8ae5ff]/30 blur-2xl"
          style={{ animationDelay: '-3s' }}
        />
      </div>

      <div className="animate-rise relative mx-auto w-full max-w-[980px] rounded-2xl border border-slate-200 bg-white/95 shadow-[0_32px_60px_-36px_#2e3f77] backdrop-blur">
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#4f67ff] to-[#a157ff] px-4 py-4 md:px-5">
          <h1 className="font-sora text-2xl font-bold text-white">Edit Application</h1>
          <button
            type="button"
            onClick={onClose}
            className="font-sora rounded-md px-2 py-1 text-xl font-bold text-white/85 transition hover:bg-white/20 hover:text-white"
          >
            x
          </button>
        </div>

        <form className="space-y-7 p-4 md:p-5" onSubmit={(e) => e.preventDefault()}>
          <section className="animate-fade-slide space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" placeholder="Title" />
              <Field label="Name" required value="HOUSEPECKER PROPERTY SERVICE PRIVATE LIMITED" />
              <Field label="Phone" required value="+917449000454" />
              <Field label="Email" required value="cp@housepecker.com" type="email" />
              <Field label="Alternate Number" value="+91 81234 56789" />
              <Field label="Aadhaar" required value="880568500478" />
              <Field label="PAN Number" required value="AAHCH2587D" />
              <Field label="Occupation" />
              <Field label="RERA Registration Number" value="TN/Agent/0307/2025" />
              <Field label="CP Company Name/ CP Name" value="600002" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1.5">
                <span className="text-sm font-semibold text-slate-700">IS GST Applicable? *</span>
                <div className="flex items-center gap-4 rounded-lg border border-slate-300 bg-white px-3 py-2.5">
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input type="radio" name="gst" />
                    <span>Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input type="radio" name="gst" defaultChecked />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <Field label="GST Number" placeholder="GSTIN Number" />
            </div>
          </section>

          <section className="space-y-4 rounded-xl border border-[#d8e4ff] bg-[#f8fbff] p-3 md:p-4">
            <div className="rounded-lg bg-gradient-to-r from-[#0859d8] via-[#0f80d3] to-[#16bbda] px-4 py-3">
              <h2 className="font-sora text-[1.65rem] font-semibold text-white">Bank Details</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Bank Name" placeholder="Bank Name" />
              <Field label="Branch" />
              <Field label="Account Type" placeholder="Please select" />
              <Field label="IFSC Code" placeholder="eg. ICIC00000" />
              <Field label="Account Holder's Name" />
              <Field label="Account Number" placeholder="eg. 00000000" />
              <Field label="Zip / Pin Code" placeholder="eg. 4110045" />
            </div>
          </section>

          <p className="text-[1rem] font-medium text-slate-600">
            * These bank details will be used for online brokerage disbursement
          </p>
        </form>
      </div>
    </div>
  )
}

export default Custdetails
