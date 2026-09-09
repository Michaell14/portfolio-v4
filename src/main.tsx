import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.tsx';
import NotFound from '../components/NotFound.tsx';

// The phone gallery is a good chunk of the site's JavaScript, and most visitors
// never open it. Splitting it keeps that weight off the homepage.
const IphoneCafe = lazy(() => import('./pages/iphonecafe.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/iphonecafe" element={<IphoneCafe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
