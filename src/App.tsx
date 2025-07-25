import Projects from '../components/Projects';
import Footer from '../components/Footer';
import Experience from '../components/Experience';
import Community from '../components/Community';
import Header from '../components/Header';
import Profile from '../components/Profile';
import './App.css'

function App() {
    return (
        <>
            <div className='w-[700px] mx-auto mt-5'>
                <Header />
                <Profile />
                <hr className='horizontal-line mt-2 mb-5' />
                <Experience/>
                <hr className='horizontal-line mt-7 mb-5' />
                <Community/>
                <hr className='horizontal-line mt-7 mb-5' />
                <Projects/>
                
                <Footer />
            </div>
        </>
    )
}

export default App
