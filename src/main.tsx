import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx';
import NotFound from '../components/NotFound.tsx';

// The sub-pages pull in p5 and the Win95 desktop, which together are most of
// the JS. Splitting them keeps that weight off the homepage.
const IphoneCafe = lazy(() => import('./pages/iphonecafe.tsx'));
const ArtofTheWeb = lazy(() => import('./pages/artoftheweb.tsx'));
const GenerativeText = lazy(() => import('./pages/generativeText.tsx'));
const Design1020 = lazy(() => import('./pages/design1020.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/iphonecafe" element={<IphoneCafe />} />
          <Route path="/artoftheweb" element={<ArtofTheWeb />} />
          <Route path="/generativetext" element={<GenerativeText />} />
          <Route path="/design1020" element={<Design1020 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
