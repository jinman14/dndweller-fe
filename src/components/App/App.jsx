import { reactRouter as Routes, Route } from 'router-react-dom'
import './App.css'
import '../Header/Header'
import '../LandingPage/LandingPage'
import '../FormView/FormView'
import '../SheetView/SheetView'
import '../CharacterVault/CharacterVault'
import '../NotFound/NotFound'

function App() {
  return (
    <main>
      <Header />
      {/* <p style={{ color: 'lime', fontSize: '2rem' }}>App is rendering</p> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormView />} />
        <Route path="/form/customize" element={<FormCustomize />} />
        <Route path="/sheet" element={<SheetView />} /> 
        <Route path="/vault" element={<CharacterVault />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
