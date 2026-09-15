import { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Profile from '../components/Profile';
import { Analytics } from "@vercel/analytics/react"
import './App.css'

// Images behind the ImageToolTip hovers. None of them are needed to paint the
// page, so they're fetched once the browser is idle rather than up front.
// Absolute paths so they resolve the same regardless of the current route.
const imagesToPreload = [
    '/assets/me.webp',
    '/assets/climbing.webp',
    '/assets/travel.webp',
    '/assets/kensho.webp',
    '/assets/robinhood.webp',
    '/assets/saigon.webp',
];

function App() {
    useEffect(() => {
        const warm = () => {
            imagesToPreload.forEach((imageSrc) => {
                const img = new Image();
                img.src = imageSrc;
            });
        };

        // Safari only picked up requestIdleCallback in 16.4, so keep a fallback.
        if (typeof window.requestIdleCallback === 'function') {
            const handle = window.requestIdleCallback(warm, { timeout: 3000 });
            return () => window.cancelIdleCallback(handle);
        }
        const handle = window.setTimeout(warm, 1500);
        return () => window.clearTimeout(handle);
    }, []);

    return (
        <>
            <Analytics />
            <div className='relative overflow-hidden px-6 md:px-10 lg:px-0'>
                <div className='max-w-7xl mx-auto px-0 sm:px-8 mt-10 '>
                    <Header />
                    <Profile />
                    <Footer />
                    {/* Sized by width on phones and capped by page height from sm up. Only one
                        dimension is ever fixed, so the browser keeps the image's aspect ratio
                        instead of squashing it against preflight's img max-width: 100%. */}
                    <img src="home_ex/flower.webp" alt="ascii-animation" loading="lazy" className='absolute bottom-0 right-0 z-[-1] w-full h-auto sm:w-auto sm:max-h-[45%]' />
                </div>
            </div >
        </>
    )
}

export default App
