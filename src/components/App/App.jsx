import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import FormView from '../FormView/FormView';
import FormCustomize from '../FormCustomize/FormCustomize';
import SheetView from '../SheetView/SheetView';
import CharacterVault from '../CharacterVault/CharacterVault';
import NotFound from '../NotFound/NotFound';

function App() {
  // Header will always be visible, and hold a NavLink button for LandingPage and CharacterVault
  // FormView will hold state and pass props to SheetView
  // SheetView will probably be the only component that needs fetch calls to an API
  // FormView or SheetView will save characters to the backend
  // CharacterVault will make GET requests to the backend
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
