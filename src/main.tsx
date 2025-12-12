import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx';
import IphoneCafe from './pages/iphonecafe.tsx';
import ArtofTheWeb from './pages/artoftheweb.tsx';
import GenerativeText from './pages/generativeText.tsx';
import Design1020 from './pages/design1020.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/iphonecafe" element={<IphoneCafe />} />
        <Route path="/artoftheweb" element={<ArtofTheWeb />} />
        <Route path="/generativetext" element={<GenerativeText />} />
        <Route path="/design1020" element={<Design1020 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
