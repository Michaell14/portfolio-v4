import Projects from '../components/Projects';
import Footer from '../components/Footer';
import Experience from '../components/Experience';
import Community from '../components/Community';
import Header from '../components/Header';
import Interview from '../components/Interview';
import './App.css'

function App() {
    return (
        <>
            <div className='w-[600px] mx-auto jetbrains-mono-300 mt-5'>
                <Header />
                <Interview />
                <hr className='horizontal-line mt-7 mb-5' />
                <Projects/>
                <hr className='horizontal-line mt-7 mb-5' />
                <Experience/>
                <hr className='horizontal-line mt-7 mb-5' />
                <Community/>
                
                <Footer />
            </div>
        </>
    )
}

export default App
