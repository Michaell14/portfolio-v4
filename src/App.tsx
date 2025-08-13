import Projects from '../components/Projects';
import Footer from '../components/Footer';
import Experience from '../components/Experience';
import Community from '../components/Community';
import Header from '../components/Header';
import Profile from '../components/Profile';
import { Analytics } from "@vercel/analytics/react"
import './App.css'

function App() {
    return (
        <>
            <Analytics />
            <div className='relative overflow-hidden px-6 md:px-10 lg:px-0'>
                <div className='max-w-4xl mx-auto mt-10 '>
                    <Header />
                    <Profile />
                    <hr className='horizontal-line mt-20 mb-5' />
                    <Experience />
                    <hr className='horizontal-line mt-7 mb-5' />
                    <Community />
                    <hr className='horizontal-line mt-7 mb-5' />
                    <Projects />
                    <Footer />
                </div>
                <img src="home_ex/ascii-animation-slow-invert2.gif" alt="ascii-animation" className='absolute h-1/4 -bottom-0 -right-10 z-[-1]
                hidden lg:block' />

            </div >
        </>
    )
}

export default App
