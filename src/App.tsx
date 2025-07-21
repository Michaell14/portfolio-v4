import Profile from '../components/Profile';
import Projects from '../components/Projects';
import './App.css'

function App() {
    return (
        <>
            <div className='flex flex-row w-full h-screen intel-one-mono-300'>
                <div className="w-2/5 overflow-y-scroll hide-scrollbar px-6 mt-6">
                    <Profile />
                </div>
                <div className="vertical-line"></div>
                <div className="w-3/5 overflow-y-scroll hide-scrollbar px-6 mt-6">
                    <Projects/>
                </div>
            </div>
        </>
    )
}

export default App
