import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import LandingPage from '../LandingPage/LandingPage';
import FormView from '../FormView/FormView';
// import SheetView from '../SheetView/SheetView';
// import CharacterVault from '../CharacterVault/CharacterVault';
// import ResourcesPage from'../ResourcesPage/ResourcesPage';
// import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormView />} />
      </Routes>
    </main>
  )
}

/*
        <Route path="/sheet" element={<SheetView />} /> 
        <Route path="/vault" element={<CharacterVault />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="*" element={<NotFound />} />
*/

export default App;
