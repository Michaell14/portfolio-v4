import Projects from '../components/Projects';
import Footer from '../components/Footer';
// import Experience from '../components/Experience';
// import Community from '../components/Community';
import Header from '../components/Header';
import Profile from '../components/Profile';
// import Sandbox from '../components/Sandbox';
import { Analytics } from "@vercel/analytics/react"
import './App.css'

function App() {
    return (
        <>
            <Analytics />
            <div className='relative overflow-hidden px-6 md:px-10 lg:px-0'>
                <div className='max-w-7xl mx-auto px-0 sm:px-8 mt-10 '>
                    <Header />
                    <Profile />
                    <hr className='horizontal-line mt-42 mb-5' />
                    <Projects />
                    {/* <hr className='horizontal-line mt-20 mb-5' /> */}

                    {/* <Experience /> */}
                    {/* <hr className='horizontal-line mt-32 mb-5' /> */}
                    {/* <Community /> */}
                    
                    <Footer />
                    <img src="home_ex/flower.gif" alt="ascii-animation" className='absolute max-h:1/5 sm:h-1/5 bottom-0 right-0 z-[-1]
                lg:block' />
                </div>
                

            </div >
        </>
    )
}

export default App
