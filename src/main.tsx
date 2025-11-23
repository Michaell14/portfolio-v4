import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx';
import IphoneCafe from './pages/iphonecafe.tsx';
import ArtofTheWeb from './pages/artoftheweb.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/iphonecafe" element={<IphoneCafe />} />
        <Route path="/artoftheweb" element={<ArtofTheWeb />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
