import Experience from './Experience'
import Interview from './Interview'
import Footer from './Footer'
import "../src/App.css"

function ProfileHeader() {
    return (
        <div className="text-sm gap-2 flex flex-col">     
            <div className="italic text-xs subtext">
                <p>Michael Li</p>
                <p>limichael319@gmail.com</p>
                <p>@limich19</p>
            </div>
        </div>
    )
}


function Profile() {
    return (
        <div className='h-full'>
            <div >
                <ProfileHeader />
            </div>
            <div className='mt-5'>
                <Interview />
            </div>
            <hr className='horizontal-line my-5'/>
            <div>
                <Experience />
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile