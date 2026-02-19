import { useEffect, useState } from 'react'
import About from './About'
import Custdetails from './Custdetails'
import Login from './Login'

const PAGE_KEY = 'mp-const-active-page'
const VALID_PAGES = new Set(['login', 'about', 'custdetails'])

function getInitialPage() {
  const savedPage = window.sessionStorage.getItem(PAGE_KEY)
  return VALID_PAGES.has(savedPage) ? savedPage : 'login'
}

function App() {
  const [page, setPage] = useState(getInitialPage)

  useEffect(() => {
    window.sessionStorage.setItem(PAGE_KEY, page)
  }, [page])

  const handleLogout = () => {
    window.sessionStorage.removeItem(PAGE_KEY)
    window.sessionStorage.removeItem('mp-const-about-view')
    window.sessionStorage.removeItem('mp-const-about-selected-lead')
    setPage('login')
  }

  if (page === 'about') {
    return <About onOpenApplicationForm={() => setPage('custdetails')} onBackToLogin={handleLogout} />
  }

  if (page === 'custdetails') {
    return <Custdetails onClose={() => setPage('login')} />
  }

  return <Login onSignIn={() => setPage('about')} />
}

export default App
