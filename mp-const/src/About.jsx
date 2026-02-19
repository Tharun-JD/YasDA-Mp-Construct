import { useEffect, useState } from 'react'
import Addleads from './Addleads'

const LEAD_ACTIVITY_KEY = 'mp-const-lead-activities'
const LEAD_VIEW_KEY = 'mp-const-about-view'
const LEAD_SELECTED_KEY = 'mp-const-about-selected-lead'

function getInitialLeadView() {
  const savedView = window.sessionStorage.getItem(LEAD_VIEW_KEY)
  if (savedView === 'lead-activities' || savedView === 'customer-detail') {
    return savedView
  }
  return 'dashboard'
}

function getInitialSelectedLeadId() {
  const raw = window.sessionStorage.getItem(LEAD_SELECTED_KEY)
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isNaN(parsed) ? null : parsed
}

function DropdownChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 transition-transform duration-200 group-open:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 4h8l4 4v12H8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4v4h4M11 13h6M11 17h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function About({ onOpenApplicationForm, onBackToLogin }) {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [leadActivities, setLeadActivities] = useState([])
  const [leadsLoaded, setLeadsLoaded] = useState(false)
  const [activeView, setActiveView] = useState(getInitialLeadView)
  const [openActionMenuId, setOpenActionMenuId] = useState(null)
  const [selectedLeadId, setSelectedLeadId] = useState(getInitialSelectedLeadId)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [customerHeaderMenuOpen, setCustomerHeaderMenuOpen] = useState(false)
  const [customerDetailTab, setCustomerDetailTab] = useState('show')
  const [followUpActionMenuId, setFollowUpActionMenuId] = useState(null)
  const [isFollowUpDrawerOpen, setIsFollowUpDrawerOpen] = useState(false)
  const [editingFollowUpId, setEditingFollowUpId] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [followUpForm, setFollowUpForm] = useState({
    subject: '',
    description: '',
    reminderBefore: '15 mins',
    scheduledOn: '',
    status: 'Pending',
  })

  const selectedLead = leadActivities.find((lead) => lead.id === selectedLeadId) || null

  useEffect(() => {
    const savedLeads = window.localStorage.getItem(LEAD_ACTIVITY_KEY)
    if (savedLeads) {
      setLeadActivities(JSON.parse(savedLeads))
    }
    setLeadsLoaded(true)
  }, [])

  useEffect(() => {
    window.sessionStorage.setItem(LEAD_VIEW_KEY, activeView)
  }, [activeView])

  useEffect(() => {
    if (selectedLeadId) {
      window.sessionStorage.setItem(LEAD_SELECTED_KEY, String(selectedLeadId))
      return
    }
    window.sessionStorage.removeItem(LEAD_SELECTED_KEY)
  }, [selectedLeadId])

  useEffect(() => {
    if (!leadsLoaded) return
    if (activeView === 'customer-detail' && !selectedLead) {
      setActiveView('lead-activities')
      setSelectedLeadId(null)
    }
  }, [activeView, selectedLead, leadsLoaded])

  useEffect(() => {
    if (!selectedLeadId) return
    const lead = leadActivities.find((item) => item.id === selectedLeadId)
    if (!lead || (lead.followUpItems && lead.followUpItems.length > 0)) return

    const nextLeads = leadActivities.map((item) =>
      item.id === selectedLeadId
        ? {
            ...item,
            followUpItems: [
              {
                id: `${item.id}-init`,
                subject: 'Initial Contact',
                description: 'Lead created and awaiting first follow up.',
                reminderBefore: '15 mins',
                scheduledOn: new Date().toISOString().slice(0, 16),
                status: item.countStatus || 'Pending',
              },
            ],
          }
        : item
    )
    persistLeads(nextLeads)
  }, [selectedLeadId, leadActivities])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target instanceof Element && event.target.closest('[data-dots-menu-root="true"]')) {
        return
      }
      setOpenActionMenuId(null)
      setCustomerHeaderMenuOpen(false)
      setFollowUpActionMenuId(null)
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [])

  const persistLeads = (nextLeads) => {
    setLeadActivities(nextLeads)
    window.localStorage.setItem(LEAD_ACTIVITY_KEY, JSON.stringify(nextLeads))
  }

  const handleSaveLead = (leadData) => {
    const now = new Date()
    const newLead = {
      id: Date.now(),
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      name: `${leadData.firstName} ${leadData.lastName}`.trim(),
      email: leadData.email,
      phone: `${leadData.countryCode} ${leadData.phone}`.trim(),
      project: leadData.project,
      budget: `INR ${leadData.budget} Lakh`,
      location: leadData.location || '-',
      configuration: leadData.configuration,
      propertyType: leadData.propertyType,
      sellDoLeadId: `SD-${Date.now().toString().slice(-7)}`,
      leadStage: 'Fresh',
      leadStatus: 'Already Exists',
      countStatus: 'Pending',
      followUps: 0,
      registeredAt: now.toLocaleDateString(),
      leadValidityPeriod: '30 Days',
      followUpItems: [
        {
          id: `${Date.now()}-init`,
          subject: 'Initial Contact',
          description: 'Lead created and awaiting first follow up.',
          reminderBefore: '15 mins',
          scheduledOn: now.toISOString().slice(0, 16),
          status: 'Pending',
        },
      ],
    }

    persistLeads([newLead, ...leadActivities])
    setIsAddLeadOpen(false)
  }

  const handleAddFollow = (leadId) => {
    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== leadId) {
        return lead
      }

      const nextCount = (lead.followUps || 0) + 1
      return {
        ...lead,
        followUps: nextCount,
        countStatus: `${nextCount} Follow-up`,
        leadStage: 'Follow-up',
      }
    })

    persistLeads(nextLeads)
    setOpenActionMenuId(null)
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2200)
  }

  const handleFollowUpClick = (followUpId) => {
    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      const nextItems = (lead.followUpItems || []).map((item) =>
        item.id === followUpId ? { ...item, status: 'Followed Up' } : item
      )
      return { ...lead, followUpItems: nextItems, countStatus: 'Followed Up' }
    })
    persistLeads(nextLeads)
    setFollowUpActionMenuId(null)
    showToast('Follow up updated.')
  }

  const handleOpenUpdateFollowUp = (item) => {
    setEditingFollowUpId(item.id)
    setFollowUpForm({
      subject: item.subject || '',
      description: item.description || '',
      reminderBefore: item.reminderBefore || '15 mins',
      scheduledOn: item.scheduledOn || '',
      status: item.status || 'Pending',
    })
    setFollowUpActionMenuId(null)
    setIsFollowUpDrawerOpen(true)
  }

  const handleFollowUpFormChange = (e) => {
    const { name, value } = e.target
    setFollowUpForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveFollowUpStatus = (e) => {
    e.preventDefault()
    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      const nextItems = (lead.followUpItems || []).map((item) =>
        item.id === editingFollowUpId ? { ...item, ...followUpForm } : item
      )
      return { ...lead, followUpItems: nextItems, countStatus: followUpForm.status }
    })
    persistLeads(nextLeads)
    setIsFollowUpDrawerOpen(false)
    setEditingFollowUpId(null)
    showToast('Follow up status saved successfully.')
  }

  const handleOpenAddFollowUpTab = () => {
    setFollowUpForm({
      subject: '',
      description: '',
      reminderBefore: '15 mins',
      scheduledOn: new Date().toISOString().slice(0, 16),
      status: 'Pending',
    })
    setCustomerDetailTab('add-follow-up')
    setCustomerHeaderMenuOpen(false)
  }

  const handleCreateFollowUp = (e) => {
    e.preventDefault()
    const nextItem = {
      id: `${Date.now()}-manual`,
      subject: followUpForm.subject,
      description: followUpForm.description,
      reminderBefore: followUpForm.reminderBefore,
      scheduledOn: followUpForm.scheduledOn,
      status: followUpForm.status,
    }

    const nextLeads = leadActivities.map((lead) => {
      if (lead.id !== selectedLeadId) return lead
      return {
        ...lead,
        followUpItems: [...(lead.followUpItems || []), nextItem],
        countStatus: followUpForm.status,
      }
    })

    persistLeads(nextLeads)
    setCustomerDetailTab('show')
    showToast('Follow up added successfully.')
  }

  const visibleLeads = leadActivities.filter((lead) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'fresh') return lead.leadStage === 'Fresh'
    if (activeFilter === 'follow-up') return lead.leadStage === 'Follow-up'
    if (activeFilter === 'pending') return lead.countStatus === 'Pending'
    return true
  })

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,62,175,0.12),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(240,128,40,0.12),transparent_34%)]" />
        <span className="animate-pulse absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/40 to-transparent" />
        <span
          className="animate-bounce absolute -left-28 top-28 size-[360px] rounded-full bg-[#77e3ff]/30 blur-[2px]"
          style={{ animationDuration: '3.4s' }}
        />
        <span
          className="animate-bounce absolute -right-28 -top-20 size-[320px] rounded-full bg-[#b7c4ff]/35 blur-[2px]"
          style={{ animationDelay: '-1.2s', animationDuration: '2.4s' }}
        />
        <span
          className="animate-bounce absolute bottom-[-130px] right-[10%] size-[300px] rounded-full bg-[#ffc3dd]/32 blur-[2px]"
          style={{ animationDelay: '-2.1s', animationDuration: '3.1s' }}
        />
      </div>

      <header className="relative z-10 border-b border-white/60 bg-white/80 shadow-[0_16px_40px_-34px_#1e293b] backdrop-blur-xl">
        <div className="mx-auto flex h-18 w-[94vw] max-w-[1320px] items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-sora text-3xl font-extrabold tracking-[-0.05em] text-brand-blue">MP</div>
            <div className="leading-none">
              <div className="text-sm font-bold text-brand-blue">Developers</div>
              <div className="text-[10px] tracking-[0.2em] text-brand-orange">TRUST FOREVER</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 text-[1.02rem] md:flex">
            <button
              type="button"
              onClick={() => {
                setActiveView('dashboard')
                setOpenActionMenuId(null)
              }}
              className={`nav-link-fancy animate-nav-enter ${activeView === 'dashboard' ? 'text-brand-blue' : 'text-slate-700'}`}
              style={{ animationDelay: '120ms' }}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveView('lead-activities')
                setOpenActionMenuId(null)
              }}
              className={`nav-link-fancy animate-nav-enter ${activeView === 'lead-activities' ? 'text-brand-blue' : 'text-slate-700'}`}
              style={{ animationDelay: '210ms' }}
            >
              Lead Activities
            </button>

            <details className="group relative animate-nav-enter" style={{ animationDelay: '300ms' }}>
              <summary className="nav-link-fancy flex cursor-pointer list-none items-center gap-1.5 text-slate-700">
                <span>Application Form</span>
                <DropdownChevron />
              </summary>
              <div className="absolute right-0 top-11 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={onOpenApplicationForm}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  Open Application
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(true)}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  New Lead Form
                </button>
              </div>
            </details>

            <details className="group relative animate-nav-enter" style={{ animationDelay: '390ms' }}>
              <summary className="nav-link-fancy flex cursor-pointer list-none items-center gap-1.5 text-slate-700">
                <span>More</span>
                <DropdownChevron />
              </summary>
              <div className="absolute right-0 top-11 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100">Campaigns</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100">Reports</a>
                <a href="#" className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100">Settings</a>
              </div>
            </details>

            <div className="flex items-center gap-2 animate-nav-enter" style={{ animationDelay: '480ms' }}>
              <button
                type="button"
                onClick={() => onBackToLogin?.()}
                className="rounded-lg border border-rose-200 bg-white px-4 py-1.5 text-sm font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-50 hover:shadow-md"
              >
                Log Out
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="relative isolate z-10 mx-auto w-[94vw] max-w-[1320px] py-8">
        {activeView === 'dashboard' && (
          <>
            <section className="hero-shimmer animate-rise overflow-hidden rounded-2xl bg-[linear-gradient(130deg,#3f52c4_0%,#5f62da_40%,#8f47cc_100%)] px-5 py-8 text-center text-white shadow-[0_30px_65px_-35px_#4450c6] md:px-8 md:py-10">
              <h1 className="font-sora text-[clamp(1.8rem,2.6vw,3rem)] font-semibold tracking-[-0.02em]">Welcome (Test Company)</h1>
              <p className="mt-3 text-[1.45rem] text-white/90">Vendor Code: Test0077</p>
              <p className="mx-auto mt-4 max-w-[840px] text-[1.05rem] leading-relaxed text-white/90 md:text-[1.15rem]">
                Thank you for being a valued channel partner. We are committed to your success. Together, we will
                achieve great results in the real estate market.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                <div className="glass-panel hover-lift animate-fade-slide rounded-xl px-10 py-7 text-brand-blue shadow-lg">
                  <div className="mx-auto mb-2 grid size-10 place-items-center rounded-lg border-2 border-brand-blue/70 text-xl">+</div>
                  <div className="text-[1.02rem] font-medium">Add Leads</div>
                </div>
                <div className="glass-panel hover-lift animate-fade-slide rounded-xl px-10 py-7 text-brand-blue shadow-lg [animation-delay:160ms]">
                  <div className="mx-auto mb-2 grid size-10 place-items-center rounded-lg border-2 border-brand-blue/70 text-xl">Rs</div>
                  <div className="text-[1.02rem] font-medium">Track Lead Activities</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddLeadOpen(true)}
                className="mt-8 rounded-lg bg-slate-900/75 px-12 py-2.5 text-[1.35rem] font-semibold text-white shadow-[0_16px_30px_-20px_#020617] transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                Add Lead
              </button>
            </section>

            <section className="animate-rise mt-10 overflow-hidden rounded-2xl border border-[#d8dafe] bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(240,236,255,0.86))] shadow-[0_24px_58px_-38px_#4f46e5] backdrop-blur-lg [animation-delay:160ms]">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#4f5fd6] to-[#9a48d0] px-5 py-3">
                <h2 className="font-sora text-[1.9rem] text-white">Collaterals</h2>
                <a href="#" className="nav-link-soft text-[1.02rem] text-white/90 hover:text-white">View All</a>
              </div>
              <div className="p-4">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-[1.45rem] text-slate-700 transition hover:bg-slate-100">MP Amber</div>
                  <div className="px-4 py-3 text-[1.45rem] text-slate-700 transition hover:bg-slate-50">MP BODHI</div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'lead-activities' && (
          <section className="animate-rise relative isolate overflow-visible rounded-2xl border border-cyan-200/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(224,247,255,0.84))] shadow-[0_24px_58px_-38px_#0891b2] backdrop-blur-lg">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -top-10 left-10 size-36 rounded-full bg-sky-100/45 blur-3xl" />
              <span className="absolute right-0 top-24 size-28 rounded-full bg-cyan-100/35 blur-3xl animate-float" style={{ animationDelay: '-2.5s' }} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-100 bg-[linear-gradient(130deg,rgba(224,247,255,0.75),rgba(255,255,255,0.84))] px-5 py-3">
              <h2 className="font-sora flex items-center gap-2 text-[1.45rem] font-semibold text-slate-800">
                <span>Lead Activities</span>
              </h2>
              <div className="relative flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-[#5e63b8] transition hover:bg-slate-50"
                >
                  Total : {visibleLeads.length}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(true)}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#5e63b8] transition hover:bg-slate-50"
                >
                  Add Lead
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilterMenu((prev) => !prev)}
                  aria-label="Filter leads"
                  className="grid size-10 place-items-center rounded-md border border-slate-300 bg-white text-[#5e63b8] transition hover:bg-slate-50"
                >
                  <FilterIcon />
                </button>

                {showFilterMenu && (
                  <div className="absolute right-0 top-12 z-20 w-40 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg animate-rise">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('all')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      All Leads
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('fresh')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Fresh
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('follow-up')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Follow-up
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter('pending')
                        setShowFilterMenu(false)
                      }}
                      className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                      Pending
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="relative overflow-x-auto overflow-y-visible p-4">
              <table className="w-full table-fixed text-[13px]">
                <thead>
                  <tr className="bg-gradient-to-r from-[#5868ea] to-[#9155e6] text-left text-[0.72rem] uppercase tracking-[0.04em] text-white">
                    <th className="w-[19%] px-2 py-2.5 align-middle">Name/Email/Phone</th>
                    <th className="w-[10%] px-2 py-2.5 align-middle">Sell Do Lead ID</th>
                    <th className="w-[8%] px-2 py-2.5 align-middle">Project</th>
                    <th className="w-[8%] px-2 py-2.5 align-middle">Lead Stage</th>
                    <th className="w-[11%] px-2 py-2.5 align-middle">Lead Status</th>
                    <th className="w-[11%] px-2 py-2.5 align-middle">Count Status</th>
                    <th className="w-[10%] px-2 py-2.5 align-middle">Registered At</th>
                    <th className="w-[15%] px-2 py-2.5 align-middle">Lead validity period</th>
                    <th className="w-[8%] px-2 py-2.5 text-center align-middle">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleLeads.length === 0 && (
                    <tr>
                      <td colSpan={9} className="border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center text-slate-600">
                        No lead activity found. Click Add Lead and save a lead.
                      </td>
                    </tr>
                  )}

                  {visibleLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-slate-200 bg-white text-slate-700">
                      <td className="px-2 py-2.5 align-top">
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 font-semibold text-[#1f3ca6]">
                            <span className="inline-block size-2 rounded-full bg-yellow-400" />
                            <span>{lead.name}</span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-slate-600">
                            <span>@</span>
                            <span className="break-all">{lead.email}</span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-slate-600">
                            <span>#</span>
                            <span className="break-all">{lead.phone}</span>
                          </p>
                        </div>
                      </td>
                      <td className="px-2 py-2.5 align-top font-medium text-[#3247b8]">{lead.sellDoLeadId}</td>
                      <td className="px-2 py-2.5 align-top">{lead.project}</td>
                      <td className="px-2 py-2.5 align-top">
                        <span className="rounded-full bg-[#e4e9ff] px-2.5 py-1 text-xs font-semibold text-[#3247b8]">{lead.leadStage}</span>
                      </td>
                      <td className="px-2 py-2.5 align-top">{lead.leadStatus}</td>
                      <td className="px-2 py-2.5 align-top">{lead.countStatus}</td>
                      <td className="px-2 py-2.5 align-top">{lead.registeredAt}</td>
                      <td className="px-2 py-2.5 align-top">{lead.leadValidityPeriod}</td>
                      <td data-dots-menu-root="true" className="relative overflow-visible px-2 py-2.5 text-center align-top">
                        <button
                          type="button"
                          onClick={() => setOpenActionMenuId(openActionMenuId === lead.id ? null : lead.id)}
                          className="inline-grid size-8 place-items-center rounded-md text-slate-600 transition hover:bg-slate-200"
                          aria-label="Open actions"
                        >
                          <DotsIcon />
                        </button>

                        {openActionMenuId === lead.id && (
                          <div className="absolute right-2 top-11 z-20 min-w-[11rem] overflow-visible rounded-lg border border-slate-200 bg-white p-1.5 text-left shadow-lg animate-rise">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedLeadId(lead.id)
                                setActiveView('customer-detail')
                                setCustomerDetailTab('show')
                                setCustomerHeaderMenuOpen(false)
                                setOpenActionMenuId(null)
                              }}
                              className="block w-full rounded-md px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                              Show
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddFollow(lead.id)}
                              className="block w-full rounded-md px-2 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                            >
                              Add Follow
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeView === 'customer-detail' && selectedLead && (
          <section className="animate-rise relative isolate space-y-5">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <span className="absolute -left-8 top-12 size-36 rounded-full bg-emerald-100/45 blur-3xl animate-float" />
              <span className="absolute right-10 top-8 size-28 rounded-full bg-amber-100/45 blur-3xl animate-float" style={{ animationDelay: '-3.1s' }} />
            </div>

            <div className="relative z-[120] overflow-visible rounded-2xl border border-emerald-200/70 bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(236,253,245,0.84))] px-5 py-4 shadow-[0_24px_58px_-38px_#059669] backdrop-blur-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-sora text-[1.5rem] font-semibold text-slate-800">Customer Detail</h2>
                <div data-dots-menu-root="true" className="relative z-[80] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('lead-activities')}
                    className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Back to Lead Activities
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomerHeaderMenuOpen((prev) => !prev)}
                    className="inline-grid size-8 place-items-center rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-label="Customer detail menu"
                  >
                    <DotsIcon />
                  </button>

                  {customerHeaderMenuOpen && (
                    <div className="animate-rise absolute right-0 top-full z-[200] mt-2 grid w-56 gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-[0_24px_45px_-28px_#0f172a]">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerDetailTab('show')
                          setCustomerHeaderMenuOpen(false)
                        }}
                        className="block w-full rounded-md bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Show Details
                      </button>
                      <button
                        type="button"
                        onClick={handleOpenAddFollowUpTab}
                        className="block w-full rounded-md bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        Update Follow Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {customerDetailTab === 'show' && (
              <>
                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Customer Detail</h3>
              <div className="mt-3 grid gap-3 text-slate-700 md:grid-cols-2">
                <p><strong>First Name:</strong> {selectedLead.firstName}</p>
                <p><strong>Last Name:</strong> {selectedLead.lastName}</p>
                <p><strong>Name:</strong> {selectedLead.name}</p>
                <p><strong>Email:</strong> {selectedLead.email}</p>
                <p><strong>Phone:</strong> {selectedLead.phone}</p>
                <p><strong>Sell Do Lead ID:</strong> {selectedLead.sellDoLeadId}</p>
                <p><strong>Project:</strong> {selectedLead.project}</p>
                <p><strong>Lead Stage:</strong> {selectedLead.leadStage}</p>
                <p><strong>Lead Status:</strong> {selectedLead.leadStatus}</p>
                <p><strong>Count Status:</strong> {selectedLead.countStatus}</p>
                <p><strong>Registered At:</strong> {selectedLead.registeredAt}</p>
                <p><strong>Lead Validity Period:</strong> {selectedLead.leadValidityPeriod}</p>
                <p><strong>Budget:</strong> {selectedLead.budget}</p>
                <p><strong>Location:</strong> {selectedLead.location}</p>
                <p><strong>Configuration:</strong> {selectedLead.configuration}</p>
                <p><strong>Property Type:</strong> {selectedLead.propertyType}</p>
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:90ms]">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Sell Do Lead Site Visit</h3>
              <div className="mt-3 grid gap-3 text-slate-700 md:grid-cols-2">
                <p><strong>Lead ID:</strong> {selectedLead.sellDoLeadId}</p>
                <p><strong>Project:</strong> {selectedLead.project}</p>
                <p><strong>Visit Date:</strong> Not scheduled</p>
                <p><strong>Visit Status:</strong> Pending</p>
                <p><strong>Assigned Executive:</strong> Not assigned</p>
                <p><strong>Remarks:</strong> No site visit remark yet.</p>
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:140ms]">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Remark from Selldo</h3>
              <div className="mt-3 space-y-2 text-slate-700">
                <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Initial lead captured from panel.</p>
                <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Current status: {selectedLead.leadStatus}</p>
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:190ms]">
              <div className="flex items-center justify-between">
                <h3 className="font-sora text-xl font-semibold text-slate-800">Notes</h3>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-2 text-slate-600">
                  <NoteIcon />
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
                No additional notes available for this customer.
              </div>
                </div>

                <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm [animation-delay:240ms]">
              <h3 className="font-sora text-xl font-semibold text-slate-800">Follow Up</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5868ea] to-[#9155e6] text-left text-white">
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Schedule On</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedLead.followUpItems || []).map((item) => (
                      <tr key={item.id} className="border-b border-slate-200">
                        <td className="px-3 py-2">{item.subject}</td>
                        <td className="px-3 py-2">{item.status}</td>
                        <td className="px-3 py-2">
                          {item.scheduledOn ? new Date(item.scheduledOn).toLocaleString() : '-'}
                        </td>
                        <td data-dots-menu-root="true" className="relative px-3 py-2">
                          <button
                            type="button"
                            onClick={() => setFollowUpActionMenuId(followUpActionMenuId === item.id ? null : item.id)}
                            className="inline-grid size-8 place-items-center rounded-md text-slate-600 transition hover:bg-slate-100"
                          >
                            <DotsIcon />
                          </button>

                          {followUpActionMenuId === item.id && (
                            <div className="absolute right-0 top-10 z-20 min-w-[14rem] overflow-visible rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg animate-rise">
                              <button
                                type="button"
                                onClick={() => handleFollowUpClick(item.id)}
                                className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                              >
                                Follow Up
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenUpdateFollowUp(item)}
                                className="block w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                              >
                                Update Follow Up Status
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                </div>
              </>
            )}

            {customerDetailTab === 'add-follow-up' && (
              <div className="animate-fade-slide rounded-2xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_48px_-40px_#334155] backdrop-blur-sm">
                <h3 className="font-sora text-xl font-semibold text-slate-800">Add Follow Up</h3>
                <form onSubmit={handleCreateFollowUp} className="mt-3 grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Subject</span>
                    <input
                      name="subject"
                      value={followUpForm.subject}
                      onChange={handleFollowUpFormChange}
                      required
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Status</span>
                    <select
                      name="status"
                      value={followUpForm.status}
                      onChange={handleFollowUpFormChange}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    >
                      <option>Pending</option>
                      <option>Followed Up</option>
                      <option>Completed</option>
                      <option>Rescheduled</option>
                    </select>
                  </label>
                  <label className="grid gap-1 md:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">Description</span>
                    <textarea
                      name="description"
                      value={followUpForm.description}
                      onChange={handleFollowUpFormChange}
                      rows={3}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Reminder Before</span>
                    <select
                      name="reminderBefore"
                      value={followUpForm.reminderBefore}
                      onChange={handleFollowUpFormChange}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    >
                      <option>5 mins</option>
                      <option>15 mins</option>
                      <option>30 mins</option>
                      <option>1 hour</option>
                      <option>1 day</option>
                    </select>
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm font-semibold text-slate-700">Scheduled On</span>
                    <input
                      type="datetime-local"
                      name="scheduledOn"
                      value={followUpForm.scheduledOn}
                      onChange={handleFollowUpFormChange}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                    />
                  </label>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerDetailTab('show')}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f37a2]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        )}
      </main>

      {isFollowUpDrawerOpen && (
        <div className="fixed right-4 top-20 z-[60] w-[min(94vw,430px)] rounded-xl border border-slate-200 bg-white shadow-[0_28px_60px_-35px_#0f172a] animate-rise">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h3 className="font-sora text-lg font-semibold text-slate-800">Update Follow Up Status</h3>
            <button
              type="button"
              onClick={() => setIsFollowUpDrawerOpen(false)}
              className="grid size-8 place-items-center rounded-md text-2xl leading-none text-slate-600 transition hover:bg-slate-100"
            >
              {'\u00D7'}
            </button>
          </div>

          <form onSubmit={handleSaveFollowUpStatus} className="space-y-3 p-4">
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Subject</span>
              <input
                name="subject"
                value={followUpForm.subject}
                onChange={handleFollowUpFormChange}
                required
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Description</span>
              <textarea
                name="description"
                value={followUpForm.description}
                onChange={handleFollowUpFormChange}
                rows={3}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Reminder Before</span>
              <select
                name="reminderBefore"
                value={followUpForm.reminderBefore}
                onChange={handleFollowUpFormChange}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              >
                <option>5 mins</option>
                <option>15 mins</option>
                <option>30 mins</option>
                <option>1 hour</option>
                <option>1 day</option>
              </select>
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Scheduled On</span>
              <input
                type="datetime-local"
                name="scheduledOn"
                value={followUpForm.scheduledOn}
                onChange={handleFollowUpFormChange}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-semibold text-slate-700">Status</span>
              <select
                name="status"
                value={followUpForm.status}
                onChange={handleFollowUpFormChange}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              >
                <option>Pending</option>
                <option>Followed Up</option>
                <option>Completed</option>
                <option>Rescheduled</option>
              </select>
            </label>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f37a2]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {toastMessage && (
        <div className="fixed right-4 top-5 z-[70] rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}

      <Addleads
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onSave={handleSaveLead}
      />
    </div>
  )
}

export default About
