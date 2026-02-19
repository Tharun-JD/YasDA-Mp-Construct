import { useState } from 'react'
import About from './About'
import Custdetails from './Custdetails'
import Login from './Login'

function App() {
  const [page, setPage] = useState('login')

  if (page === 'about') {
    return <About onAddLead={() => setPage('custdetails')} onBackToLogin={() => setPage('login')} />
  }

  if (page === 'custdetails') {
    return <Custdetails onClose={() => setPage('login')} />
  }

  return <Login onSignIn={() => setPage('about')} />
}

export default App
