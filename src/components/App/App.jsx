import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import RaceClassView from '../RaceClassView/RaceClassView';
import FormView from '../FormView/FormView';
import SheetView from '../SheetView/SheetView';
import FormCustomize from '../FormCustomize/FormCustomize';
import CharacterVault from '../CharacterVault/CharacterVault';
import ResourcesPage from'../ResourcesPage/ResourcesPage';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <main>
      <Header />
      {/* <p style={{ color: 'lime', fontSize: '2rem' }}>App is rendering</p> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/raceclass" element={<RaceClassView />} />
        <Route path="/form" element={<FormView />} />
        <Route path="/form/customize" element={<FormCustomize />} />
        <Route path="/sheet" element={<SheetView />} /> 
        <Route path="/vault" element={<CharacterVault />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
