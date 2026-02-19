import { useMemo, useState } from 'react'

const countryCodes = [
  { name: 'UAE', dial: '+971' },
  { name: 'Argentina', dial: '+54' },
  { name: 'Australia', dial: '+61' },
  { name: 'Austria', dial: '+43' },
  { name: 'Bangladesh', dial: '+880' },
  { name: 'Belgium', dial: '+32' },
  { name: 'Brazil', dial: '+55' },
  { name: 'Canada', dial: '+1' },
  { name: 'China', dial: '+86' },
  { name: 'Denmark', dial: '+45' },
  { name: 'Egypt', dial: '+20' },
  { name: 'Finland', dial: '+358' },
  { name: 'France', dial: '+33' },
  { name: 'Germany', dial: '+49' },
  { name: 'Greece', dial: '+30' },
  { name: 'Hong Kong', dial: '+852' },
  { name: 'India', dial: '+91' },
  { name: 'Indonesia', dial: '+62' },
  { name: 'Ireland', dial: '+353' },
  { name: 'Israel', dial: '+972' },
  { name: 'Italy', dial: '+39' },
  { name: 'Japan', dial: '+81' },
  { name: 'Kenya', dial: '+254' },
  { name: 'Malaysia', dial: '+60' },
  { name: 'Mexico', dial: '+52' },
  { name: 'Netherlands', dial: '+31' },
  { name: 'New Zealand', dial: '+64' },
  { name: 'Nigeria', dial: '+234' },
  { name: 'Norway', dial: '+47' },
  { name: 'Pakistan', dial: '+92' },
  { name: 'Philippines', dial: '+63' },
  { name: 'Portugal', dial: '+351' },
  { name: 'Qatar', dial: '+974' },
  { name: 'Russia', dial: '+7' },
  { name: 'Saudi Arabia', dial: '+966' },
  { name: 'Singapore', dial: '+65' },
  { name: 'South Africa', dial: '+27' },
  { name: 'South Korea', dial: '+82' },
  { name: 'Spain', dial: '+34' },
  { name: 'Sri Lanka', dial: '+94' },
  { name: 'Sweden', dial: '+46' },
  { name: 'Switzerland', dial: '+41' },
  { name: 'Thailand', dial: '+66' },
  { name: 'Turkey', dial: '+90' },
  { name: 'United Kingdom', dial: '+44' },
  { name: 'United States', dial: '+1' },
  { name: 'Vietnam', dial: '+84' },
]

const projects = ['MP Amber', 'MP Bodhi', 'MP Heights', 'MP Elite', 'MP Greenview']
const configurations = ['Studio', '1 BHK', '2 BHK', '3 BHK', 'Villa']
const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Office']

function Addleads({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    project: projects[0],
    budget: 50,
    location: '',
    configuration: configurations[1],
    propertyType: propertyTypes[0],
  })

  const budgetLabel = useMemo(() => `INR ${formData.budget} Lakh`, [formData.budget])

  if (!isOpen) {
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave?.(formData)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      project: projects[0],
      budget: 50,
      location: '',
      configuration: configurations[1],
      propertyType: propertyTypes[0],
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-[1px]">
      <div className="absolute left-3 top-3 h-[calc(100%-1.5rem)] w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-30px_#0f172a] md:left-5 md:top-5 md:h-[calc(100%-2.5rem)]">
        <div className="flex items-center justify-between bg-gradient-to-r from-[#3650c8] to-[#8b46cd] px-4 py-3">
          <h2 className="font-sora text-xl font-semibold text-white">Add Lead Form</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md text-2xl leading-none text-white/90 transition hover:bg-white/20 hover:text-white"
            aria-label="Close add lead form"
          >
            {'\u00D7'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="h-[calc(100%-3.2rem)] overflow-y-auto p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">First Name</span>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Last Name</span>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">Phone Number</span>
              <div className="grid grid-cols-[minmax(120px,220px)_1fr] gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="rounded-lg border border-slate-300 px-2 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
                >
                  {countryCodes.map((country) => (
                    <option key={`${country.name}-${country.dial}`} value={country.dial}>
                      {country.name} ({country.dial})
                    </option>
                  ))}
                </select>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
                />
              </div>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Project</span>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              >
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Location</span>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Area"
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1.5 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Budget Range</span>
                <span className="text-sm font-semibold text-brand-blue">{budgetLabel}</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="h-2 cursor-pointer appearance-none rounded-lg bg-slate-200 accent-brand-blue"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Configuration Type</span>
              <select
                name="configuration"
                value={formData.configuration}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              >
                {configurations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5">
              <span className="text-sm font-semibold text-slate-700">Property Type</span>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-sky-300 focus:ring-3 focus:ring-sky-100"
              >
                {propertyTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_#1e40af] transition hover:-translate-y-0.5 hover:bg-[#1f37a2]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addleads

