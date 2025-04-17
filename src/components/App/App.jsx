import { reactRouter as Routes, Route } from 'router-react-dom'
import './App.css'
import '../Header/Header'
import '../LandingPage/LandingPage'
import '../FormView/FormView'
import '../SheetView/SheetView'
import '../CharacterVault/CharacterVault'
import '../ResourcesPage/ResourcesPage'
import '../NotFound/NotFound'

function App() {
  // Header will always be visible, and hold a NavLink button for LandingPage and CharacterVault
  // FormView will hold state and pass props to SheetView
  // SheetView will probably be the only component that needs fetch calls to an API
  // FormView or SheetView will save characters to the backend
  // CharacterVault will make GET requests to the backend
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormView />} />
        <Route path="/sheet" element={<SheetView />} /> 
        <Route path="/vault" element={<CharacterVault />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
