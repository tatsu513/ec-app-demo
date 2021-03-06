import React from 'react'
import Router from './Router'
import './assets/style.css'
import './assets/reset.css'
import { Header } from './components/header'

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  )
}

export default App