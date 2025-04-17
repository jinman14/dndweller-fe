import { useState, useEffect } from 'react'
import { reactRouter as Router, Routes, Route } from 'router-react-dom'
import './App.css'

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <LandingPage />
        <Route>
          <FormView />
        </Route>
        <Route>
          <CharacterVault />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
